const Courier = require('../dist/courier.cjs');
const { emit, emitWithResponse, emitAndStore, emitAndStoreWithResponse, on, once } = Courier.createCourier(window);
const eventName = 'ev';
const eventData = 42;

describe('CURRYING', () => {
    test('emit - currying works', () => {
        const callback = jest.fn();
        on(eventName,callback);
        emit(eventName)(eventData);
        expect(callback).toHaveBeenCalled();
    });
    test('emitWithResponse - currying works', () => {
        const callback = jest.fn();
        const sendResponse = jest.fn();
        on(eventName,callback);
        emitWithResponse(eventName)(eventData)(sendResponse);
        expect(callback).toHaveBeenCalled();
    });
    test('emitAndStore - currying works', () => {
        const callback = jest.fn();
        on(eventName,callback);
        emitAndStore(eventName)(eventData);
        expect(callback).toHaveBeenCalled();
    });
    test('emitAndStoreWithResponse - currying works', () => {
        const callback = jest.fn();
        const sendResponse = jest.fn();
        on(eventName,callback);
        emitAndStoreWithResponse(eventName)(eventData)(sendResponse);
        expect(callback).toHaveBeenCalled();
    });
    test('on = currying works', () => {
        const callback = jest.fn();
        on(eventName)(callback);
        emit(eventName, eventData);
        expect(callback).toHaveBeenCalled();
    });
    test('once - currying works', () => {
        const callback = jest.fn();
        once(eventName)(callback);
        emit(eventName, eventData);
        expect(callback).toHaveBeenCalled();
    });
});