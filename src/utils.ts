import { HandlerType, MyEvent } from './types';

export function customize(handler: HandlerType) {
    return function ({ detail, sendResponse }: MyEvent) {
        handler(detail, sendResponse);
    };
}

export function curry(func: Function) {
    return function currify(...args: any[]): Function | void {
        return args.length >= func.length ? func.apply(null, args) : currify.bind(null, ...args);
    };
}

export function noop() {}
