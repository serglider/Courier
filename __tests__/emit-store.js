const Courier = require('../dist/courier.cjs');
const { on, emitAndStore } = Courier.createCourier(window);
const eventName = 'ev';
const eventData = 42;

describe('EMIT_AND_STORE', () => {
    test('callback has been called even if subscription was after emission', () => {
        const callback = jest.fn();
        emitAndStore(eventName, eventData);
        on(eventName, callback);
        expect(callback).toHaveBeenCalled();
    });

    test('callback has been called with correct arguments even if subscription was after emission', () => {
        const callback = jest.fn();
        const optionalResponseCallback = expect.anything();
        emitAndStore(eventName, eventData);
        on(eventName, callback);
        expect(callback).toHaveBeenCalledWith(eventData, optionalResponseCallback);
    });

    test('callback has been called with correct arguments and correct number of times even if subscription was after emission', () => {
        const callback = jest.fn();
        const optionalResponseCallback = expect.anything();
        emitAndStore(eventName, eventData);
        on(eventName, callback);
        emitAndStore(eventName, eventData + 1);
        expect(callback).toHaveBeenNthCalledWith(1, eventData, optionalResponseCallback);
        expect(callback).toHaveBeenNthCalledWith(2, eventData + 1, optionalResponseCallback);
    });
});
