# Courier

A tiny wrapper over the DOM CustomEvent with some additional niceties.

## Setup
```event-courier``` can be installed with npm or using a content delivery network URL to embed it on your HTML page

```bash
npm i event-courier
```

or

```html
<script src="https://unpkg.com/event-courier"></script>
```

## Usage
If installed via npm
```javascript
import {
    createCourier,
    on,
    once,
    subscribe,
    emit,
    emitWithResponse,
    emitAndStore,
    emitAndStoreWithResponse
} from 'event-courier;
```
If you loaded it as a script
```javascript
const {
    createCourier,
    on,
    once,
    subscribe,
    emit,
    emitWithResponse,
    emitAndStore,
    emitAndStoreWithResponse
} = Courier;
```
You can create your own Courier instance:
```javascript
const element = document.getElementById('elementID');
const courier = createCourier(element);
const {
    on,
    once,
    subscribe,
    emit,
    emitWithResponse,
    emitAndStore,
    emitAndStoreWithResponse
} = courier;
```
or you can use pre-made Courier instance. It uses ```window``` as an event target.
```
import { on, emit } from 'event-courier;
```

## Currying
All the methods of a Courier instance are curried function by default.
This gives you the ability to do things like the following:
```javascript
const onEventA = on('EventA');
const fireEventB = emit('EventB');
// and then later
onEventA(callback);
fireEventB(data);
```
That means that just doing, for example, this
```javascript
emit('EventB');
```
will not fire an event. To fire an event the second argument here has to be defined
```javascript
emit('EventB', null);
```
If such behavior doesn't suit your needs you can create a Courier instance with the second argument being false. In this case, the methods will not be curried.
```javascript
const element = document.getElementById('elementID');
const courier = createCourier(element, false);
courier.emit('EventB');
```

## Documentation
Please find the full docs [here](https://serglider.github.io/Courier/)

## License

Copyright © 2020, [Sergey Chernykh](https://github.com/serglider).
Released under the [MIT License](LICENSE).