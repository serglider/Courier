// index.ts
/**
 * The library exposes a factory function that creates a ```courier``` object
 * and a pre-made courier object where the event target is ```window```.
 * @packageDocumentation
 */

import { createCourier } from './Courier';
export { createCourier } from './Courier';
export const {
    /**
     * It sets an event listener listening to the event with the provided name.
     * The listener called immediately if an event was stored in the target's "courierEventDataStore"
     * @public
     * @param {string} eventName - an event name
     * @param {HandlerType} handler - function called once the event with this name fired on the event target
     * @return function that removes this listener from the event target
     */
    on,

    /**
     * It sets an event listener listening to the event with the provided name only once
     * The listener called immediately if an event was stored in the target's "courierEventDataStore"
     * @public
     * @param {string} eventName - an event name
     * @param {HandlerType} handler - function called once the event with this name fired on the event target
     * @return function that removes this listener from the event target
     */
    once,

    /**
     * A convenience method that sets event listeners in a bulk
     * @public
     * @param {HandlerCollection} handlers - an object where keys are event name and values are listeners for those events
     * @return object where keys are event name and values are functions called to unsubscribe from those events
     */
    subscribe,

    /**
     * Fires an event on the event target with the provided name and data
     * @public
     * @param {string} eventName - an event name
     * @param {any} data - data to be sent with this event
     */
    emit,

    /**
     * Fires an event on the event target with the provided name and data
     * and provides "sendResponse" function to be (optionally) called by the event listener
     * @public
     * @param {string} eventName - an event name
     * @param {any} data - data to be sent with this event
     * @param {SendResponseType} sendResponse = function to be (optionally) called by the event listener
     */
    emitWithResponse,

    /**
     * Fires an event on the event target with the provided name and data
     * and saves the data in the special event target's store for late subscribers
     * @public
     * @param {string} eventName - an event name
     * @param {any} data - data to be sent with this event
     */
    emitAndStore,

    /**
     * Fires an event on the event target with the provided name and data
     * and provides "sendResponse" function to be (optionally) called by the event listener
     * and saves the data in the special event target's store for late subscribers
     * @public
     * @param {string} eventName - an event name
     * @param {any} data - data to be sent with this event
     * @param {SendResponseType} sendResponse = function to be (optionally) called by the event listener
     */
    emitAndStoreWithResponse,

} = createCourier(window);
