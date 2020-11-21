const Courier = require('../dist/courier.cjs');
const { subscribe, emit } = Courier.createCourier(window);
const eventName1 = 'ev1';
const eventData1 = 42;
const eventName2 = 'ev2';
const eventData2 = 43;

describe('SUBSCRIBE', () => {
    test('callbacks have been called', () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        subscribe({
            [eventName1]: callback1,
            [eventName2]: callback2,
        });
        emit(eventName1, eventData1);
        emit(eventName2, eventData2);
        expect(callback1).toHaveBeenCalled();
        expect(callback2).toHaveBeenCalled();
    });


    test('unsubscription works', () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        const unsubscribe = subscribe({
            [eventName1]: callback1,
            [eventName2]: callback2,
        });
        emit(eventName1, eventData1);
        emit(eventName2, eventData2);
        unsubscribe[eventName1]();
        unsubscribe[eventName2]();
        emit(eventName1, eventData1);
        emit(eventName2, eventData2)
        expect(callback1).toHaveBeenCalledTimes(1);
        expect(callback2).toHaveBeenCalledTimes(1);
    });

    test('adding listener afterwards does nothing', () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        emit(eventName1, eventData1);
        emit(eventName2, eventData2);
        subscribe({
            [eventName1]: callback1,
            [eventName2]: callback2,
        });
        expect(callback1).not.toHaveBeenCalled();
        expect(callback1).not.toHaveBeenCalled();
    });
});
