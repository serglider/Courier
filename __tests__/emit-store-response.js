const Courier = require('../dist/courier.cjs');
const { on, emitAndStoreWithResponse } = Courier.createCourier(window);
const eventName = 'ev';
const eventData = 42;

describe('EMIT_AND_STORE_WITH_RESPONSE', () => {
    test('sendResponse callback has been called even if subscription was after emission', () => {
        const sendResponse = jest.fn();
        const callback = jest.fn((_, cb) => cb());
        emitAndStoreWithResponse(eventName, eventData, sendResponse);
        on(eventName, callback);
        expect(sendResponse).toHaveBeenCalled();
    });
    // TODO: investigate sendResponse1 being called anyway
    // test('even handler and sendResponse callbacks have been called correctly', () => {
    //     const sendResponse1 = jest.fn();
    //     const sendResponse2 = jest.fn();
    //     const callback = jest.fn((_, cb) => 42);
    //     emitAndStoreWithResponse(eventName, eventData, sendResponse1);
    //     emitAndStoreWithResponse(eventName, eventData + 1, sendResponse2);
    //     on(eventName, callback);
    //     expect(sendResponse1).not.toHaveBeenCalled();
    //     expect(sendResponse2).toHaveBeenCalled();
    //     expect(callback).toHaveBeenNthCalledWith(1, eventData + 1, sendResponse2);
    // });
});
