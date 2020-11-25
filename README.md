# Courier

A tiny wrapper over the DOM CustomEvent with some additional niceties. It facilitates communication among independent or loosely coupled components. The only dependency is a shared DOM.

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
} from 'event-courier';
```
If loaded as a script
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
The library expose the ```createCourier``` factory function bundled with methods of the pre-made instance. That instance uses ```window``` as an event target.
```javascript
import { on, emit } from 'event-courier;
```
or
```javascript
import { createCourier } from 'event-courier;
const element = document.getElementById('elementID');
const courier = createCourier(element);
const { on, emit } = courier;
```
then
```javascript
import { on, once, subscribe, emit } from 'event-courier;

function eventAHandler(data) {
    console.log(data); // 42 then 43
}

function oneTimeEventHandler(data) {
    console.log(data); // 42
}

function otherEventAHandler(data) {
    console.log(data); // 42 then 43
}

function eventBHandler(data) {
    console.log(data); // 44
}

once('EventA', oneTimeEventHandler);
on('EventA', eventAHandler);
subscribe({
    EventA: otherEventAHandler,
    EventB: eventBHandler
});
emit('EventA', 42);
emit('EventA', 43);
emit('EventB', 44);
```

## Unsubscription
```javascript
import { on, subscribe, emit } from 'event-courier;

function eventAHandler(data) {
    console.log(data); // 42
}

function otherEventAHandler(data) {
    console.log(data); // 42
}

function eventBHandler(data) {
    // never called
}

const unsubscribeA = on('EventA', eventAHandler);
const unsubscribe = subscribe({
    EventA: otherEventAHandler,
    EventB: eventBHandler
});
emit('EventA', 42);
unsubscribeA();
unsubscribe.EventA();
unsubscribe.EventB();
emit('EventA', 43);
emit('EventB', 44);
```

## Saving event
```javascript
import { on, emitAndStore } from 'event-courier;

function eventAHandler(data) {
    console.log(data); // 42
}
emitAndStore('EventA', 42);
setTimeout(() => {
    on('EventA', eventAHandler);
}, 1000);
```
The callback will be immediately called upon subscription and then on all subsequent events.

## Event with response
```javascript
import { on, emitWithResponse } from 'event-courier;

function onEventAResponse(data) {
    console.log(data); // 43
}

function eventAHandler(data, senResponse) {
    // no matter how the event was fired,
    // it's safe to assume that the 'senResponse'
    // is a function and always there as a second argument
    console.log(data); // 42
    senResponse(data + 1)
}

on('EventA', eventAHandler);
emitWithResponse('EventA', 42, onEventAResponse);
```

## Saved event with response
The combination of the two options above:
```javascript
import { on, emitAndStoreWithResponse } from 'event-courier;

function onEventAResponse(data) {
    console.log(data); // 43
}

function eventAHandler(data, senResponse) {
    // no matter how the event was fired,
    // it's safe to assume that the 'senResponse'
    // is a function and always there as a second argument
    console.log(data); // 42
    senResponse(data + 1)
}

emitAndStoreWithResponse('EventA', 42, onEventAResponse);
setTimeout(() => {
    on('EventA', eventAHandler);
}, 1000)
```

## Currying
All the non-unary methods of a Courier instance will be curried if you provide the second truthy argument:
```javascript
const element = document.getElementById('elementID');
const { on, emit } = createCourier(element, true);
```
In this case you can do thing like the following:
```javascript
const onEventA = on('EventA'); // will not fire an event, just returns a function
const fireEventB = emit('EventB'); // will not set a listener, just returns a function
// and then later
onEventA(data => console.log(data));
fireEventB(42);
```

## Documentation
Please find the full docs [here](https://serglider.github.io/Courier/)

## License

Copyright © 2020, [Sergey Chernykh](https://github.com/serglider).
Released under the [MIT License](LICENSE).