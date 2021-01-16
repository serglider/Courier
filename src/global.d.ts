/**
 * The library exposes a factory function that creates a ```courier``` object
 * and a pre-made courier object where the event target is ```window```.
 * @packageDocumentation
 */

import {
    EventTargetType,
    UnsubscribeFuncCollection,
    UnsubscribeFunc,
    HandlerCollection,
    HandlerType,
    SendResponseType,
} from './types';

declare namespace Courier {
    /**
     * It creates and returns an Courier instance
     * @param {HTMLElement|Document|Window} target  - an event target
     * @param {boolean} [isCurried=true] - flag indicating whether to curry output functions or not
     */
    function createCourier(
        target: EventTargetType,
        isCurried?: boolean
    ): {
        on: (eventName: string, handler: HandlerType) => () => UnsubscribeFunc;
        once: (eventName: string, handler: HandlerType) => () => UnsubscribeFunc;
        emit: (eventName: string, data: any) => void;
        emitWithResponse: (eventName: string, data: any, sendResponse: SendResponseType) => void;
        emitAndStore: (eventName: string, data: any) => void;
        emitAndStoreWithResponse: (
            eventName: string,
            data: any,
            sendResponse: SendResponseType
        ) => void;
        subscribe: (handlers: HandlerCollection) => UnsubscribeFuncCollection;
    };

    /**
     * It sets an event listener listening to the event with the provided name.
     * The listener called immediately if an event was stored in the target's "courierEventDataStore"
     * @public
     * @param {string} eventName - an event name
     * @param {HandlerType} handler - function called once the event with this name fired on the event target
     * @return function that removes this listener from the event target
     */
    const on: (eventName: string, handler: HandlerType) => () => UnsubscribeFunc;

    /**
     * It sets an event listener listening to the event with the provided name only once
     * The listener called immediately if an event was stored in the target's "courierEventDataStore"
     * @public
     * @param {string} eventName - an event name
     * @param {HandlerType} handler - function called once the event with this name fired on the event target
     * @return function that removes this listener from the event target
     */
    const once: (eventName: string, handler: HandlerType) => () => UnsubscribeFunc;

    /**
     * A convenience method that sets event listeners in a bulk
     * @public
     * @param {HandlerCollection} handlers - an object where keys are event name and values are listeners for those events
     * @return object where keys are event name and values are functions called to unsubscribe from those events
     */
    const subscribe: (handlers: HandlerCollection) => UnsubscribeFuncCollection;

    /**
     * Fires an event on the event target with the provided name and data
     * @public
     * @param {string} eventName - an event name
     * @param {any} data - data to be sent with this event
     */
    const emit: (eventName: string, data: any) => void;

    /**
     * Fires an event on the event target with the provided name and data
     * and provides "sendResponse" function to be (optionally) called by the event listener
     * @public
     * @param {string} eventName - an event name
     * @param {any} data - data to be sent with this event
     * @param {SendResponseType} sendResponse = function to be (optionally) called by the event listener
     */
    const emitWithResponse: (eventName: string, data: any, sendResponse: SendResponseType) => void;

    /**
     * Fires an event on the event target with the provided name and data
     * and saves the data in the special event target's store for late subscribers
     * @public
     * @param {string} eventName - an event name
     * @param {any} data - data to be sent with this event
     */
    const emitAndStore: (eventName: string, data: any) => void;

    /**
     * Fires an event on the event target with the provided name and data
     * and provides "sendResponse" function to be (optionally) called by the event listener
     * and saves the data in the special event target's store for late subscribers
     * @public
     * @param {string} eventName - an event name
     * @param {any} data - data to be sent with this event
     * @param {SendResponseType} sendResponse = function to be (optionally) called by the event listener
     */
    const emitAndStoreWithResponse: (
        eventName: string,
        data: any,
        sendResponse: SendResponseType
    ) => void;
}
