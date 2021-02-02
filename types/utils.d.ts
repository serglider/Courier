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
export declare function customize(handler: HandlerType): ({ detail, sendResponse }: CourierEvent) => void;
/**
 * It curries the provided function
 * @private
 * @param {function} func
 * @return curried function
 */
export declare function curry(func: Function): (...args: any[]) => Function | void;
/**
 * A function that does nothing
 * @private
 * @return void
 */
export declare function noop(): void;
