const Courier = require('../dist/courier.cjs');
const { on, emitWithResponse } = Courier.createCourier(window);
const eventName = 'ev';
const eventData = 42;

describe('EMIT_WITH_RESPONSE', () => {
    test('sendResponse callback has been called', () => {
        const sendResponse = jest.fn();
        const callback = jest.fn((_, cb) => cb());
        on(eventName, callback);
        emitWithResponse(eventName, eventData, sendResponse);
        expect(sendResponse).toHaveBeenCalled();
    });
    test('even handler and sendResponse callbacks have been called correctly', () => {
        const sendResponse1 = jest.fn();
        const sendResponse2 = jest.fn();
        const callback = jest.fn((_, cb) => cb());
        on(eventName, callback);
        emitWithResponse(eventName, eventData, sendResponse1);
        emitWithResponse(eventName, eventData + 1, sendResponse2);
        expect(sendResponse1).toHaveBeenCalled();
        expect(sendResponse2).toHaveBeenCalled();
        expect(callback).toHaveBeenNthCalledWith(1, eventData, sendResponse1);
        expect(callback).toHaveBeenNthCalledWith(2, eventData + 1, sendResponse2);
    });
});
