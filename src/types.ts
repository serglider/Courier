export type SendResponseType = (data?: any) => void;
export type MyEvent = { detail: any; sendResponse: SendResponseType };
export type HandlerType = (detail: any, sendResponse?: SendResponseType) => void;
export type CustomHandlerType = (e: MyEvent) => void;
export type EventTargetType = HTMLElement | Document
export type EventStorageType = { [key: string]: MyEvent };
export type HandlerCollection = { [key: string]: HandlerType };