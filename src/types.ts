// types.ts
/**
 * Custom types used in the library
 * @packageDocumentation
 */

export type SendResponseType = (data?: any) => void;
export type CourierEvent = { detail: any; sendResponse: SendResponseType };
export type HandlerType = (detail: any, sendResponse?: SendResponseType) => void;
export type CourierEventHandlerType = (e: CourierEvent) => void;
export type EventTargetType = (HTMLElement | Document | Window) & { courierEventDataStore?: EventStorageType };
export type EventStorageType = { [key: string]: CourierEvent[] };
export type HandlerCollection = { [key: string]: HandlerType };
export type UnsubscribeFunc = () => void;
export type UnsubscribeFuncCollection = { [key: string]: UnsubscribeFunc };
