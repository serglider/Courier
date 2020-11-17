import {
    CustomHandlerType,
    EventTargetType,
    HandlerCollection,
    HandlerType,
    MyEvent,
    SendResponseType,
    FuncCollection,
} from './types';
import { curry, customize, noop } from './utils';

// @ts-ignore
class MyCustomEvent extends CustomEvent {
    sendResponse?: SendResponseType = noop;

    constructor({ typeArg, eventInitDict }: { typeArg: string; eventInitDict?: CustomEventInit }) {
        super(typeArg, eventInitDict);
    }
}

export function createCourier(target: EventTargetType) {
    target.storedCourierData = target.storedCourierData || {};

    // ---- PUBLIC METHODS ----

    function on(eName: string, handler: HandlerType) {
        const customizedHandler: CustomHandlerType = customize(handler);
        _handleState(eName, customizedHandler);
        // @ts-ignore
        target.addEventListener(eName, customizedHandler);
        return _createUnsubscribeFunction(eName, customizedHandler);
    }

    function once(eName: string, handler: HandlerType) {
        const customizedHandler: CustomHandlerType = customize(handler);
        const onceHandler = (e: MyEvent) => {
            customizedHandler(e);
            // @ts-ignore
            target.removeEventListener(eName, onceHandler);
        };
        // @ts-ignore
        target.addEventListener(eName, onceHandler);
        _handleState(eName, onceHandler);
        return _createUnsubscribeFunction(eName, onceHandler);
    }

    function subscribe(handlers: HandlerCollection) {
        return Object.entries(handlers).reduce((acc, [eName, handler]) => {
            acc[eName] = on(eName, handler);
            return acc;
        }, {} as FuncCollection);
    }

    function emit(eName: string, data: any) {
        _emit(eName, data);
    }

    function emitWithResponse(eName: string, data: any, sendResponse: SendResponseType) {
        _emit(eName, data, sendResponse);
    }

    function emitAndStoreWithResponse(eName: string, data: any, sendResponse: SendResponseType) {
        _storeData(eName, data, sendResponse);
        _emit(eName, data, sendResponse);
    }

    function emitAndStore(eName: string, data: any) {
        _storeData(eName, data);
        _emit(eName, data);
    }

    // ---- PRIVATE METHODS ----

    function _storeData(eName: string, data: any, sendResponse?: SendResponseType) {
        if (target.storedCourierData) {
            target.storedCourierData[eName] = { detail: data, sendResponse: sendResponse || noop };
        }
    }

    function _emit(eName: string, data: any, sendResponse?: SendResponseType) {
        const event = new MyCustomEvent({
            typeArg: eName,
            eventInitDict: {
                detail: data,
            },
        });
        if (typeof sendResponse === 'function') {
            event.sendResponse = sendResponse;
        } else {
            event.sendResponse = noop;
        }
        // @ts-ignore
        target.dispatchEvent(event);
    }

    function _createUnsubscribeFunction(eName: string, handler: CustomHandlerType) {
        return function () {
            // @ts-ignore
            target.removeEventListener(eName, handler);
        };
    }

    function _handleState(eName: string, handler: CustomHandlerType) {
        if (target.storedCourierData) {
            const storedEvent: MyEvent = target.storedCourierData[eName];
            if (storedEvent) {
                handler(storedEvent);
            }
        }
    }

    return {
        on: curry(on),
        once: curry(once),
        emit: curry(emit),
        emitWithResponse: curry(emitWithResponse),
        emitAndStore: curry(emitAndStore),
        emitAndStoreWithResponse: curry(emitAndStoreWithResponse),
        subscribe,
    };
}
