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
 * It curried the provided function
 * @private
 * @param {function} func
 * @return curried function
 */
export function curry(func: Function) {
    return function currify(...args: any[]): Function | void {
        return args.length >= func.length ? func.apply(null, args) : currify.bind(null, ...args);
    };
}

/**
 * A function that does nothing
 * @private
 * @return void
 */
export function noop() {}
