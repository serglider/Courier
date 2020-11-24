// Courier.ts
/**
 * The module exposes a factory function that creates a ```courier``` object.
 * @packageDocumentation
 */

import {
    CourierEventHandlerType,
    EventTargetType,
    HandlerCollection,
    HandlerType,
    CourierEvent,
    SendResponseType,
    FuncCollection,
} from './types';
import { curry, customize, noop } from './utils';

// @ts-ignore
class CourierCustomEvent extends CustomEvent {
    sendResponse?: SendResponseType = noop;

    constructor({ typeArg, eventInitDict }: { typeArg: string; eventInitDict?: CustomEventInit }) {
        super(typeArg, eventInitDict);
    }
}

/**
 * It creates and returns an Courier instance
 * @remarks
 * This method is part
 * @param {HTMLElement|Document|Window} target  - an event target
 * @param {boolean} [isCurried=true] - flag indicating whether to curry output functions or not
 */
export function createCourier(target: EventTargetType, isCurried: boolean = false) {
    target.courierEventDataStore = target.courierEventDataStore || {};

    /**
     * It sets an event listener listening to the event with the provided name.
     * The listener called immediately if an event was stored in the target's "courierEventDataStore"
     * @public
     * @param {string} eventName - an event name
     * @param {HandlerType} handler - function called once the event with this name fired on the event target
     * @return function that removes this listener from the event target
     */
    function on(eventName: string, handler: HandlerType) {
        const customizedHandler: CourierEventHandlerType = customize(handler);
        _handleStoredEvent(eventName, customizedHandler);
        // @ts-ignore
        target.addEventListener(eventName, customizedHandler);
        return _createUnsubscribeFunction(eventName, customizedHandler);
    }

    /**
     * It sets an event listener listening to the event with the provided name only once
     * The listener called immediately if an event was stored in the target's "courierEventDataStore"
     * @public
     * @param {string} eventName - an event name
     * @param {HandlerType} handler - function called once the event with this name fired on the event target
     * @return function that removes this listener from the event target
     */
    function once(eventName: string, handler: HandlerType) {
        const customizedHandler: CourierEventHandlerType = customize(handler);
        const onceHandler = (e: CourierEvent) => {
            customizedHandler(e);
            // @ts-ignore
            target.removeEventListener(eventName, onceHandler);
        };
        // @ts-ignore
        target.addEventListener(eventName, onceHandler);
        _handleStoredEvent(eventName, onceHandler);
        return _createUnsubscribeFunction(eventName, onceHandler);
    }

    /**
     * A convenience method that sets event listeners in a bulk
     * @public
     * @param {HandlerCollection} handlers - an object where keys are event name and values are listeners for those events
     * @return object where keys are event name and values are functions called to unsubscribe from those events
     */
    function subscribe(handlers: HandlerCollection) {
        return Object.entries(handlers).reduce((acc, [eventName, handler]) => {
            acc[eventName] = on(eventName, handler);
            return acc;
        }, {} as FuncCollection);
    }

    /**
     * Fires an event on the event target with the provided name and data
     * @public
     * @param {string} eventName - an event name
     * @param {any} data - data to be sent with this event
     */
    function emit(eventName: string, data: any) {
        _emit(eventName, data);
    }

    /**
     * Fires an event on the event target with the provided name and data
     * and provides "sendResponse" function to be (optionally) called by the event listener
     * @public
     * @param {string} eventName - an event name
     * @param {any} data - data to be sent with this event
     * @param {SendResponseType} sendResponse = function to be (optionally) called by the event listener
     */
    function emitWithResponse(eventName: string, data: any, sendResponse: SendResponseType) {
        _emit(eventName, data, sendResponse);
    }

    /**
     * Fires an event on the event target with the provided name and data
     * and provides "sendResponse" function to be (optionally) called by the event listener
     * and saves the data in the special event target's store for late subscribers
     * @public
     * @param {string} eventName - an event name
     * @param {any} data - data to be sent with this event
     * @param {SendResponseType} sendResponse = function to be (optionally) called by the event listener
     */
    function emitAndStoreWithResponse(eventName: string, data: any, sendResponse: SendResponseType) {
        _storeData(eventName, data, sendResponse);
        _emit(eventName, data, sendResponse);
    }

    /**
     * Fires an event on the event target with the provided name and data
     * and saves the data in the special event target's store for late subscribers
     * @public
     * @param {string} eventName - an event name
     * @param {any} data - data to be sent with this event
     */
    function emitAndStore(eventName: string, data: any) {
        _storeData(eventName, data);
        _emit(eventName, data);
    }

    /**
     * It saves the event data in the special event target's store for late subscribers
     * @private
     * @param {string} eventName - an event name
     * @param {any} data - data to be sent with this event
     * @param {SendResponseType} [sendResponse] = function to be (optionally) called by the event listener
     */
    function _storeData(eventName: string, data: any, sendResponse?: SendResponseType) {
        if (target.courierEventDataStore) {
            target.courierEventDataStore[eventName] = { detail: data, sendResponse: sendResponse || noop };
        }
    }

    /**
     * Fires an event on the event target with the provided name and data
     * and provides "sendResponse" function to be (optionally) called by the event listener
     * @private
     * @param {string} eventName - an event name
     * @param {any} data - data to be sent with this event
     * @param {SendResponseType} [sendResponse] = function to be (optionally) called by the event listener
     */
    function _emit(eventName: string, data: any, sendResponse?: SendResponseType) {
        const event = new CourierCustomEvent({
            typeArg: eventName,
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

    /**
     * It removes the event listener (listening to the event target with the provided name) from the event target
     * @private
     * @param {string} eventName - an event name
     * @param {CourierEventHandlerType} handler - an event handler
     */
    function _createUnsubscribeFunction(eventName: string, handler: CourierEventHandlerType) {
        return function () {
            // @ts-ignore
            target.removeEventListener(eventName, handler);
        };
    }

    /**
     * It calls the event handler if an event with the provided name exists in the event target's event store
     * @private
     * @param {string} eventName - an event name
     * @param {CourierEventHandlerType} handler - an event handler
     */
    function _handleStoredEvent(eventName: string, handler: CourierEventHandlerType) {
        if (target.courierEventDataStore) {
            const storedEvent: CourierEvent = target.courierEventDataStore[eventName];
            if (storedEvent) {
                handler(storedEvent);
            }
        }
    }

    return {
        on: isCurried ? curry(on) : on,
        once: isCurried ? curry(once) : once,
        emit: isCurried ? curry(emit) : emit,
        emitWithResponse: isCurried ? curry(emitWithResponse) : emitWithResponse,
        emitAndStore: isCurried ? curry(emitAndStore) : emitAndStore,
        emitAndStoreWithResponse: isCurried
            ? curry(emitAndStoreWithResponse)
            : emitAndStoreWithResponse,
        subscribe,
    };
}
