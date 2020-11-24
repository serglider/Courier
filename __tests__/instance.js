const Courier = require('../dist/courier.cjs');

describe('INSTANCE', () => {
    it('creates instance using Document as an eventTarget', () => {
        const createInstance = () => {
            Courier.createCourier(document);
        };
        expect(createInstance).not.toThrow();
    });

    it('creates instance using Window as an eventTarget', () => {
        const createInstance = () => {
            Courier.createCourier(window);
        };
        expect(createInstance).not.toThrow();
    });

    it('creates instance using HTMLElement as an eventTarget', () => {
        document.body.innerHTML = '<div id="div"></div>';

        const createInstance = () => {
            const div = document.getElementById('div');
            Courier.createCourier(div);
        };
        expect(createInstance).not.toThrow();
    });

    it('all the props are functions', () => {
        const courier = Courier.createCourier(window);
        Object.keys(courier).forEach((key) => {
            expect(courier[key]).toBeInstanceOf(Function);
        });
    });

    it('event target has storage', () => {
        const courier = Courier.createCourier(window);
        expect(window.courierEventDataStore).toBeDefined();
    });
});
