const Courier = require('../dist/courier.cjs');
const { on, emit } = Courier.createCourier(window);
const eventName = 'ev';
const eventData = 42;

describe('ON', () => {
    test('callback has been called', () => {
        const callback = jest.fn();
        on(eventName, callback);
        emit(eventName, eventData);
        expect(callback).toHaveBeenCalled();
    });

    test('callback has been called with correct arguments', () => {
        const callback = jest.fn();
        const optionalResponseCallback = expect.anything();
        on(eventName, callback);
        emit(eventName, eventData);
        expect(callback).toHaveBeenCalledWith(eventData, optionalResponseCallback);
    });

    test('callback has been called with correct arguments and correct number of times', () => {
        const callback = jest.fn();
        const optionalResponseCallback = expect.anything();
        on(eventName, callback);
        const testNumber = 50;
        for (let j = 0; j < testNumber; j++) {
            emit(eventName, eventData + j);
        }
        for (let i = 0; i < testNumber; i++) {
            expect(callback).toHaveBeenNthCalledWith(
                i + 1,
                eventData + i,
                optionalResponseCallback
            );
        }
    });

    test('unsubscription works', () => {
        const callback = jest.fn();
        const off = on(eventName, callback);
        emit(eventName, eventData);
        off();
        emit(eventName, eventData);
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('adding listener afterwards does nothing', () => {
        const callback = jest.fn();
        emit(eventName, eventData);
        on(eventName, callback);
        expect(callback).not.toHaveBeenCalled();
    });
});
