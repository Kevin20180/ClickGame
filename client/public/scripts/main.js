"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // ../../node_modules/.pnpm/eventemitter3@5.0.4/node_modules/eventemitter3/index.js
  var require_eventemitter3 = __commonJS({
    "../../node_modules/.pnpm/eventemitter3@5.0.4/node_modules/eventemitter3/index.js"(exports, module) {
      "use strict";
      var has = Object.prototype.hasOwnProperty;
      var prefix = "~";
      function Events() {
      }
      if (Object.create) {
        Events.prototype = /* @__PURE__ */ Object.create(null);
        if (!new Events().__proto__) prefix = false;
      }
      function EE(fn, context, once) {
        this.fn = fn;
        this.context = context;
        this.once = once || false;
      }
      function addListener(emitter, event, fn, context, once) {
        if (typeof fn !== "function") {
          throw new TypeError("The listener must be a function");
        }
        var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
        if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
        else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
        else emitter._events[evt] = [emitter._events[evt], listener];
        return emitter;
      }
      function clearEvent(emitter, evt) {
        if (--emitter._eventsCount === 0) emitter._events = new Events();
        else delete emitter._events[evt];
      }
      function EventEmitter2() {
        this._events = new Events();
        this._eventsCount = 0;
      }
      EventEmitter2.prototype.eventNames = function eventNames() {
        var names = [], events, name;
        if (this._eventsCount === 0) return names;
        for (name in events = this._events) {
          if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
        }
        if (Object.getOwnPropertySymbols) {
          return names.concat(Object.getOwnPropertySymbols(events));
        }
        return names;
      };
      EventEmitter2.prototype.listeners = function listeners(event) {
        var evt = prefix ? prefix + event : event, handlers = this._events[evt];
        if (!handlers) return [];
        if (handlers.fn) return [handlers.fn];
        for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
          ee[i] = handlers[i].fn;
        }
        return ee;
      };
      EventEmitter2.prototype.listenerCount = function listenerCount(event) {
        var evt = prefix ? prefix + event : event, listeners = this._events[evt];
        if (!listeners) return 0;
        if (listeners.fn) return 1;
        return listeners.length;
      };
      EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt]) return false;
        var listeners = this._events[evt], len = arguments.length, args, i;
        if (listeners.fn) {
          if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
          switch (len) {
            case 1:
              return listeners.fn.call(listeners.context), true;
            case 2:
              return listeners.fn.call(listeners.context, a1), true;
            case 3:
              return listeners.fn.call(listeners.context, a1, a2), true;
            case 4:
              return listeners.fn.call(listeners.context, a1, a2, a3), true;
            case 5:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
            case 6:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
          }
          for (i = 1, args = new Array(len - 1); i < len; i++) {
            args[i - 1] = arguments[i];
          }
          listeners.fn.apply(listeners.context, args);
        } else {
          var length = listeners.length, j;
          for (i = 0; i < length; i++) {
            if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
            switch (len) {
              case 1:
                listeners[i].fn.call(listeners[i].context);
                break;
              case 2:
                listeners[i].fn.call(listeners[i].context, a1);
                break;
              case 3:
                listeners[i].fn.call(listeners[i].context, a1, a2);
                break;
              case 4:
                listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                break;
              default:
                if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
                listeners[i].fn.apply(listeners[i].context, args);
            }
          }
        }
        return true;
      };
      EventEmitter2.prototype.on = function on(event, fn, context) {
        return addListener(this, event, fn, context, false);
      };
      EventEmitter2.prototype.once = function once(event, fn, context) {
        return addListener(this, event, fn, context, true);
      };
      EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt]) return this;
        if (!fn) {
          clearEvent(this, evt);
          return this;
        }
        var listeners = this._events[evt];
        if (listeners.fn) {
          if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
            clearEvent(this, evt);
          }
        } else {
          for (var i = 0, events = [], length = listeners.length; i < length; i++) {
            if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
              events.push(listeners[i]);
            }
          }
          if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
          else clearEvent(this, evt);
        }
        return this;
      };
      EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
        var evt;
        if (event) {
          evt = prefix ? prefix + event : event;
          if (this._events[evt]) clearEvent(this, evt);
        } else {
          this._events = new Events();
          this._eventsCount = 0;
        }
        return this;
      };
      EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
      EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
      EventEmitter2.prefixed = prefix;
      EventEmitter2.EventEmitter = EventEmitter2;
      if ("undefined" !== typeof module) {
        module.exports = EventEmitter2;
      }
    }
  });

  // ../../node_modules/.pnpm/eventemitter3@5.0.4/node_modules/eventemitter3/index.mjs
  var import_index = __toESM(require_eventemitter3(), 1);

  // scripts/main.ts
  var resetButtonElement = document.querySelector("#reset");
  var Game = class {
    moneyElement;
    clicksElement;
    store;
    ticks;
    money;
    clicks;
    multiplier;
    autoClickers;
    constructor(moneyElement, clicksElement, store2) {
      this.moneyElement = moneyElement;
      this.clicksElement = clicksElement;
      this.store = store2;
      this.ticks = 0;
      this.money = 0;
      this.clicks = 0;
      this.multiplier = 1;
      this.autoClickers = [];
      clicksElement.addEventListener("click", () => {
        this.click();
      });
      setInterval(() => {
        this.ticks++;
        let tickInSecond = this.ticks % 20 || 20;
        for (const autoClicker of this.autoClickers) {
          if (autoClicker.tick !== tickInSecond) continue;
          this.click();
        }
        moneyElement.innerText = Math.floor(this.money).toString();
        clicksElement.innerText = this.clicks.toString();
      }, 50);
    }
    click() {
      this.clicks += this.multiplier;
    }
  };
  var Store = class {
    element;
    items;
    constructor(element, items) {
      this.element = element;
      this.items = items;
    }
  };
  var StoreItem = class extends import_index.default {
    #price;
    game;
    name;
    element;
    constructor(element, game2, name, price) {
      super();
      this.element = element;
      this.#price = price;
      this.game = game2;
      this.name = name;
      element.addEventListener("click", () => {
        this.emit("click");
        if (game2.money >= this.price) {
          game2.money -= this.price;
          this.emit("buy");
        }
      });
    }
    get price() {
      return this.#price;
    }
    set price(a) {
      this.#price = a;
      this.element.innerText = `${this.name} R$${a}`;
    }
    onBuy(handler) {
      this.on("buy", () => {
        handler.call(this);
      });
      return this;
    }
    onClick(handler) {
      this.on("click", () => {
        handler.call(this);
      });
      return this;
    }
    buy() {
      if (game.money >= this.price) {
        game.money -= this.price;
        this.emit("buy");
      }
    }
  };
  var AutoClicker = class {
    tick;
    constructor(tick) {
      this.tick = tick;
    }
  };
  var store = new Store(document.querySelector("#store"), {});
  var game = new Game(
    document.querySelector("#money"),
    document.querySelector("#click"),
    store
  );
  var DEFAULT_ITEM_PRICES = {
    "autoClick": 100,
    "multiplier": 1e3
  };
  store.items = {
    "sell": new StoreItem(document.querySelector(".sell_button.sell"), game, "Vender", 0).onClick(function() {
      this.game.money += this.game.clicks;
      this.game.clicks = 0;
    }),
    "autoClick": new StoreItem(document.querySelector(".buy_button.auto_click"), game, "Auto Clicker", DEFAULT_ITEM_PRICES.autoClick).onBuy(function(tick) {
      this.price += 12;
      const autoClicker = new AutoClicker(tick ? tick % 20 || 20 : this.game.ticks % 20 || 20);
      this.game.autoClickers.push(autoClicker);
    }),
    "autoClick.all": new StoreItem(document.querySelector(".buy_all_button.auto_click"), game, "Comprar todos", 0).onClick(function() {
      let tick = this.game.ticks;
      const item = game.store.items["autoClick"];
      while (this.game.money >= item.price) {
        item.buy();
        const autoClicker = this.game.autoClickers[this.game.autoClickers.length - 1];
        if (autoClicker) autoClicker.tick = tick++ % 20 || 20;
      }
    }),
    "multiplier": new StoreItem(document.querySelector(".buy_button.multiplier"), game, "Multiplicador", DEFAULT_ITEM_PRICES.multiplier).onBuy(function() {
      this.price += Math.floor(this.price * 1.2);
      this.game.multiplier++;
    })
  };
  function reset() {
    game.ticks = 0;
    game.money = 0;
    game.clicks = 0;
    game.multiplier = 1;
    game.autoClickers = [];
    for (const key in DEFAULT_ITEM_PRICES) {
      const item = game.store.items[key];
      if (!item) continue;
      const defItemPrice = DEFAULT_ITEM_PRICES[key];
      if (defItemPrice === void 0) continue;
      item.price = defItemPrice;
    }
  }
  resetButtonElement.addEventListener("click", () => {
    let res = window.confirm("Deseja resetar o jogo?");
    if (res) reset();
  });
  setInterval(() => {
    localStorage.setItem("ticks", game.ticks.toString());
    localStorage.setItem("money", game.money.toString());
    localStorage.setItem("clicks", game.clicks.toString());
    localStorage.setItem("multiplier", game.multiplier.toString());
    localStorage.setItem("auto_clicker_ticks", JSON.stringify(game.autoClickers.map((a) => a.tick)));
    for (const key in game.store.items) {
      const item = game.store.items[key];
      localStorage.setItem(`store.${key}.price`, item.price.toString());
    }
  }, 300);
  game.ticks = Number(localStorage.getItem("ticks")) || game.ticks;
  game.money = Number(localStorage.getItem("money")) || game.money;
  game.clicks = Number(localStorage.getItem("clicks")) || game.clicks;
  game.multiplier = Number(localStorage.getItem("multiplier")) || game.multiplier;
  var localAutoClickerTicks = void 0;
  try {
    localAutoClickerTicks = JSON.parse(localStorage.getItem("auto_clicker_ticks") || "[]");
  } catch {
  }
  if (Array.isArray(localAutoClickerTicks)) {
    for (const tick of localAutoClickerTicks) {
      const autoClicker = new AutoClicker(tick || 1);
      game.autoClickers.push(autoClicker);
    }
  }
  for (const key in game.store.items) {
    const item = game.store.items[key];
    let price = Number(localStorage.getItem(`store.${key}.price`));
    if (Number.isNaN(price)) continue;
    const defItemPrice = DEFAULT_ITEM_PRICES[key];
    if (item.price !== price && price > (defItemPrice ?? 0)) item.price = price;
  }
  window.game = game;
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2V2ZW50ZW1pdHRlcjNANS4wLjQvbm9kZV9tb2R1bGVzL2V2ZW50ZW1pdHRlcjMvaW5kZXguanMiLCAiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2V2ZW50ZW1pdHRlcjNANS4wLjQvbm9kZV9tb2R1bGVzL2V2ZW50ZW1pdHRlcjMvaW5kZXgubWpzIiwgIi4uLy4uL3NjcmlwdHMvbWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuICAsIHByZWZpeCA9ICd+JztcblxuLyoqXG4gKiBDb25zdHJ1Y3RvciB0byBjcmVhdGUgYSBzdG9yYWdlIGZvciBvdXIgYEVFYCBvYmplY3RzLlxuICogQW4gYEV2ZW50c2AgaW5zdGFuY2UgaXMgYSBwbGFpbiBvYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhcmUgZXZlbnQgbmFtZXMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBFdmVudHMoKSB7fVxuXG4vL1xuLy8gV2UgdHJ5IHRvIG5vdCBpbmhlcml0IGZyb20gYE9iamVjdC5wcm90b3R5cGVgLiBJbiBzb21lIGVuZ2luZXMgY3JlYXRpbmcgYW5cbi8vIGluc3RhbmNlIGluIHRoaXMgd2F5IGlzIGZhc3RlciB0aGFuIGNhbGxpbmcgYE9iamVjdC5jcmVhdGUobnVsbClgIGRpcmVjdGx5LlxuLy8gSWYgYE9iamVjdC5jcmVhdGUobnVsbClgIGlzIG5vdCBzdXBwb3J0ZWQgd2UgcHJlZml4IHRoZSBldmVudCBuYW1lcyB3aXRoIGFcbi8vIGNoYXJhY3RlciB0byBtYWtlIHN1cmUgdGhhdCB0aGUgYnVpbHQtaW4gb2JqZWN0IHByb3BlcnRpZXMgYXJlIG5vdFxuLy8gb3ZlcnJpZGRlbiBvciB1c2VkIGFzIGFuIGF0dGFjayB2ZWN0b3IuXG4vL1xuaWYgKE9iamVjdC5jcmVhdGUpIHtcbiAgRXZlbnRzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgLy9cbiAgLy8gVGhpcyBoYWNrIGlzIG5lZWRlZCBiZWNhdXNlIHRoZSBgX19wcm90b19fYCBwcm9wZXJ0eSBpcyBzdGlsbCBpbmhlcml0ZWQgaW5cbiAgLy8gc29tZSBvbGQgYnJvd3NlcnMgbGlrZSBBbmRyb2lkIDQsIGlQaG9uZSA1LjEsIE9wZXJhIDExIGFuZCBTYWZhcmkgNS5cbiAgLy9cbiAgaWYgKCFuZXcgRXZlbnRzKCkuX19wcm90b19fKSBwcmVmaXggPSBmYWxzZTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRhdGlvbiBvZiBhIHNpbmdsZSBldmVudCBsaXN0ZW5lci5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHBhcmFtIHtCb29sZWFufSBbb25jZT1mYWxzZV0gU3BlY2lmeSBpZiB0aGUgbGlzdGVuZXIgaXMgYSBvbmUtdGltZSBsaXN0ZW5lci5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gRUUoZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdGhpcy5mbiA9IGZuO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLm9uY2UgPSBvbmNlIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIEFkZCBhIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBlbWl0dGVyIFJlZmVyZW5jZSB0byB0aGUgYEV2ZW50RW1pdHRlcmAgaW5zdGFuY2UuXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIFNwZWNpZnkgaWYgdGhlIGxpc3RlbmVyIGlzIGEgb25lLXRpbWUgbGlzdGVuZXIuXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYWRkTGlzdGVuZXIoZW1pdHRlciwgZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICB2YXIgbGlzdGVuZXIgPSBuZXcgRUUoZm4sIGNvbnRleHQgfHwgZW1pdHRlciwgb25jZSlcbiAgICAsIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCFlbWl0dGVyLl9ldmVudHNbZXZ0XSkgZW1pdHRlci5fZXZlbnRzW2V2dF0gPSBsaXN0ZW5lciwgZW1pdHRlci5fZXZlbnRzQ291bnQrKztcbiAgZWxzZSBpZiAoIWVtaXR0ZXIuX2V2ZW50c1tldnRdLmZuKSBlbWl0dGVyLl9ldmVudHNbZXZ0XS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZSBlbWl0dGVyLl9ldmVudHNbZXZ0XSA9IFtlbWl0dGVyLl9ldmVudHNbZXZ0XSwgbGlzdGVuZXJdO1xuXG4gIHJldHVybiBlbWl0dGVyO1xufVxuXG4vKipcbiAqIENsZWFyIGV2ZW50IGJ5IG5hbWUuXG4gKlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IGVtaXR0ZXIgUmVmZXJlbmNlIHRvIHRoZSBgRXZlbnRFbWl0dGVyYCBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldnQgVGhlIEV2ZW50IG5hbWUuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjbGVhckV2ZW50KGVtaXR0ZXIsIGV2dCkge1xuICBpZiAoLS1lbWl0dGVyLl9ldmVudHNDb3VudCA9PT0gMCkgZW1pdHRlci5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICBlbHNlIGRlbGV0ZSBlbWl0dGVyLl9ldmVudHNbZXZ0XTtcbn1cblxuLyoqXG4gKiBNaW5pbWFsIGBFdmVudEVtaXR0ZXJgIGludGVyZmFjZSB0aGF0IGlzIG1vbGRlZCBhZ2FpbnN0IHRoZSBOb2RlLmpzXG4gKiBgRXZlbnRFbWl0dGVyYCBpbnRlcmZhY2UuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG59XG5cbi8qKlxuICogUmV0dXJuIGFuIGFycmF5IGxpc3RpbmcgdGhlIGV2ZW50cyBmb3Igd2hpY2ggdGhlIGVtaXR0ZXIgaGFzIHJlZ2lzdGVyZWRcbiAqIGxpc3RlbmVycy5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHZhciBuYW1lcyA9IFtdXG4gICAgLCBldmVudHNcbiAgICAsIG5hbWU7XG5cbiAgaWYgKHRoaXMuX2V2ZW50c0NvdW50ID09PSAwKSByZXR1cm4gbmFtZXM7XG5cbiAgZm9yIChuYW1lIGluIChldmVudHMgPSB0aGlzLl9ldmVudHMpKSB7XG4gICAgaWYgKGhhcy5jYWxsKGV2ZW50cywgbmFtZSkpIG5hbWVzLnB1c2gocHJlZml4ID8gbmFtZS5zbGljZSgxKSA6IG5hbWUpO1xuICB9XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICByZXR1cm4gbmFtZXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZXZlbnRzKSk7XG4gIH1cblxuICByZXR1cm4gbmFtZXM7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge0FycmF5fSBUaGUgcmVnaXN0ZXJlZCBsaXN0ZW5lcnMuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKGV2ZW50KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50XG4gICAgLCBoYW5kbGVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmICghaGFuZGxlcnMpIHJldHVybiBbXTtcbiAgaWYgKGhhbmRsZXJzLmZuKSByZXR1cm4gW2hhbmRsZXJzLmZuXTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGhhbmRsZXJzLmxlbmd0aCwgZWUgPSBuZXcgQXJyYXkobCk7IGkgPCBsOyBpKyspIHtcbiAgICBlZVtpXSA9IGhhbmRsZXJzW2ldLmZuO1xuICB9XG5cbiAgcmV0dXJuIGVlO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIG51bWJlciBvZiBsaXN0ZW5lcnMgbGlzdGVuaW5nIHRvIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWJlciBvZiBsaXN0ZW5lcnMuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uIGxpc3RlbmVyQ291bnQoZXZlbnQpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnRcbiAgICAsIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmICghbGlzdGVuZXJzKSByZXR1cm4gMDtcbiAgaWYgKGxpc3RlbmVycy5mbikgcmV0dXJuIDE7XG4gIHJldHVybiBsaXN0ZW5lcnMubGVuZ3RoO1xufTtcblxuLyoqXG4gKiBDYWxscyBlYWNoIG9mIHRoZSBsaXN0ZW5lcnMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBldmVudCBoYWQgbGlzdGVuZXJzLCBlbHNlIGBmYWxzZWAuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZlbnQsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1tldnRdKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdXG4gICAgLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBhcmdzXG4gICAgLCBpO1xuXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAobGlzdGVuZXJzLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVycy5mbiwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICBjYXNlIDE6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCksIHRydWU7XG4gICAgICBjYXNlIDI6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEpLCB0cnVlO1xuICAgICAgY2FzZSAzOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiksIHRydWU7XG4gICAgICBjYXNlIDQ6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMyksIHRydWU7XG4gICAgICBjYXNlIDU6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQpLCB0cnVlO1xuICAgICAgY2FzZSA2OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMsIGE0LCBhNSksIHRydWU7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5mbi5hcHBseShsaXN0ZW5lcnMuY29udGV4dCwgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGhcbiAgICAgICwgajtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxpc3RlbmVyc1tpXS5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnNbaV0uZm4sIHVuZGVmaW5lZCwgdHJ1ZSk7XG5cbiAgICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICAgIGNhc2UgMTogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQpOyBicmVhaztcbiAgICAgICAgY2FzZSAyOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEpOyBicmVhaztcbiAgICAgICAgY2FzZSAzOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgNDogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExLCBhMiwgYTMpOyBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAoIWFyZ3MpIGZvciAoaiA9IDEsIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0xKTsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICBhcmdzW2ogLSAxXSA9IGFyZ3VtZW50c1tqXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaXN0ZW5lcnNbaV0uZm4uYXBwbHkobGlzdGVuZXJzW2ldLmNvbnRleHQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBBZGQgYSBsaXN0ZW5lciBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IFtjb250ZXh0PXRoaXNdIFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCBmYWxzZSk7XG59O1xuXG4vKipcbiAqIEFkZCBhIG9uZS10aW1lIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCB0cnVlKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBsaXN0ZW5lcnMgb2YgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgbWF0Y2ggdGhpcyBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgaGF2ZSB0aGlzIGNvbnRleHQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgT25seSByZW1vdmUgb25lLXRpbWUgbGlzdGVuZXJzLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiB0aGlzO1xuICBpZiAoIWZuKSB7XG4gICAgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAoXG4gICAgICBsaXN0ZW5lcnMuZm4gPT09IGZuICYmXG4gICAgICAoIW9uY2UgfHwgbGlzdGVuZXJzLm9uY2UpICYmXG4gICAgICAoIWNvbnRleHQgfHwgbGlzdGVuZXJzLmNvbnRleHQgPT09IGNvbnRleHQpXG4gICAgKSB7XG4gICAgICBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwLCBldmVudHMgPSBbXSwgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGxpc3RlbmVyc1tpXS5mbiAhPT0gZm4gfHxcbiAgICAgICAgKG9uY2UgJiYgIWxpc3RlbmVyc1tpXS5vbmNlKSB8fFxuICAgICAgICAoY29udGV4dCAmJiBsaXN0ZW5lcnNbaV0uY29udGV4dCAhPT0gY29udGV4dClcbiAgICAgICkge1xuICAgICAgICBldmVudHMucHVzaChsaXN0ZW5lcnNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vXG4gICAgLy8gUmVzZXQgdGhlIGFycmF5LCBvciByZW1vdmUgaXQgY29tcGxldGVseSBpZiB3ZSBoYXZlIG5vIG1vcmUgbGlzdGVuZXJzLlxuICAgIC8vXG4gICAgaWYgKGV2ZW50cy5sZW5ndGgpIHRoaXMuX2V2ZW50c1tldnRdID0gZXZlbnRzLmxlbmd0aCA9PT0gMSA/IGV2ZW50c1swXSA6IGV2ZW50cztcbiAgICBlbHNlIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYWxsIGxpc3RlbmVycywgb3IgdGhvc2Ugb2YgdGhlIHNwZWNpZmllZCBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gW2V2ZW50XSBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnQpIHtcbiAgdmFyIGV2dDtcblxuICBpZiAoZXZlbnQpIHtcbiAgICBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuICAgIGlmICh0aGlzLl9ldmVudHNbZXZ0XSkgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudHMoKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vXG4vLyBBbGlhcyBtZXRob2RzIG5hbWVzIGJlY2F1c2UgcGVvcGxlIHJvbGwgbGlrZSB0aGF0LlxuLy9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBwcmVmaXguXG4vL1xuRXZlbnRFbWl0dGVyLnByZWZpeGVkID0gcHJlZml4O1xuXG4vL1xuLy8gQWxsb3cgYEV2ZW50RW1pdHRlcmAgdG8gYmUgaW1wb3J0ZWQgYXMgbW9kdWxlIG5hbWVzcGFjZS5cbi8vXG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xuaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgbW9kdWxlKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xufVxuIiwgImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi9pbmRleC5qcydcblxuZXhwb3J0IHsgRXZlbnRFbWl0dGVyIH1cbmV4cG9ydCBkZWZhdWx0IEV2ZW50RW1pdHRlclxuIiwgIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50ZW1pdHRlcjNcIjtcbi8qaW1wb3J0IGVydWRhIGZyb20gXCJlcnVkYVwiO1xuZXJ1ZGEuaW5pdCgpOyovXG5cbmNvbnN0IHJlc2V0QnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVzZXRcIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG5cbmNsYXNzIEdhbWUge1xuICAgIHJlYWRvbmx5IG1vbmV5RWxlbWVudDogSFRNTFNwYW5FbGVtZW50O1xuICAgIHJlYWRvbmx5IGNsaWNrc0VsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xuICAgIHJlYWRvbmx5IHN0b3JlOiBTdG9yZTtcbiAgICBcbiAgICB0aWNrczogbnVtYmVyO1xuICAgIFxuICAgIG1vbmV5OiBudW1iZXI7XG4gICAgY2xpY2tzOiBudW1iZXI7XG4gICAgbXVsdGlwbGllcjogbnVtYmVyO1xuICAgIGF1dG9DbGlja2VyczogQXV0b0NsaWNrZXJbXTtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgbW9uZXlFbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQsXG4gICAgICAgIGNsaWNrc0VsZW1lbnQ6IEhUTUxEaXZFbGVtZW50LFxuICAgICAgICBzdG9yZTogU3RvcmVcbiAgICApIHtcbiAgICAgICAgdGhpcy5tb25leUVsZW1lbnQgPSBtb25leUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuY2xpY2tzRWxlbWVudCA9IGNsaWNrc0VsZW1lbnQ7XG4gICAgICAgIHRoaXMuc3RvcmUgPSBzdG9yZTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMudGlja3MgPSAwO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5tb25leSA9IDA7XG4gICAgICAgIHRoaXMuY2xpY2tzID0gMDtcbiAgICAgICAgdGhpcy5tdWx0aXBsaWVyID0gMTtcbiAgICAgICAgdGhpcy5hdXRvQ2xpY2tlcnMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGNsaWNrc0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2xpY2soKTtcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGlja3MrKztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IHRpY2tJblNlY29uZCA9IHRoaXMudGlja3MgJSAyMCB8fCAyMDtcbiAgICAgICAgICAgIGZvcihjb25zdCBhdXRvQ2xpY2tlciBvZiB0aGlzLmF1dG9DbGlja2Vycykge1xuICAgICAgICAgICAgICAgIGlmKGF1dG9DbGlja2VyLnRpY2sgIT09IHRpY2tJblNlY29uZCkgY29udGludWU7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBtb25leUVsZW1lbnQuaW5uZXJUZXh0ID0gTWF0aC5mbG9vcih0aGlzLm1vbmV5KS50b1N0cmluZygpO1xuICAgICAgICAgICAgY2xpY2tzRWxlbWVudC5pbm5lclRleHQgPSB0aGlzLmNsaWNrcy50b1N0cmluZygpO1xuICAgICAgICB9LCA1MClcbiAgICB9XG4gICAgXG4gICAgY2xpY2soKSB7XG4gICAgICAgIHRoaXMuY2xpY2tzICs9IHRoaXMubXVsdGlwbGllcjtcbiAgICB9XG59XG5cbmNsYXNzIFN0b3JlIHtcbiAgICByZWFkb25seSBlbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcbiAgICBpdGVtczogUmVjb3JkPHN0cmluZywgU3RvcmVJdGVtPjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRGl2RWxlbWVudCwgaXRlbXM6IFJlY29yZDxzdHJpbmcsIFN0b3JlSXRlbT4pIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xuICAgIH1cbn1cblxuY2xhc3MgU3RvcmVJdGVtIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICAjcHJpY2U6IG51bWJlcjtcbiAgICByZWFkb25seSBnYW1lOiBHYW1lO1xuICAgIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbiAgICByZWFkb25seSBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgICAgIGdhbWU6IEdhbWUsXG4gICAgICAgIG5hbWU6IHN0cmluZyxcbiAgICAgICAgcHJpY2U6IG51bWJlclxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLiNwcmljZSA9IHByaWNlO1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICBcbiAgICAgICAgLyppZih0eXBlb2Ygb25CdXkgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGdhbWUubW9uZXkgPj0gdGhpcy5wcmljZSkge1xuICAgICAgICAgICAgICAgICAgICBnYW1lLm1vbmV5IC09IHRoaXMucHJpY2U7XG4gICAgICAgICAgICAgICAgICAgIG9uQnV5LmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSovXG4gICAgICAgIFxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJjbGlja1wiKTtcbiAgICAgICAgICAgIGlmKGdhbWUubW9uZXkgPj0gdGhpcy5wcmljZSkge1xuICAgICAgICAgICAgICAgIGdhbWUubW9uZXkgLT0gdGhpcy5wcmljZTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJidXlcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgIFxuICAgIGdldCBwcmljZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy4jcHJpY2U7XG4gICAgfVxuICAgIHNldCBwcmljZShhOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy4jcHJpY2UgPSBhO1xuICAgICAgICB0aGlzLmVsZW1lbnQuaW5uZXJUZXh0ID0gYCR7dGhpcy5uYW1lfSBSJCR7YX1gO1xuICAgIH1cbiAgICBcbiAgICBvbkJ1eShoYW5kbGVyOiAodGhpczogdGhpcykgPT4gdm9pZCk6IHRoaXMge1xuICAgICAgICB0aGlzLm9uKFwiYnV5XCIsICgpID0+IHtcbiAgICAgICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIG9uQ2xpY2soaGFuZGxlcjogKHRoaXM6IHRoaXMpID0+IHZvaWQpOiB0aGlzIHtcbiAgICAgICAgdGhpcy5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIGJ1eSgpIHtcbiAgICAgICAgaWYoZ2FtZS5tb25leSA+PSB0aGlzLnByaWNlKSB7XG4gICAgICAgICAgICBnYW1lLm1vbmV5IC09IHRoaXMucHJpY2U7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJidXlcIik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIEF1dG9DbGlja2VyIHtcbiAgICB0aWNrOiBudW1iZXI7XG4gICAgXG4gICAgY29uc3RydWN0b3IodGljazogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMudGljayA9IHRpY2s7XG4gICAgfVxufVxuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0b3JlXCIpIGFzIEhUTUxEaXZFbGVtZW50LCB7fSk7XG5cbmV4cG9ydCBjb25zdCBnYW1lID0gbmV3IEdhbWUoXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb25leVwiKSBhcyBIVE1MU3BhbkVsZW1lbnQsXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjbGlja1wiKSBhcyBIVE1MRGl2RWxlbWVudCxcbiAgICBzdG9yZVxuKTtcblxuY29uc3QgREVGQVVMVF9JVEVNX1BSSUNFUzogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHtcbiAgICBcImF1dG9DbGlja1wiOiAxMDAsXG4gICAgXCJtdWx0aXBsaWVyXCI6IDEwMDBcbn1cblxuc3RvcmUuaXRlbXMgPSB7XG4gICAgXCJzZWxsXCI6IG5ldyBTdG9yZUl0ZW0oZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxsX2J1dHRvbi5zZWxsXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50LCBnYW1lLCBcIlZlbmRlclwiLCAwKVxuICAgIC5vbkNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmdhbWUubW9uZXkgKz0gdGhpcy5nYW1lLmNsaWNrcztcbiAgICAgICAgdGhpcy5nYW1lLmNsaWNrcyA9IDA7XG4gICAgfSksXG4gICAgXG4gICAgXCJhdXRvQ2xpY2tcIjogbmV3IFN0b3JlSXRlbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1eV9idXR0b24uYXV0b19jbGlja1wiKSBhcyBIVE1MQnV0dG9uRWxlbWVudCwgZ2FtZSwgXCJBdXRvIENsaWNrZXJcIiwgREVGQVVMVF9JVEVNX1BSSUNFUy5hdXRvQ2xpY2shKVxuICAgIC5vbkJ1eShmdW5jdGlvbih0aWNrPzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucHJpY2UgKz0gMTI7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBhdXRvQ2xpY2tlciA9IG5ldyBBdXRvQ2xpY2tlcih0aWNrID8gKHRpY2sgJSAyMCB8fCAyMCkgOiAodGhpcy5nYW1lLnRpY2tzICUgMjAgfHwgMjApKTtcbiAgICAgICAgdGhpcy5nYW1lLmF1dG9DbGlja2Vycy5wdXNoKGF1dG9DbGlja2VyKTtcbiAgICB9KSxcbiAgICBcbiAgICBcImF1dG9DbGljay5hbGxcIjogbmV3IFN0b3JlSXRlbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1eV9hbGxfYnV0dG9uLmF1dG9fY2xpY2tcIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQsIGdhbWUsIFwiQ29tcHJhciB0b2Rvc1wiLCAwKVxuICAgIC5vbkNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgdGljayA9IHRoaXMuZ2FtZS50aWNrcztcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBnYW1lLnN0b3JlLml0ZW1zW1wiYXV0b0NsaWNrXCJdITtcbiAgICAgICAgd2hpbGUodGhpcy5nYW1lLm1vbmV5ID49IGl0ZW0ucHJpY2UpIHtcbiAgICAgICAgICAgIGl0ZW0uYnV5KCk7XG4gICAgICAgICAgICBjb25zdCBhdXRvQ2xpY2tlciA9IHRoaXMuZ2FtZS5hdXRvQ2xpY2tlcnNbdGhpcy5nYW1lLmF1dG9DbGlja2Vycy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGlmKGF1dG9DbGlja2VyKSBhdXRvQ2xpY2tlci50aWNrID0gKHRpY2srKyAlIDIwIHx8IDIwKTtcbiAgICAgICAgfVxuICAgIH0pLFxuICAgIFxuICAgIFwibXVsdGlwbGllclwiOiBuZXcgU3RvcmVJdGVtKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV5X2J1dHRvbi5tdWx0aXBsaWVyXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50LCBnYW1lLCBcIk11bHRpcGxpY2Fkb3JcIiwgREVGQVVMVF9JVEVNX1BSSUNFUy5tdWx0aXBsaWVyISlcbiAgICAub25CdXkoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucHJpY2UgKz0gTWF0aC5mbG9vcih0aGlzLnByaWNlICogMS4yKTtcbiAgICAgICAgdGhpcy5nYW1lLm11bHRpcGxpZXIrKztcbiAgICB9KSxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIGdhbWUudGlja3MgPSAwO1xuICAgIGdhbWUubW9uZXkgPSAwO1xuICAgIGdhbWUuY2xpY2tzID0gMDtcbiAgICBnYW1lLm11bHRpcGxpZXIgPSAxO1xuICAgIGdhbWUuYXV0b0NsaWNrZXJzID0gW107XG4gICAgXG4gICAgZm9yKGNvbnN0IGtleSBpbiBERUZBVUxUX0lURU1fUFJJQ0VTKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBnYW1lLnN0b3JlLml0ZW1zW2tleV07XG4gICAgICAgIGlmKCFpdGVtKSBjb250aW51ZTtcbiAgICAgICAgY29uc3QgZGVmSXRlbVByaWNlID0gREVGQVVMVF9JVEVNX1BSSUNFU1trZXldO1xuICAgICAgICBpZihkZWZJdGVtUHJpY2UgPT09IHVuZGVmaW5lZCkgY29udGludWU7XG4gICAgICAgIFxuICAgICAgICBpdGVtLnByaWNlID0gZGVmSXRlbVByaWNlO1xuICAgIH1cbn1cblxucmVzZXRCdXR0b25FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgbGV0IHJlcyA9IHdpbmRvdy5jb25maXJtKFwiRGVzZWphIHJlc2V0YXIgbyBqb2dvP1wiKTtcbiAgICBpZihyZXMpIHJlc2V0KCk7XG59KVxuXG5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0aWNrc1wiLCBnYW1lLnRpY2tzLnRvU3RyaW5nKCkpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibW9uZXlcIiwgZ2FtZS5tb25leS4gdG9TdHJpbmcoKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJjbGlja3NcIiwgZ2FtZS5jbGlja3MudG9TdHJpbmcoKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJtdWx0aXBsaWVyXCIsIGdhbWUubXVsdGlwbGllci50b1N0cmluZygpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImF1dG9fY2xpY2tlcl90aWNrc1wiLCBKU09OLnN0cmluZ2lmeShnYW1lLmF1dG9DbGlja2Vycy5tYXAoYSA9PiBhLnRpY2spKSk7XG4gICAgXG4gICAgZm9yKGNvbnN0IGtleSBpbiBnYW1lLnN0b3JlLml0ZW1zKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBnYW1lLnN0b3JlLml0ZW1zW2tleV0hO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgc3RvcmUuJHtrZXl9LnByaWNlYCwgaXRlbS5wcmljZS50b1N0cmluZygpKTtcbiAgICB9XG59LCAzMDApXG5cbmdhbWUudGlja3MgPSBOdW1iZXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0aWNrc1wiKSkgfHwgZ2FtZS50aWNrcztcbmdhbWUubW9uZXkgPSBOdW1iZXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJtb25leVwiKSkgfHwgZ2FtZS5tb25leTtcbmdhbWUuY2xpY2tzID0gTnVtYmVyKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY2xpY2tzXCIpKSB8fCBnYW1lLmNsaWNrcztcbmdhbWUubXVsdGlwbGllciA9IE51bWJlcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIm11bHRpcGxpZXJcIikpIHx8IGdhbWUubXVsdGlwbGllcjtcblxubGV0IGxvY2FsQXV0b0NsaWNrZXJUaWNrczogbnVtYmVyW10gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG50cnkge1xuICAgIGxvY2FsQXV0b0NsaWNrZXJUaWNrcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJhdXRvX2NsaWNrZXJfdGlja3NcIikgfHwgXCJbXVwiKTtcbn0gY2F0Y2gge31cblxuaWYoQXJyYXkuaXNBcnJheShsb2NhbEF1dG9DbGlja2VyVGlja3MpKSB7XG4gICAgZm9yKGNvbnN0IHRpY2sgb2YgbG9jYWxBdXRvQ2xpY2tlclRpY2tzKSB7XG4gICAgICAgIGNvbnN0IGF1dG9DbGlja2VyID0gbmV3IEF1dG9DbGlja2VyKHRpY2sgfHwgMSk7XG4gICAgICAgIGdhbWUuYXV0b0NsaWNrZXJzLnB1c2goYXV0b0NsaWNrZXIpO1xuICAgIH1cbn1cblxuZm9yKGNvbnN0IGtleSBpbiBnYW1lLnN0b3JlLml0ZW1zKSB7XG4gICAgY29uc3QgaXRlbSA9IGdhbWUuc3RvcmUuaXRlbXNba2V5XSE7XG4gICAgXG4gICAgbGV0IHByaWNlID0gTnVtYmVyKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBzdG9yZS4ke2tleX0ucHJpY2VgKSk7XG4gICAgaWYoTnVtYmVyLmlzTmFOKHByaWNlKSkgY29udGludWU7XG4gICAgXG4gICAgY29uc3QgZGVmSXRlbVByaWNlID0gREVGQVVMVF9JVEVNX1BSSUNFU1trZXldO1xuICAgIGlmKGl0ZW0ucHJpY2UgIT09IHByaWNlICYmIHByaWNlID4gKGRlZkl0ZW1QcmljZSA/PyAwKSkgaXRlbS5wcmljZSA9IHByaWNlO1xufVxuXG4od2luZG93IGFzIGFueSkuZ2FtZSA9IGdhbWU7Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFFQSxVQUFJLE1BQU0sT0FBTyxVQUFVO0FBQTNCLFVBQ0ksU0FBUztBQVNiLGVBQVMsU0FBUztBQUFBLE1BQUM7QUFTbkIsVUFBSSxPQUFPLFFBQVE7QUFDakIsZUFBTyxZQUFZLHVCQUFPLE9BQU8sSUFBSTtBQU1yQyxZQUFJLENBQUMsSUFBSSxPQUFPLEVBQUUsVUFBVyxVQUFTO0FBQUEsTUFDeEM7QUFXQSxlQUFTLEdBQUcsSUFBSSxTQUFTLE1BQU07QUFDN0IsYUFBSyxLQUFLO0FBQ1YsYUFBSyxVQUFVO0FBQ2YsYUFBSyxPQUFPLFFBQVE7QUFBQSxNQUN0QjtBQWFBLGVBQVMsWUFBWSxTQUFTLE9BQU8sSUFBSSxTQUFTLE1BQU07QUFDdEQsWUFBSSxPQUFPLE9BQU8sWUFBWTtBQUM1QixnQkFBTSxJQUFJLFVBQVUsaUNBQWlDO0FBQUEsUUFDdkQ7QUFFQSxZQUFJLFdBQVcsSUFBSSxHQUFHLElBQUksV0FBVyxTQUFTLElBQUksR0FDOUMsTUFBTSxTQUFTLFNBQVMsUUFBUTtBQUVwQyxZQUFJLENBQUMsUUFBUSxRQUFRLEdBQUcsRUFBRyxTQUFRLFFBQVEsR0FBRyxJQUFJLFVBQVUs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UUFBRyxJQUFLLE9BQU07QUFBQSxFQUNsQixDQUFDO0FBRUQsY0FBWSxNQUFNO0FBQ2QsaUJBQWEsUUFBUSxTQUFTLEtBQUssTUFBTSxTQUFTLENBQUM7QUFDbkQsaUJBQWEsUUFBUSxTQUFTLEtBQUssTUFBTyxTQUFTLENBQUM7QUFDcEQsaUJBQWEsUUFBUSxVQUFVLEtBQUssT0FBTyxTQUFTLENBQUM7QUFDckQsaUJBQWEsUUFBUSxjQUFjLEtBQUssV0FBVyxTQUFTLENBQUM7QUFDN0QsaUJBQWEsUUFBUSxzQkFBc0IsS0FBSyxVQUFVLEtBQUssYUFBYSxJQUFJLE9BQUssRUFBRSxJQUFJLENBQUMsQ0FBQztBQUU3RixlQUFVLE9BQU8sS0FBSyxNQUFNLE9BQU87QUFDL0IsWUFBTSxPQUFPLEtBQUssTUFBTSxNQUFNLEdBQUc7QUFDakMsbUJBQWEsUUFBUSxTQUFTLEdBQUcsVUFBVSxLQUFLLE1BQU0sU0FBUyxDQUFDO0FBQUEsSUFDcEU7QUFBQSxFQUNKLEdBQUcsR0FBRztBQUVOLE9BQUssUUFBUSxPQUFPLGFBQWEsUUFBUSxPQUFPLENBQUMsS0FBSyxLQUFLO0FBQzNELE9BQUssUUFBUSxPQUFPLGFBQWEsUUFBUSxPQUFPLENBQUMsS0FBSyxLQUFLO0FBQzNELE9BQUssU0FBUyxPQUFPLGFBQWEsUUFBUSxRQUFRLENBQUMsS0FBSyxLQUFLO0FBQzdELE9BQUssYUFBYSxPQUFPLGFBQWEsUUFBUSxZQUFZLENBQUMsS0FBSyxLQUFLO0FBRXJFLE1BQUksd0JBQThDO0FBQ2xELE1BQUk7QUFDQSw0QkFBd0IsS0FBSyxNQUFNLGFBQWEsUUFBUSxvQkFBb0IsS0FBSyxJQUFJO0FBQUEsRUFDekYsUUFBUTtBQUFBLEVBQUM7QUFFVCxNQUFHLE1BQU0sUUFBUSxxQkFBcUIsR0FBRztBQUNyQyxlQUFVLFFBQVEsdUJBQXVCO0FBQ3JDLFlBQU0sY0FBYyxJQUFJLFlBQVksUUFBUSxDQUFDO0FBQzdDLFdBQUssYUFBYSxLQUFLLFdBQVc7QUFBQSxJQUN0QztBQUFBLEVBQ0o7QUFFQSxhQUFVLE9BQU8sS0FBSyxNQUFNLE9BQU87QUFDL0IsVUFBTSxPQUFPLEtBQUssTUFBTSxNQUFNLEdBQUc7QUFFakMsUUFBSSxRQUFRLE9BQU8sYUFBYSxRQUFRLFNBQVMsR0FBRyxRQUFRLENBQUM7QUFDN0QsUUFBRyxPQUFPLE1BQU0sS0FBSyxFQUFHO0FBRXhCLFVBQU0sZUFBZSxvQkFBb0IsR0FBRztBQUM1QyxRQUFHLEtBQUssVUFBVSxTQUFTLFNBQVMsZ0JBQWdCLEdBQUksTUFBSyxRQUFRO0FBQUEsRUFDekU7QUFFQSxFQUFDLE9BQWUsT0FBTzsiLAogICJuYW1lcyI6IFsiRXZlbnRFbWl0dGVyIiwgInN0b3JlIiwgIkV2ZW50RW1pdHRlciIsICJnYW1lIl0KfQo=
