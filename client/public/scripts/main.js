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
    _oldClicksElementTextLength;
    constructor(moneyElement, clicksElement, store2) {
      this.moneyElement = moneyElement;
      this.clicksElement = clicksElement;
      this.store = store2;
      this.ticks = 0;
      this.money = 0;
      this.clicks = 0;
      this.multiplier = 1;
      this.autoClickers = [];
      this._oldClicksElementTextLength = 1;
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
        let clicksStr = this.clicks.toString();
        if (this._oldClicksElementTextLength !== clicksStr.length) {
          this.clicksElement.style.fontSize = `${160 - clicksStr.length * 10}px`;
          this._oldClicksElementTextLength = clicksStr.length;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2V2ZW50ZW1pdHRlcjNANS4wLjQvbm9kZV9tb2R1bGVzL2V2ZW50ZW1pdHRlcjMvaW5kZXguanMiLCAiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2V2ZW50ZW1pdHRlcjNANS4wLjQvbm9kZV9tb2R1bGVzL2V2ZW50ZW1pdHRlcjMvaW5kZXgubWpzIiwgIi4uLy4uL3NjcmlwdHMvbWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuICAsIHByZWZpeCA9ICd+JztcblxuLyoqXG4gKiBDb25zdHJ1Y3RvciB0byBjcmVhdGUgYSBzdG9yYWdlIGZvciBvdXIgYEVFYCBvYmplY3RzLlxuICogQW4gYEV2ZW50c2AgaW5zdGFuY2UgaXMgYSBwbGFpbiBvYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhcmUgZXZlbnQgbmFtZXMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBFdmVudHMoKSB7fVxuXG4vL1xuLy8gV2UgdHJ5IHRvIG5vdCBpbmhlcml0IGZyb20gYE9iamVjdC5wcm90b3R5cGVgLiBJbiBzb21lIGVuZ2luZXMgY3JlYXRpbmcgYW5cbi8vIGluc3RhbmNlIGluIHRoaXMgd2F5IGlzIGZhc3RlciB0aGFuIGNhbGxpbmcgYE9iamVjdC5jcmVhdGUobnVsbClgIGRpcmVjdGx5LlxuLy8gSWYgYE9iamVjdC5jcmVhdGUobnVsbClgIGlzIG5vdCBzdXBwb3J0ZWQgd2UgcHJlZml4IHRoZSBldmVudCBuYW1lcyB3aXRoIGFcbi8vIGNoYXJhY3RlciB0byBtYWtlIHN1cmUgdGhhdCB0aGUgYnVpbHQtaW4gb2JqZWN0IHByb3BlcnRpZXMgYXJlIG5vdFxuLy8gb3ZlcnJpZGRlbiBvciB1c2VkIGFzIGFuIGF0dGFjayB2ZWN0b3IuXG4vL1xuaWYgKE9iamVjdC5jcmVhdGUpIHtcbiAgRXZlbnRzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgLy9cbiAgLy8gVGhpcyBoYWNrIGlzIG5lZWRlZCBiZWNhdXNlIHRoZSBgX19wcm90b19fYCBwcm9wZXJ0eSBpcyBzdGlsbCBpbmhlcml0ZWQgaW5cbiAgLy8gc29tZSBvbGQgYnJvd3NlcnMgbGlrZSBBbmRyb2lkIDQsIGlQaG9uZSA1LjEsIE9wZXJhIDExIGFuZCBTYWZhcmkgNS5cbiAgLy9cbiAgaWYgKCFuZXcgRXZlbnRzKCkuX19wcm90b19fKSBwcmVmaXggPSBmYWxzZTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRhdGlvbiBvZiBhIHNpbmdsZSBldmVudCBsaXN0ZW5lci5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHBhcmFtIHtCb29sZWFufSBbb25jZT1mYWxzZV0gU3BlY2lmeSBpZiB0aGUgbGlzdGVuZXIgaXMgYSBvbmUtdGltZSBsaXN0ZW5lci5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gRUUoZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdGhpcy5mbiA9IGZuO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLm9uY2UgPSBvbmNlIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIEFkZCBhIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBlbWl0dGVyIFJlZmVyZW5jZSB0byB0aGUgYEV2ZW50RW1pdHRlcmAgaW5zdGFuY2UuXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIFNwZWNpZnkgaWYgdGhlIGxpc3RlbmVyIGlzIGEgb25lLXRpbWUgbGlzdGVuZXIuXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYWRkTGlzdGVuZXIoZW1pdHRlciwgZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICB2YXIgbGlzdGVuZXIgPSBuZXcgRUUoZm4sIGNvbnRleHQgfHwgZW1pdHRlciwgb25jZSlcbiAgICAsIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCFlbWl0dGVyLl9ldmVudHNbZXZ0XSkgZW1pdHRlci5fZXZlbnRzW2V2dF0gPSBsaXN0ZW5lciwgZW1pdHRlci5fZXZlbnRzQ291bnQrKztcbiAgZWxzZSBpZiAoIWVtaXR0ZXIuX2V2ZW50c1tldnRdLmZuKSBlbWl0dGVyLl9ldmVudHNbZXZ0XS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZSBlbWl0dGVyLl9ldmVudHNbZXZ0XSA9IFtlbWl0dGVyLl9ldmVudHNbZXZ0XSwgbGlzdGVuZXJdO1xuXG4gIHJldHVybiBlbWl0dGVyO1xufVxuXG4vKipcbiAqIENsZWFyIGV2ZW50IGJ5IG5hbWUuXG4gKlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IGVtaXR0ZXIgUmVmZXJlbmNlIHRvIHRoZSBgRXZlbnRFbWl0dGVyYCBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldnQgVGhlIEV2ZW50IG5hbWUuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjbGVhckV2ZW50KGVtaXR0ZXIsIGV2dCkge1xuICBpZiAoLS1lbWl0dGVyLl9ldmVudHNDb3VudCA9PT0gMCkgZW1pdHRlci5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICBlbHNlIGRlbGV0ZSBlbWl0dGVyLl9ldmVudHNbZXZ0XTtcbn1cblxuLyoqXG4gKiBNaW5pbWFsIGBFdmVudEVtaXR0ZXJgIGludGVyZmFjZSB0aGF0IGlzIG1vbGRlZCBhZ2FpbnN0IHRoZSBOb2RlLmpzXG4gKiBgRXZlbnRFbWl0dGVyYCBpbnRlcmZhY2UuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG59XG5cbi8qKlxuICogUmV0dXJuIGFuIGFycmF5IGxpc3RpbmcgdGhlIGV2ZW50cyBmb3Igd2hpY2ggdGhlIGVtaXR0ZXIgaGFzIHJlZ2lzdGVyZWRcbiAqIGxpc3RlbmVycy5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHZhciBuYW1lcyA9IFtdXG4gICAgLCBldmVudHNcbiAgICAsIG5hbWU7XG5cbiAgaWYgKHRoaXMuX2V2ZW50c0NvdW50ID09PSAwKSByZXR1cm4gbmFtZXM7XG5cbiAgZm9yIChuYW1lIGluIChldmVudHMgPSB0aGlzLl9ldmVudHMpKSB7XG4gICAgaWYgKGhhcy5jYWxsKGV2ZW50cywgbmFtZSkpIG5hbWVzLnB1c2gocHJlZml4ID8gbmFtZS5zbGljZSgxKSA6IG5hbWUpO1xuICB9XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICByZXR1cm4gbmFtZXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZXZlbnRzKSk7XG4gIH1cblxuICByZXR1cm4gbmFtZXM7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge0FycmF5fSBUaGUgcmVnaXN0ZXJlZCBsaXN0ZW5lcnMuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKGV2ZW50KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50XG4gICAgLCBoYW5kbGVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmICghaGFuZGxlcnMpIHJldHVybiBbXTtcbiAgaWYgKGhhbmRsZXJzLmZuKSByZXR1cm4gW2hhbmRsZXJzLmZuXTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGhhbmRsZXJzLmxlbmd0aCwgZWUgPSBuZXcgQXJyYXkobCk7IGkgPCBsOyBpKyspIHtcbiAgICBlZVtpXSA9IGhhbmRsZXJzW2ldLmZuO1xuICB9XG5cbiAgcmV0dXJuIGVlO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIG51bWJlciBvZiBsaXN0ZW5lcnMgbGlzdGVuaW5nIHRvIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWJlciBvZiBsaXN0ZW5lcnMuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uIGxpc3RlbmVyQ291bnQoZXZlbnQpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnRcbiAgICAsIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmICghbGlzdGVuZXJzKSByZXR1cm4gMDtcbiAgaWYgKGxpc3RlbmVycy5mbikgcmV0dXJuIDE7XG4gIHJldHVybiBsaXN0ZW5lcnMubGVuZ3RoO1xufTtcblxuLyoqXG4gKiBDYWxscyBlYWNoIG9mIHRoZSBsaXN0ZW5lcnMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBldmVudCBoYWQgbGlzdGVuZXJzLCBlbHNlIGBmYWxzZWAuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZlbnQsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1tldnRdKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdXG4gICAgLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBhcmdzXG4gICAgLCBpO1xuXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAobGlzdGVuZXJzLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVycy5mbiwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICBjYXNlIDE6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCksIHRydWU7XG4gICAgICBjYXNlIDI6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEpLCB0cnVlO1xuICAgICAgY2FzZSAzOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiksIHRydWU7XG4gICAgICBjYXNlIDQ6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMyksIHRydWU7XG4gICAgICBjYXNlIDU6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQpLCB0cnVlO1xuICAgICAgY2FzZSA2OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMsIGE0LCBhNSksIHRydWU7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5mbi5hcHBseShsaXN0ZW5lcnMuY29udGV4dCwgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGhcbiAgICAgICwgajtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxpc3RlbmVyc1tpXS5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnNbaV0uZm4sIHVuZGVmaW5lZCwgdHJ1ZSk7XG5cbiAgICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICAgIGNhc2UgMTogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQpOyBicmVhaztcbiAgICAgICAgY2FzZSAyOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEpOyBicmVhaztcbiAgICAgICAgY2FzZSAzOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgNDogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExLCBhMiwgYTMpOyBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAoIWFyZ3MpIGZvciAoaiA9IDEsIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0xKTsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICBhcmdzW2ogLSAxXSA9IGFyZ3VtZW50c1tqXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaXN0ZW5lcnNbaV0uZm4uYXBwbHkobGlzdGVuZXJzW2ldLmNvbnRleHQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBBZGQgYSBsaXN0ZW5lciBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IFtjb250ZXh0PXRoaXNdIFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCBmYWxzZSk7XG59O1xuXG4vKipcbiAqIEFkZCBhIG9uZS10aW1lIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCB0cnVlKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBsaXN0ZW5lcnMgb2YgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgbWF0Y2ggdGhpcyBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgaGF2ZSB0aGlzIGNvbnRleHQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgT25seSByZW1vdmUgb25lLXRpbWUgbGlzdGVuZXJzLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiB0aGlzO1xuICBpZiAoIWZuKSB7XG4gICAgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAoXG4gICAgICBsaXN0ZW5lcnMuZm4gPT09IGZuICYmXG4gICAgICAoIW9uY2UgfHwgbGlzdGVuZXJzLm9uY2UpICYmXG4gICAgICAoIWNvbnRleHQgfHwgbGlzdGVuZXJzLmNvbnRleHQgPT09IGNvbnRleHQpXG4gICAgKSB7XG4gICAgICBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwLCBldmVudHMgPSBbXSwgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGxpc3RlbmVyc1tpXS5mbiAhPT0gZm4gfHxcbiAgICAgICAgKG9uY2UgJiYgIWxpc3RlbmVyc1tpXS5vbmNlKSB8fFxuICAgICAgICAoY29udGV4dCAmJiBsaXN0ZW5lcnNbaV0uY29udGV4dCAhPT0gY29udGV4dClcbiAgICAgICkge1xuICAgICAgICBldmVudHMucHVzaChsaXN0ZW5lcnNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vXG4gICAgLy8gUmVzZXQgdGhlIGFycmF5LCBvciByZW1vdmUgaXQgY29tcGxldGVseSBpZiB3ZSBoYXZlIG5vIG1vcmUgbGlzdGVuZXJzLlxuICAgIC8vXG4gICAgaWYgKGV2ZW50cy5sZW5ndGgpIHRoaXMuX2V2ZW50c1tldnRdID0gZXZlbnRzLmxlbmd0aCA9PT0gMSA/IGV2ZW50c1swXSA6IGV2ZW50cztcbiAgICBlbHNlIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYWxsIGxpc3RlbmVycywgb3IgdGhvc2Ugb2YgdGhlIHNwZWNpZmllZCBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gW2V2ZW50XSBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnQpIHtcbiAgdmFyIGV2dDtcblxuICBpZiAoZXZlbnQpIHtcbiAgICBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuICAgIGlmICh0aGlzLl9ldmVudHNbZXZ0XSkgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudHMoKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vXG4vLyBBbGlhcyBtZXRob2RzIG5hbWVzIGJlY2F1c2UgcGVvcGxlIHJvbGwgbGlrZSB0aGF0LlxuLy9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBwcmVmaXguXG4vL1xuRXZlbnRFbWl0dGVyLnByZWZpeGVkID0gcHJlZml4O1xuXG4vL1xuLy8gQWxsb3cgYEV2ZW50RW1pdHRlcmAgdG8gYmUgaW1wb3J0ZWQgYXMgbW9kdWxlIG5hbWVzcGFjZS5cbi8vXG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xuaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgbW9kdWxlKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xufVxuIiwgImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi9pbmRleC5qcydcblxuZXhwb3J0IHsgRXZlbnRFbWl0dGVyIH1cbmV4cG9ydCBkZWZhdWx0IEV2ZW50RW1pdHRlclxuIiwgIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50ZW1pdHRlcjNcIjtcbi8qaW1wb3J0IGVydWRhIGZyb20gXCJlcnVkYVwiO1xuZXJ1ZGEuaW5pdCgpOyovXG5cbmNvbnN0IHJlc2V0QnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVzZXRcIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG5cbmNsYXNzIEdhbWUge1xuICAgIHJlYWRvbmx5IG1vbmV5RWxlbWVudDogSFRNTFNwYW5FbGVtZW50O1xuICAgIHJlYWRvbmx5IGNsaWNrc0VsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xuICAgIHJlYWRvbmx5IHN0b3JlOiBTdG9yZTtcbiAgICBcbiAgICB0aWNrczogbnVtYmVyO1xuICAgIFxuICAgIG1vbmV5OiBudW1iZXI7XG4gICAgY2xpY2tzOiBudW1iZXI7XG4gICAgbXVsdGlwbGllcjogbnVtYmVyO1xuICAgIGF1dG9DbGlja2VyczogQXV0b0NsaWNrZXJbXTtcbiAgICBfb2xkQ2xpY2tzRWxlbWVudFRleHRMZW5ndGg6IG51bWJlcjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgbW9uZXlFbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQsXG4gICAgICAgIGNsaWNrc0VsZW1lbnQ6IEhUTUxEaXZFbGVtZW50LFxuICAgICAgICBzdG9yZTogU3RvcmVcbiAgICApIHtcbiAgICAgICAgdGhpcy5tb25leUVsZW1lbnQgPSBtb25leUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuY2xpY2tzRWxlbWVudCA9IGNsaWNrc0VsZW1lbnQ7XG4gICAgICAgIHRoaXMuc3RvcmUgPSBzdG9yZTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMudGlja3MgPSAwO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5tb25leSA9IDA7XG4gICAgICAgIHRoaXMuY2xpY2tzID0gMDtcbiAgICAgICAgdGhpcy5tdWx0aXBsaWVyID0gMTtcbiAgICAgICAgdGhpcy5hdXRvQ2xpY2tlcnMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX29sZENsaWNrc0VsZW1lbnRUZXh0TGVuZ3RoID0gMTtcbiAgICAgICAgXG4gICAgICAgIGNsaWNrc0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2xpY2soKTtcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGlja3MrKztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IHRpY2tJblNlY29uZCA9IHRoaXMudGlja3MgJSAyMCB8fCAyMDtcbiAgICAgICAgICAgIGZvcihjb25zdCBhdXRvQ2xpY2tlciBvZiB0aGlzLmF1dG9DbGlja2Vycykge1xuICAgICAgICAgICAgICAgIGlmKGF1dG9DbGlja2VyLnRpY2sgIT09IHRpY2tJblNlY29uZCkgY29udGludWU7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgY2xpY2tzU3RyID0gdGhpcy5jbGlja3MudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGlmKHRoaXMuX29sZENsaWNrc0VsZW1lbnRUZXh0TGVuZ3RoICE9PSBjbGlja3NTdHIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja3NFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gYCR7MTYwIC0gY2xpY2tzU3RyLmxlbmd0aCAqIDEwfXB4YDtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbGRDbGlja3NFbGVtZW50VGV4dExlbmd0aCA9IGNsaWNrc1N0ci5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG1vbmV5RWxlbWVudC5pbm5lclRleHQgPSBNYXRoLmZsb29yKHRoaXMubW9uZXkpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBjbGlja3NFbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuY2xpY2tzLnRvU3RyaW5nKCk7XG4gICAgICAgIH0sIDUwKVxuICAgIH1cbiAgICBcbiAgICBjbGljaygpIHtcbiAgICAgICAgdGhpcy5jbGlja3MgKz0gdGhpcy5tdWx0aXBsaWVyO1xuICAgIH1cbn1cblxuY2xhc3MgU3RvcmUge1xuICAgIHJlYWRvbmx5IGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xuICAgIGl0ZW1zOiBSZWNvcmQ8c3RyaW5nLCBTdG9yZUl0ZW0+O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50LCBpdGVtczogUmVjb3JkPHN0cmluZywgU3RvcmVJdGVtPikge1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XG4gICAgfVxufVxuXG5jbGFzcyBTdG9yZUl0ZW0gZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgICNwcmljZTogbnVtYmVyO1xuICAgIHJlYWRvbmx5IGdhbWU6IEdhbWU7XG4gICAgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xuICAgIHJlYWRvbmx5IGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBlbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICAgICAgZ2FtZTogR2FtZSxcbiAgICAgICAgbmFtZTogc3RyaW5nLFxuICAgICAgICBwcmljZTogbnVtYmVyXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuI3ByaWNlID0gcHJpY2U7XG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIFxuICAgICAgICAvKmlmKHR5cGVvZiBvbkJ1eSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoZ2FtZS5tb25leSA+PSB0aGlzLnByaWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGdhbWUubW9uZXkgLT0gdGhpcy5wcmljZTtcbiAgICAgICAgICAgICAgICAgICAgb25CdXkuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9Ki9cbiAgICAgICAgXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImNsaWNrXCIpO1xuICAgICAgICAgICAgaWYoZ2FtZS5tb25leSA+PSB0aGlzLnByaWNlKSB7XG4gICAgICAgICAgICAgICAgZ2FtZS5tb25leSAtPSB0aGlzLnByaWNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcImJ1eVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgZ2V0IHByaWNlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLiNwcmljZTtcbiAgICB9XG4gICAgc2V0IHByaWNlKGE6IG51bWJlcikge1xuICAgICAgICB0aGlzLiNwcmljZSA9IGE7XG4gICAgICAgIHRoaXMuZWxlbWVudC5pbm5lclRleHQgPSBgJHt0aGlzLm5hbWV9IFIkJHthfWA7XG4gICAgfVxuICAgIFxuICAgIG9uQnV5KGhhbmRsZXI6ICh0aGlzOiB0aGlzKSA9PiB2b2lkKTogdGhpcyB7XG4gICAgICAgIHRoaXMub24oXCJidXlcIiwgKCkgPT4ge1xuICAgICAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgb25DbGljayhoYW5kbGVyOiAodGhpczogdGhpcykgPT4gdm9pZCk6IHRoaXMge1xuICAgICAgICB0aGlzLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgYnV5KCkge1xuICAgICAgICBpZihnYW1lLm1vbmV5ID49IHRoaXMucHJpY2UpIHtcbiAgICAgICAgICAgIGdhbWUubW9uZXkgLT0gdGhpcy5wcmljZTtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImJ1eVwiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgQXV0b0NsaWNrZXIge1xuICAgIHRpY2s6IG51bWJlcjtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcih0aWNrOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy50aWNrID0gdGljaztcbiAgICB9XG59XG5cbmNvbnN0IHN0b3JlID0gbmV3IFN0b3JlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3RvcmVcIikgYXMgSFRNTERpdkVsZW1lbnQsIHt9KTtcblxuZXhwb3J0IGNvbnN0IGdhbWUgPSBuZXcgR2FtZShcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vbmV5XCIpIGFzIEhUTUxTcGFuRWxlbWVudCxcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NsaWNrXCIpIGFzIEhUTUxEaXZFbGVtZW50LFxuICAgIHN0b3JlXG4pO1xuXG5jb25zdCBERUZBVUxUX0lURU1fUFJJQ0VTOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge1xuICAgIFwiYXV0b0NsaWNrXCI6IDEwMCxcbiAgICBcIm11bHRpcGxpZXJcIjogMTAwMFxufVxuXG5zdG9yZS5pdGVtcyA9IHtcbiAgICBcInNlbGxcIjogbmV3IFN0b3JlSXRlbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGxfYnV0dG9uLnNlbGxcIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQsIGdhbWUsIFwiVmVuZGVyXCIsIDApXG4gICAgLm9uQ2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5tb25leSArPSB0aGlzLmdhbWUuY2xpY2tzO1xuICAgICAgICB0aGlzLmdhbWUuY2xpY2tzID0gMDtcbiAgICB9KSxcbiAgICBcbiAgICBcImF1dG9DbGlja1wiOiBuZXcgU3RvcmVJdGVtKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV5X2J1dHRvbi5hdXRvX2NsaWNrXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50LCBnYW1lLCBcIkF1dG8gQ2xpY2tlclwiLCBERUZBVUxUX0lURU1fUFJJQ0VTLmF1dG9DbGljayEpXG4gICAgLm9uQnV5KGZ1bmN0aW9uKHRpY2s/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5wcmljZSArPSAxMjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGF1dG9DbGlja2VyID0gbmV3IEF1dG9DbGlja2VyKHRpY2sgPyAodGljayAlIDIwIHx8IDIwKSA6ICh0aGlzLmdhbWUudGlja3MgJSAyMCB8fCAyMCkpO1xuICAgICAgICB0aGlzLmdhbWUuYXV0b0NsaWNrZXJzLnB1c2goYXV0b0NsaWNrZXIpO1xuICAgIH0pLFxuICAgIFxuICAgIFwiYXV0b0NsaWNrLmFsbFwiOiBuZXcgU3RvcmVJdGVtKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV5X2FsbF9idXR0b24uYXV0b19jbGlja1wiKSBhcyBIVE1MQnV0dG9uRWxlbWVudCwgZ2FtZSwgXCJDb21wcmFyIHRvZG9zXCIsIDApXG4gICAgLm9uQ2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCB0aWNrID0gdGhpcy5nYW1lLnRpY2tzO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgaXRlbSA9IGdhbWUuc3RvcmUuaXRlbXNbXCJhdXRvQ2xpY2tcIl0hO1xuICAgICAgICB3aGlsZSh0aGlzLmdhbWUubW9uZXkgPj0gaXRlbS5wcmljZSkge1xuICAgICAgICAgICAgaXRlbS5idXkoKTtcbiAgICAgICAgICAgIGNvbnN0IGF1dG9DbGlja2VyID0gdGhpcy5nYW1lLmF1dG9DbGlja2Vyc1t0aGlzLmdhbWUuYXV0b0NsaWNrZXJzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYoYXV0b0NsaWNrZXIpIGF1dG9DbGlja2VyLnRpY2sgPSAodGljaysrICUgMjAgfHwgMjApO1xuICAgICAgICB9XG4gICAgfSksXG4gICAgXG4gICAgXCJtdWx0aXBsaWVyXCI6IG5ldyBTdG9yZUl0ZW0oZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXlfYnV0dG9uLm11bHRpcGxpZXJcIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQsIGdhbWUsIFwiTXVsdGlwbGljYWRvclwiLCBERUZBVUxUX0lURU1fUFJJQ0VTLm11bHRpcGxpZXIhKVxuICAgIC5vbkJ1eShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcmljZSArPSBNYXRoLmZsb29yKHRoaXMucHJpY2UgKiAxLjIpO1xuICAgICAgICB0aGlzLmdhbWUubXVsdGlwbGllcisrO1xuICAgIH0pLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgZ2FtZS50aWNrcyA9IDA7XG4gICAgZ2FtZS5tb25leSA9IDA7XG4gICAgZ2FtZS5jbGlja3MgPSAwO1xuICAgIGdhbWUubXVsdGlwbGllciA9IDE7XG4gICAgZ2FtZS5hdXRvQ2xpY2tlcnMgPSBbXTtcbiAgICBcbiAgICBmb3IoY29uc3Qga2V5IGluIERFRkFVTFRfSVRFTV9QUklDRVMpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IGdhbWUuc3RvcmUuaXRlbXNba2V5XTtcbiAgICAgICAgaWYoIWl0ZW0pIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCBkZWZJdGVtUHJpY2UgPSBERUZBVUxUX0lURU1fUFJJQ0VTW2tleV07XG4gICAgICAgIGlmKGRlZkl0ZW1QcmljZSA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgICAgXG4gICAgICAgIGl0ZW0ucHJpY2UgPSBkZWZJdGVtUHJpY2U7XG4gICAgfVxufVxuXG5yZXNldEJ1dHRvbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBsZXQgcmVzID0gd2luZG93LmNvbmZpcm0oXCJEZXNlamEgcmVzZXRhciBvIGpvZ28/XCIpO1xuICAgIGlmKHJlcykgcmVzZXQoKTtcbn0pXG5cbnNldEludGVydmFsKCgpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRpY2tzXCIsIGdhbWUudGlja3MudG9TdHJpbmcoKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJtb25leVwiLCBnYW1lLm1vbmV5LiB0b1N0cmluZygpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImNsaWNrc1wiLCBnYW1lLmNsaWNrcy50b1N0cmluZygpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIm11bHRpcGxpZXJcIiwgZ2FtZS5tdWx0aXBsaWVyLnRvU3RyaW5nKCkpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiYXV0b19jbGlja2VyX3RpY2tzXCIsIEpTT04uc3RyaW5naWZ5KGdhbWUuYXV0b0NsaWNrZXJzLm1hcChhID0+IGEudGljaykpKTtcbiAgICBcbiAgICBmb3IoY29uc3Qga2V5IGluIGdhbWUuc3RvcmUuaXRlbXMpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IGdhbWUuc3RvcmUuaXRlbXNba2V5XSE7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBzdG9yZS4ke2tleX0ucHJpY2VgLCBpdGVtLnByaWNlLnRvU3RyaW5nKCkpO1xuICAgIH1cbn0sIDMwMClcblxuZ2FtZS50aWNrcyA9IE51bWJlcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRpY2tzXCIpKSB8fCBnYW1lLnRpY2tzO1xuZ2FtZS5tb25leSA9IE51bWJlcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIm1vbmV5XCIpKSB8fCBnYW1lLm1vbmV5O1xuZ2FtZS5jbGlja3MgPSBOdW1iZXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjbGlja3NcIikpIHx8IGdhbWUuY2xpY2tzO1xuZ2FtZS5tdWx0aXBsaWVyID0gTnVtYmVyKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibXVsdGlwbGllclwiKSkgfHwgZ2FtZS5tdWx0aXBsaWVyO1xuXG5sZXQgbG9jYWxBdXRvQ2xpY2tlclRpY2tzOiBudW1iZXJbXSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbnRyeSB7XG4gICAgbG9jYWxBdXRvQ2xpY2tlclRpY2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImF1dG9fY2xpY2tlcl90aWNrc1wiKSB8fCBcIltdXCIpO1xufSBjYXRjaCB7fVxuXG5pZihBcnJheS5pc0FycmF5KGxvY2FsQXV0b0NsaWNrZXJUaWNrcykpIHtcbiAgICBmb3IoY29uc3QgdGljayBvZiBsb2NhbEF1dG9DbGlja2VyVGlja3MpIHtcbiAgICAgICAgY29uc3QgYXV0b0NsaWNrZXIgPSBuZXcgQXV0b0NsaWNrZXIodGljayB8fCAxKTtcbiAgICAgICAgZ2FtZS5hdXRvQ2xpY2tlcnMucHVzaChhdXRvQ2xpY2tlcik7XG4gICAgfVxufVxuXG5mb3IoY29uc3Qga2V5IGluIGdhbWUuc3RvcmUuaXRlbXMpIHtcbiAgICBjb25zdCBpdGVtID0gZ2FtZS5zdG9yZS5pdGVtc1trZXldITtcbiAgICBcbiAgICBsZXQgcHJpY2UgPSBOdW1iZXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oYHN0b3JlLiR7a2V5fS5wcmljZWApKTtcbiAgICBpZihOdW1iZXIuaXNOYU4ocHJpY2UpKSBjb250aW51ZTtcbiAgICBcbiAgICBjb25zdCBkZWZJdGVtUHJpY2UgPSBERUZBVUxUX0lURU1fUFJJQ0VTW2tleV07XG4gICAgaWYoaXRlbS5wcmljZSAhPT0gcHJpY2UgJiYgcHJpY2UgPiAoZGVmSXRlbVByaWNlID8/IDApKSBpdGVtLnByaWNlID0gcHJpY2U7XG59XG5cbih3aW5kb3cgYXMgYW55KS5nYW1lID0gZ2FtZTsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUVBLFVBQUksTUFBTSxPQUFPLFVBQVU7QUFBM0IsVUFDSSxTQUFTO0FBU2IsZUFBUyxTQUFTO0FBQUEsTUFBQztBQVNuQixVQUFJLE9BQU8sUUFBUTtB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
