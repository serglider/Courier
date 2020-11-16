import createCourier from './Courier';

export default createCourier;
export const {
    on,
    once,
    emit,
    emitWithResponse,
    emitAndStore,
    emitAndStoreWithResponse,
    subscribe,
} = createCourier(document);
