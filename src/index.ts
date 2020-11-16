import { createCourier } from './Courier';
export { createCourier } from './Courier';
export const {
    on,
    once,
    emit,
    emitWithResponse,
    emitAndStore,
    emitAndStoreWithResponse,
    subscribe,
} = createCourier(document);
