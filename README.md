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

if you loaded it as a script

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
## Documentation
Please find the docs [here](https://github.com/serglider)

## License

Copyright © 2020, [Sergey Chernykh](https://github.com/serglider).
Released under the [MIT License](LICENSE).