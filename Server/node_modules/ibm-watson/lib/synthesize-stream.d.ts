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
/// <reference types="node" />
import { Agent } from 'http';
import { Authenticator } from 'ibm-cloud-sdk-core';
import { Readable, ReadableOptions } from 'stream';
import { SynthesizeWebSocketParams } from '../text-to-speech/v1';
/**
 * pipe()-able Node.js Readable stream - accepts text in the constructor and emits binary audio data in its 'message' events
 *
 * Cannot be instantiated directly, instead created by calling #synthesizeUsingWebSocket()
 *
 * Uses WebSockets under the hood.
 * @param {Object} options
 * @constructor
 */
declare class SynthesizeStream extends Readable {
    static WEBSOCKET_ERROR: string;
    static WEBSOCKET_CONNECTION_ERROR: string;
    private options;
    private authenticator;
    private socket;
    private initialized;
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
    constructor(options: SynthesizeStream.Options);
    initialize(): void;
    _read(): void;
    /**
     * Returns a Promise that resolves with Watson Transaction ID from the X-Transaction-ID header
     *
     * Works in Node.js but not in browsers (the W3C WebSocket API does not expose headers)
     *
     * @return Promise<String>
     */
    getTransactionId(): Promise<string>;
}
declare namespace SynthesizeStream {
    interface Options extends ReadableOptions, SynthesizeWebSocketParams {
        authenticator: Authenticator;
        serviceUrl?: string;
        disableSslVerification?: boolean;
        agent?: Agent;
    }
}
export = SynthesizeStream;
