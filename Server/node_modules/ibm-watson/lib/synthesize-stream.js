"use strict";
/**
 * (C) Copyright IBM Corp. 2018, 2020.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ibm_cloud_sdk_core_1 = require("ibm-cloud-sdk-core");
var stream_1 = require("stream");
var websocket_1 = require("websocket");
var websocket_utils_1 = require("./websocket-utils");
/**
 * pipe()-able Node.js Readable stream - accepts text in the constructor and emits binary audio data in its 'message' events
 *
 * Cannot be instantiated directly, instead created by calling #synthesizeUsingWebSocket()
 *
 * Uses WebSockets under the hood.
 * @param {Object} options
 * @constructor
 */
var SynthesizeStream = /** @class */ (function (_super) {
    __extends(SynthesizeStream, _super);
    /**
     * pipe()-able Node.js Readable stream - accepts text and emits binary audio data in its 'message' events
     *
     * Uses WebSockets under the hood.
     *
     *
     * Note that the WebSocket connection is not established until the first chunk of data is recieved. This allows for IAM token request management by the SDK.
     *
     * @param {Options} options
     * @param {Authenticator} options.authenticator - Authenticator to add Authorization header
     * @param {string} [options.serviceUrl] - Base url for service (default='wss://api.us-south.speech-to-text.watson.cloud.ibm.com')
     * @param {OutgoingHttpHeaders} [options.headers] - Only works in Node.js, not in browsers. Allows for custom headers to be set, including an Authorization header (preventing the need for auth tokens)
     * @param {boolean} [options.disableSslVerification] - If true, disable SSL verification for the WebSocket connection (default=false)
     * @param {Agent} [options.agent] - custom http(s) agent, useful for using the sdk behind a proxy (Node only)
     * @param {string} options.text - The text that us to be synthesized
     * @param {string} options.accept - The requested format (MIME type) of the audio
     * @param {string[]} [options.timings] - An array that specifies whether the service is to return word timing information for all strings of the input text
     * @param {string} [options.accessToken] - Bearer token to put in query string
     * @param {string} [options.watsonToken] - Valid Watson authentication token (for Cloud Foundry)
     * @param {string} [options.voice] - The voice to use for the synthesis (default='en-US_MichaelVoice')
     * @param {string} [options.customizationId] - The customization ID (GUID) of a custom voice model that is to be used for the synthesis
     * @param {boolean} [options.xWatsonLearningOptOut] - Indicates whether IBM can use data that is sent over the connection to improve the service for future users (default=false)
     * @param {string} [options.xWatsonMetadata] - Associates a customer ID with all data that is passed over the connection. The parameter accepts the argument customer_id={id}, where {id} is a random or generic string that is to be associated with the data
     * @constructor
     */
    function SynthesizeStream(options) {
        var _this = _super.call(this, options) || this;
        _this.options = options;
        _this.initialized = false;
        _this.authenticator = options.authenticator;
        return _this;
    }
    SynthesizeStream.prototype.initialize = function () {
        var options = this.options;
        // process query params
        var queryParamsAllowed = [
            'access_token',
            'watson-token',
            'voice',
            'customization_id',
            'x-watson-learning-opt-out',
            'x-watson-metadata',
        ];
        var queryParams = websocket_utils_1.processUserParameters(options, queryParamsAllowed);
        var queryString = ibm_cloud_sdk_core_1.qs.stringify(queryParams);
        // synthesize the url
        var url = (options.serviceUrl || 'wss://api.us-south.text-to-speech.watson.cloud.ibm.com')
            .replace(/^http/, 'ws') +
            '/v1/synthesize?' +
            queryString;
        // add custom agent in the request options if given by user
        // default request options to null
        var agent = options.agent;
        var requestOptions = agent ? { agent: agent } : null;
        var socket = (this.socket = new websocket_1.w3cwebsocket(url, null, null, options.headers, requestOptions, { tlsOptions: { rejectUnauthorized: !options.disableSslVerification } }));
        // use class context within arrow functions
        var self = this;
        socket.onopen = function () {
            // process the payload params
            var payloadParamsAllowed = [
                'text',
                'accept',
                'timings',
            ];
            var payload = websocket_utils_1.processUserParameters(options, payloadParamsAllowed);
            socket.send(JSON.stringify(payload));
            /**
             * emitted once the WebSocket connection has been established
             * @event SynthesizeStream#open
             */
            self.emit('open');
        };
        socket.onmessage = function (message) {
            var chunk = message.data;
            // some info messages are sent as strings, telling the content_type and
            // timings. Emit them as separate events, but do not send them along the
            // pipe.
            if (typeof chunk === 'string') {
                try {
                    var json = JSON.parse(chunk);
                    if (json['binary_streams']) {
                        self.emit('binary_streams', message, json);
                    }
                    else if (json['marks']) {
                        self.emit('marks', message, json);
                    }
                    else if (json['words']) {
                        self.emit('words', message, json);
                    }
                    else if (json['error']) {
                        // this should have same structure as onerror emit
                        var err = new Error(json['error']);
                        err.name = SynthesizeStream.WEBSOCKET_ERROR;
                        err['event'] = message;
                        self.emit('error', err);
                    }
                    else if (json['warnings']) {
                        self.emit('warnings', message, json);
                    }
                }
                finally {
                    self.emit('message', message, chunk);
                }
                return;
            }
            /**
             * Emit any messages received over the wire, mainly used for debugging.
             *
             * @event SynthesizeStream#message
             * @param {Object} message - frame object received from service
             * @param {Object} data - a data attribute of the frame that's a Buffer/TypedArray
             */
            var data = Buffer.from(chunk);
            self.emit('message', message, data);
            self.push(data);
        };
        socket.onerror = function (event) {
            var err = new Error('WebSocket connection error');
            err.name = SynthesizeStream.WEBSOCKET_CONNECTION_ERROR;
            err['event'] = event;
            self.emit('error', err);
            self.push(null);
        };
        socket.onclose = function (event) {
            self.push(null);
            /**
             * @event SynthesizeStream#close
             * @param {Number} reasonCode
             * @param {String} description
             */
            self.emit('close', event.code, event.reason);
        };
        this.initialized = true;
    };
    SynthesizeStream.prototype._read = function () {
        var _this = this;
        // even though we aren't controlling the read from websocket,
        // we can take advantage of the fact that _read is async and hack
        // this funtion to retrieve a token if the service is using IAM auth
        this.authenticator.authenticate(this.options).then(function () {
            if (!_this.initialized) {
                _this.initialize();
            }
        }, function (err) {
            _this.emit('error', err);
            _this.push(null);
        });
    };
    /**
     * Returns a Promise that resolves with Watson Transaction ID from the X-Transaction-ID header
     *
     * Works in Node.js but not in browsers (the W3C WebSocket API does not expose headers)
     *
     * @return Promise<String>
     */
    SynthesizeStream.prototype.getTransactionId = function () {
        return websocket_utils_1.extractTransactionId(this);
    };
    SynthesizeStream.WEBSOCKET_ERROR = 'WebSocket error';
    SynthesizeStream.WEBSOCKET_CONNECTION_ERROR = 'WebSocket connection error';
    return SynthesizeStream;
}(stream_1.Readable));
module.exports = SynthesizeStream;
