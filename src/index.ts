import createCourier from './Courier';

const documentCourier = createCourier(document);
export const Courier = Object.assign(documentCourier, { createCourier });
