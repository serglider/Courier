import {
    CustomHandlerType,
    EventStorageType,
    EventTargetType,
    HandlerCollection,
    HandlerType,
    MyEvent,
    SendResponseType,
} from './types';
import { curry, customize, noop } from './utils';

// @ts-ignore
class MyCustomEvent extends CustomEvent {
    sendResponse?: SendResponseType = noop

    constructor({ typeArg, eventInitDict }: { typeArg: string, eventInitDict?: CustomEventInit }) {
        super(typeArg, eventInitDict);
    }
}

export function createCourier(target: EventTargetType) {
    const eventStorage: EventStorageType = {};

    function on(eName: string, handler: HandlerType) {
        const customizedHandler: CustomHandlerType = customize(handler);
        _handleState(eName, customizedHandler);
        // @ts-ignore
        target.addEventListener(eName, customizedHandler);
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
    }

    function subscribe(handlers: HandlerCollection) {
        Object.entries(handlers).forEach(([eName, handler]) => {
            on(eName, handler);
        });
    }

    function emitAndStore(eName: string, data: any) {
        eventStorage[eName] = { detail: data, sendResponse: noop };
        _emit(eName, data);
    }

    function emit(eName: string, data: any) {
        _emit(eName, data);
    }

    function emitAndStoreWithResponse(eName: string, data: any, sendResponse: SendResponseType) {
        eventStorage[eName] = { detail: data, sendResponse };
        _emit(eName, data, sendResponse);
    }

    function emitWithResponse(eName: string, data: any, sendResponse: SendResponseType) {
        _emit(eName, data, sendResponse);
    }

    function _emit(eName: string, data: any, sendResponse?: SendResponseType) {
        const event = new MyCustomEvent({
            typeArg: eName, eventInitDict: {
                detail: data,
            }
        });
        if (typeof sendResponse === 'function') {
            event.sendResponse = sendResponse;
        } else {
            event.sendResponse = noop;
        }
        // @ts-ignore
        target.dispatchEvent(event);
    }

    function _handleState(eName: string, handler: CustomHandlerType) {
        const storedEvent: MyEvent = eventStorage[eName];
        if (storedEvent) {
            handler(storedEvent);
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