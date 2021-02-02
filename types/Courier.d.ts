/**
 * The module exposes a factory function that creates a ```courier``` object.
 * @packageDocumentation
 */
import { EventTargetType, HandlerCollection, HandlerType, SendResponseType, UnsubscribeFuncCollection, UnsubscribeFunc } from './types';
/**
 * It creates and returns an Courier instance
 * @param {HTMLElement|Document|Window} target  - an event target
 * @param {boolean} [isCurried=true] - flag indicating whether to curry output functions or not
 */
export declare function createCourier(target: EventTargetType, isCurried?: boolean): {
    on: ((...args: any[]) => void | Function) | ((eventName: string, handler: HandlerType) => UnsubscribeFunc);
    once: ((...args: any[]) => void | Function) | ((eventName: string, handler: HandlerType) => UnsubscribeFunc);
    emit: ((...args: any[]) => void | Function) | ((eventName: string, data: any) => void);
    emitWithResponse: ((...args: any[]) => void | Function) | ((eventName: string, data: any, sendResponse: SendResponseType) => void);
    emitAndStore: ((...args: any[]) => void | Function) | ((eventName: string, data: any) => void);
    emitAndStoreWithResponse: ((...args: any[]) => void | Function) | ((eventName: string, data: any, sendResponse: SendResponseType) => void);
    subscribe: (handlers: HandlerCollection) => UnsubscribeFuncCollection;
};
