// utils.ts
/**
 * Utilities used in the library
 * @packageDocumentation
 */

import { HandlerType, CourierEvent } from './types';

/**
 * It converts a HandlerType function into a CourierEventHandlerType function
 * @private
 * @param {HandlerType} handler
 * @return {CourierEventHandlerType} function
 */
export function customize(handler: HandlerType) {
    return function ({ detail, sendResponse }: CourierEvent) {
        handler(detail, sendResponse);
    };
}

/**
 * It curries the provided function
 * @private
 * @param {function} func
 * @return curried function
 */
export function curry(func: Function) {
    return function curried() {
        const args = [].slice.call(arguments);
        if (args.length >= func.length) {
            return func.apply(null, args);
        } else {
            return function() {
                const args2 = [].slice.call(arguments);
                // @ts-ignore
                return curried.apply(null, args.concat(args2));
            }
        }
    };
}

/**
 * A function that does nothing
 * @private
 * @return void
 */
export function noop() {}
