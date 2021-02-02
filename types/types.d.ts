/**
 * Custom types used in the library
 * @packageDocumentation
 */
export declare type SendResponseType = (data?: any) => void;
export declare type CourierEvent = {
    detail: any;
    sendResponse: SendResponseType;
};
export declare type HandlerType = (detail: any, sendResponse?: SendResponseType) => void;
export declare type CourierEventHandlerType = (e: CourierEvent) => void;
export declare type EventTargetType = (HTMLElement | Document | Window) & {
    courierEventDataStore?: EventStorageType;
};
export declare type EventStorageType = {
    [key: string]: CourierEvent[];
};
export declare type HandlerCollection = {
    [key: string]: HandlerType;
};
export declare type UnsubscribeFunc = () => void;
export declare type UnsubscribeFuncCollection = {
    [key: string]: UnsubscribeFunc;
};
