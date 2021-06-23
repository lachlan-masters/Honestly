export declare type SdkHeaders = {
    'User-Agent': string;
    'X-IBMCloud-SDK-Analytics': string;
};
export declare function getSdkHeaders(serviceName: string, serviceVersion: string, operationId: string): SdkHeaders | {};
