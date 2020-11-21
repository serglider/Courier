const Courier = require('../dist/courier.cjs');
const { once, emit } = Courier.createCourier(window);
const eventName = 'ev';
const eventData = 42;

describe('ONCE', () => {
    test('callback has been called', () => {
        const callback = jest.fn();
        once(eventName, callback);
        emit(eventName, eventData);
        expect(callback).toHaveBeenCalled();
    });

    test('callback has been called with correct arguments', () => {
        const callback = jest.fn();
        const optionalResponseCallback = expect.anything();
        once(eventName, callback);
        emit(eventName, eventData);
        expect(callback).toHaveBeenCalledWith(eventData, optionalResponseCallback);
    });

    test('callback has been called once', () => {
        const callback = jest.fn();
        once(eventName, callback);
        emit(eventName, eventData);
        emit(eventName, eventData);
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('unsubscription works', () => {
        const callback = jest.fn();
        const off = once(eventName, callback);
        off();
        emit(eventName, eventData);
        expect(callback).not.toHaveBeenCalled();
    });

    test('adding listener afterwards does nothing', () => {
        const callback = jest.fn();
        emit(eventName, eventData);
        once(eventName, callback);
        expect(callback).not.toHaveBeenCalled();
    });
});
