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
    id;
    moneyElement;
    clicksElement;
    store;
    ticks;
    money;
    clicks;
    multiplier;
    autoClickerTicks;
    _oldClicksElementTextLength;
    constructor(id, moneyElement, clicksElement, store2) {
      this.id = id;
      this.moneyElement = moneyElement;
      this.clicksElement = clicksElement;
      this.store = store2;
      this.ticks = 0;
      this.money = 0;
      this.clicks = 0;
      this.multiplier = 1;
      this.autoClickerTicks = {};
      this._oldClicksElementTextLength = 1;
      clicksElement.addEventListener("click", () => {
        this.click();
      });
      setInterval(() => {
        this.ticks++;
        let tickInSecond = this.ticks % 20 || 20;
        let clicksInTick = Number(this.autoClickerTicks[tickInSecond]) || 0;
        for (let i = 0; i < clicksInTick; i++) {
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
      setInterval(() => {
        this.save();
      }, 400);
    }
    click() {
      this.clicks += this.multiplier;
    }
    addAutoClicker(tick) {
      if (!this.autoClickerTicks[tick]) this.autoClickerTicks[tick] = 0;
      this.autoClickerTicks[tick]++;
    }
    reset() {
      this.ticks = 0;
      this.money = 0;
      this.clicks = 0;
      this.multiplier = 1;
      this.autoClickerTicks = {};
      for (const key in DEFAULT_ITEM_PRICES) {
        const item = this.store.items[key];
        if (!item) continue;
        const defItemPrice = DEFAULT_ITEM_PRICES[key];
        if (defItemPrice === void 0) continue;
        item.price = defItemPrice;
      }
    }
    save() {
      let data = {
        ticks: this.ticks,
        money: this.money,
        clicks: this.clicks,
        multiplier: this.multiplier,
        auto_clicker_ticks: {},
        store_item_prices: {}
      };
      for (let tick = 1; tick <= 20; tick++) {
        let clicksInTick = Number(this.autoClickerTicks[tick]) || 0;
        data.auto_clicker_ticks[tick] = clicksInTick.toString();
      }
      for (const key in this.store.items) {
        const item = this.store.items[key];
        data.store_item_prices[key] = item.price.toString();
      }
      localStorage.setItem(`game.click_game#${this.id}`, JSON.stringify(data));
    }
    loadSaveData(data) {
      if (typeof data !== "object" || Array.isArray(data)) throw TypeError("Argument 'data' must be of type GameSaveData.");
      this.ticks = Number(data.ticks) || this.ticks;
      this.money = Number(data.money) || this.money;
      this.clicks = Number(data.clicks) || this.clicks;
      this.multiplier = Number(data.multiplier) || this.multiplier;
      if (typeof data.auto_clicker_ticks === "object" && !Array.isArray(data.auto_clicker_ticks)) {
        for (let tick = 1; tick <= 20; tick++) {
          let clicksInTick = Number(data.auto_clicker_ticks[tick]);
          if (Number.isNaN(clicksInTick)) continue;
          this.autoClickerTicks[tick] = clicksInTick;
        }
      }
      if (typeof data.store_item_prices === "object" && !Array.isArray(data.store_item_prices)) {
        for (let [key, priceStr] of Object.entries(data.store_item_prices)) {
          const item = this.store.items[key];
          if (!item) continue;
          let price = Number(priceStr) || item.price;
          if (item.price !== price) item.price = price;
        }
      }
    }
    loadSave() {
      let rawData = localStorage.getItem(`game.click_game#${this.id}`);
      if (rawData == void 0) return;
      let data;
      try {
        data = JSON.parse(rawData);
      } catch {
      }
      if (data === void 0) console.error("The game save appears to be corrupted and could not be loaded.");
      if (Array.isArray(data)) return;
      this.loadSaveData(data);
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
  var store = new Store(document.querySelector("#store"), {});
  var game = new Game(
    "1",
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
      tick = tick ? tick % 20 || 20 : this.game.ticks % 20 || 20;
      this.price += 12;
      this.game.addAutoClicker(tick);
    }),
    "autoClick.all": new StoreItem(document.querySelector(".buy_all_button.auto_click"), game, "Comprar todos", 0).onClick(function() {
      let tick = this.game.ticks;
      const item = this.game.store.items["autoClick"];
      while (this.game.money >= item.price) {
        this.game.money -= item.price;
        item.price += 12;
        this.game.addAutoClicker(tick++ % 20 || 20);
      }
    }),
    "multiplier": new StoreItem(document.querySelector(".buy_button.multiplier"), game, "Multiplicador", DEFAULT_ITEM_PRICES.multiplier).onBuy(function() {
      this.price += Math.floor(this.price * 1.2);
      this.game.multiplier++;
    })
  };
  resetButtonElement.addEventListener("click", () => {
    let res = window.confirm("Deseja resetar o jogo?");
    if (res) game.reset();
  });
  function loadLegacySave() {
    game.ticks = Number(localStorage.getItem("ticks")) || game.ticks;
    game.money = Number(localStorage.getItem("money")) || game.money;
    game.clicks = Number(localStorage.getItem("clicks")) || game.clicks;
    game.multiplier = Number(localStorage.getItem("multiplier")) || game.multiplier;
    let localAutoClickerTicks = void 0;
    try {
      localAutoClickerTicks = JSON.parse(localStorage.getItem("auto_clicker_ticks") || "[]");
    } catch {
    }
    if (Array.isArray(localAutoClickerTicks)) {
      for (const tick of localAutoClickerTicks) {
        if (!game.autoClickerTicks[tick]) game.autoClickerTicks[tick] = 0;
        game.autoClickerTicks[tick]++;
      }
    }
    for (const key in game.store.items) {
      const item = game.store.items[key];
      let price = Number(localStorage.getItem(`store.${key}.price`));
      if (Number.isNaN(price)) continue;
      const defItemPrice = DEFAULT_ITEM_PRICES[key];
      if (item.price !== price && price > (defItemPrice ?? 0)) item.price = price;
    }
  }
  function deleteLegacySave() {
    localStorage.removeItem("ticks");
    localStorage.removeItem("money");
    localStorage.removeItem("clicks");
    localStorage.removeItem("multiplier");
    localStorage.removeItem("auto_clicker_ticks");
    for (const key in game.store.items) {
      const item = game.store.items[key];
      localStorage.removeItem(`store.${key}.price`);
    }
  }
  loadLegacySave();
  deleteLegacySave();
  game.loadSave();
  window.game = game;
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2V2ZW50ZW1pdHRlcjNANS4wLjQvbm9kZV9tb2R1bGVzL2V2ZW50ZW1pdHRlcjMvaW5kZXguanMiLCAiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2V2ZW50ZW1pdHRlcjNANS4wLjQvbm9kZV9tb2R1bGVzL2V2ZW50ZW1pdHRlcjMvaW5kZXgubWpzIiwgIi4uLy4uL3NjcmlwdHMvbWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuICAsIHByZWZpeCA9ICd+JztcblxuLyoqXG4gKiBDb25zdHJ1Y3RvciB0byBjcmVhdGUgYSBzdG9yYWdlIGZvciBvdXIgYEVFYCBvYmplY3RzLlxuICogQW4gYEV2ZW50c2AgaW5zdGFuY2UgaXMgYSBwbGFpbiBvYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhcmUgZXZlbnQgbmFtZXMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBFdmVudHMoKSB7fVxuXG4vL1xuLy8gV2UgdHJ5IHRvIG5vdCBpbmhlcml0IGZyb20gYE9iamVjdC5wcm90b3R5cGVgLiBJbiBzb21lIGVuZ2luZXMgY3JlYXRpbmcgYW5cbi8vIGluc3RhbmNlIGluIHRoaXMgd2F5IGlzIGZhc3RlciB0aGFuIGNhbGxpbmcgYE9iamVjdC5jcmVhdGUobnVsbClgIGRpcmVjdGx5LlxuLy8gSWYgYE9iamVjdC5jcmVhdGUobnVsbClgIGlzIG5vdCBzdXBwb3J0ZWQgd2UgcHJlZml4IHRoZSBldmVudCBuYW1lcyB3aXRoIGFcbi8vIGNoYXJhY3RlciB0byBtYWtlIHN1cmUgdGhhdCB0aGUgYnVpbHQtaW4gb2JqZWN0IHByb3BlcnRpZXMgYXJlIG5vdFxuLy8gb3ZlcnJpZGRlbiBvciB1c2VkIGFzIGFuIGF0dGFjayB2ZWN0b3IuXG4vL1xuaWYgKE9iamVjdC5jcmVhdGUpIHtcbiAgRXZlbnRzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgLy9cbiAgLy8gVGhpcyBoYWNrIGlzIG5lZWRlZCBiZWNhdXNlIHRoZSBgX19wcm90b19fYCBwcm9wZXJ0eSBpcyBzdGlsbCBpbmhlcml0ZWQgaW5cbiAgLy8gc29tZSBvbGQgYnJvd3NlcnMgbGlrZSBBbmRyb2lkIDQsIGlQaG9uZSA1LjEsIE9wZXJhIDExIGFuZCBTYWZhcmkgNS5cbiAgLy9cbiAgaWYgKCFuZXcgRXZlbnRzKCkuX19wcm90b19fKSBwcmVmaXggPSBmYWxzZTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRhdGlvbiBvZiBhIHNpbmdsZSBldmVudCBsaXN0ZW5lci5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHBhcmFtIHtCb29sZWFufSBbb25jZT1mYWxzZV0gU3BlY2lmeSBpZiB0aGUgbGlzdGVuZXIgaXMgYSBvbmUtdGltZSBsaXN0ZW5lci5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gRUUoZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdGhpcy5mbiA9IGZuO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLm9uY2UgPSBvbmNlIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIEFkZCBhIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBlbWl0dGVyIFJlZmVyZW5jZSB0byB0aGUgYEV2ZW50RW1pdHRlcmAgaW5zdGFuY2UuXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIFNwZWNpZnkgaWYgdGhlIGxpc3RlbmVyIGlzIGEgb25lLXRpbWUgbGlzdGVuZXIuXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYWRkTGlzdGVuZXIoZW1pdHRlciwgZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICB2YXIgbGlzdGVuZXIgPSBuZXcgRUUoZm4sIGNvbnRleHQgfHwgZW1pdHRlciwgb25jZSlcbiAgICAsIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCFlbWl0dGVyLl9ldmVudHNbZXZ0XSkgZW1pdHRlci5fZXZlbnRzW2V2dF0gPSBsaXN0ZW5lciwgZW1pdHRlci5fZXZlbnRzQ291bnQrKztcbiAgZWxzZSBpZiAoIWVtaXR0ZXIuX2V2ZW50c1tldnRdLmZuKSBlbWl0dGVyLl9ldmVudHNbZXZ0XS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZSBlbWl0dGVyLl9ldmVudHNbZXZ0XSA9IFtlbWl0dGVyLl9ldmVudHNbZXZ0XSwgbGlzdGVuZXJdO1xuXG4gIHJldHVybiBlbWl0dGVyO1xufVxuXG4vKipcbiAqIENsZWFyIGV2ZW50IGJ5IG5hbWUuXG4gKlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IGVtaXR0ZXIgUmVmZXJlbmNlIHRvIHRoZSBgRXZlbnRFbWl0dGVyYCBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldnQgVGhlIEV2ZW50IG5hbWUuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjbGVhckV2ZW50KGVtaXR0ZXIsIGV2dCkge1xuICBpZiAoLS1lbWl0dGVyLl9ldmVudHNDb3VudCA9PT0gMCkgZW1pdHRlci5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICBlbHNlIGRlbGV0ZSBlbWl0dGVyLl9ldmVudHNbZXZ0XTtcbn1cblxuLyoqXG4gKiBNaW5pbWFsIGBFdmVudEVtaXR0ZXJgIGludGVyZmFjZSB0aGF0IGlzIG1vbGRlZCBhZ2FpbnN0IHRoZSBOb2RlLmpzXG4gKiBgRXZlbnRFbWl0dGVyYCBpbnRlcmZhY2UuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG59XG5cbi8qKlxuICogUmV0dXJuIGFuIGFycmF5IGxpc3RpbmcgdGhlIGV2ZW50cyBmb3Igd2hpY2ggdGhlIGVtaXR0ZXIgaGFzIHJlZ2lzdGVyZWRcbiAqIGxpc3RlbmVycy5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHZhciBuYW1lcyA9IFtdXG4gICAgLCBldmVudHNcbiAgICAsIG5hbWU7XG5cbiAgaWYgKHRoaXMuX2V2ZW50c0NvdW50ID09PSAwKSByZXR1cm4gbmFtZXM7XG5cbiAgZm9yIChuYW1lIGluIChldmVudHMgPSB0aGlzLl9ldmVudHMpKSB7XG4gICAgaWYgKGhhcy5jYWxsKGV2ZW50cywgbmFtZSkpIG5hbWVzLnB1c2gocHJlZml4ID8gbmFtZS5zbGljZSgxKSA6IG5hbWUpO1xuICB9XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICByZXR1cm4gbmFtZXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZXZlbnRzKSk7XG4gIH1cblxuICByZXR1cm4gbmFtZXM7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge0FycmF5fSBUaGUgcmVnaXN0ZXJlZCBsaXN0ZW5lcnMuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKGV2ZW50KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50XG4gICAgLCBoYW5kbGVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmICghaGFuZGxlcnMpIHJldHVybiBbXTtcbiAgaWYgKGhhbmRsZXJzLmZuKSByZXR1cm4gW2hhbmRsZXJzLmZuXTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGhhbmRsZXJzLmxlbmd0aCwgZWUgPSBuZXcgQXJyYXkobCk7IGkgPCBsOyBpKyspIHtcbiAgICBlZVtpXSA9IGhhbmRsZXJzW2ldLmZuO1xuICB9XG5cbiAgcmV0dXJuIGVlO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIG51bWJlciBvZiBsaXN0ZW5lcnMgbGlzdGVuaW5nIHRvIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWJlciBvZiBsaXN0ZW5lcnMuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uIGxpc3RlbmVyQ291bnQoZXZlbnQpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnRcbiAgICAsIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmICghbGlzdGVuZXJzKSByZXR1cm4gMDtcbiAgaWYgKGxpc3RlbmVycy5mbikgcmV0dXJuIDE7XG4gIHJldHVybiBsaXN0ZW5lcnMubGVuZ3RoO1xufTtcblxuLyoqXG4gKiBDYWxscyBlYWNoIG9mIHRoZSBsaXN0ZW5lcnMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBldmVudCBoYWQgbGlzdGVuZXJzLCBlbHNlIGBmYWxzZWAuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZlbnQsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1tldnRdKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdXG4gICAgLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBhcmdzXG4gICAgLCBpO1xuXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAobGlzdGVuZXJzLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVycy5mbiwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICBjYXNlIDE6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCksIHRydWU7XG4gICAgICBjYXNlIDI6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEpLCB0cnVlO1xuICAgICAgY2FzZSAzOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiksIHRydWU7XG4gICAgICBjYXNlIDQ6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMyksIHRydWU7XG4gICAgICBjYXNlIDU6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQpLCB0cnVlO1xuICAgICAgY2FzZSA2OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMsIGE0LCBhNSksIHRydWU7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5mbi5hcHBseShsaXN0ZW5lcnMuY29udGV4dCwgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGhcbiAgICAgICwgajtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxpc3RlbmVyc1tpXS5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnNbaV0uZm4sIHVuZGVmaW5lZCwgdHJ1ZSk7XG5cbiAgICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICAgIGNhc2UgMTogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQpOyBicmVhaztcbiAgICAgICAgY2FzZSAyOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEpOyBicmVhaztcbiAgICAgICAgY2FzZSAzOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgNDogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExLCBhMiwgYTMpOyBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAoIWFyZ3MpIGZvciAoaiA9IDEsIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0xKTsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICBhcmdzW2ogLSAxXSA9IGFyZ3VtZW50c1tqXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaXN0ZW5lcnNbaV0uZm4uYXBwbHkobGlzdGVuZXJzW2ldLmNvbnRleHQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBBZGQgYSBsaXN0ZW5lciBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IFtjb250ZXh0PXRoaXNdIFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCBmYWxzZSk7XG59O1xuXG4vKipcbiAqIEFkZCBhIG9uZS10aW1lIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCB0cnVlKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBsaXN0ZW5lcnMgb2YgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgbWF0Y2ggdGhpcyBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgaGF2ZSB0aGlzIGNvbnRleHQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgT25seSByZW1vdmUgb25lLXRpbWUgbGlzdGVuZXJzLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiB0aGlzO1xuICBpZiAoIWZuKSB7XG4gICAgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAoXG4gICAgICBsaXN0ZW5lcnMuZm4gPT09IGZuICYmXG4gICAgICAoIW9uY2UgfHwgbGlzdGVuZXJzLm9uY2UpICYmXG4gICAgICAoIWNvbnRleHQgfHwgbGlzdGVuZXJzLmNvbnRleHQgPT09IGNvbnRleHQpXG4gICAgKSB7XG4gICAgICBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwLCBldmVudHMgPSBbXSwgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGxpc3RlbmVyc1tpXS5mbiAhPT0gZm4gfHxcbiAgICAgICAgKG9uY2UgJiYgIWxpc3RlbmVyc1tpXS5vbmNlKSB8fFxuICAgICAgICAoY29udGV4dCAmJiBsaXN0ZW5lcnNbaV0uY29udGV4dCAhPT0gY29udGV4dClcbiAgICAgICkge1xuICAgICAgICBldmVudHMucHVzaChsaXN0ZW5lcnNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vXG4gICAgLy8gUmVzZXQgdGhlIGFycmF5LCBvciByZW1vdmUgaXQgY29tcGxldGVseSBpZiB3ZSBoYXZlIG5vIG1vcmUgbGlzdGVuZXJzLlxuICAgIC8vXG4gICAgaWYgKGV2ZW50cy5sZW5ndGgpIHRoaXMuX2V2ZW50c1tldnRdID0gZXZlbnRzLmxlbmd0aCA9PT0gMSA/IGV2ZW50c1swXSA6IGV2ZW50cztcbiAgICBlbHNlIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYWxsIGxpc3RlbmVycywgb3IgdGhvc2Ugb2YgdGhlIHNwZWNpZmllZCBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gW2V2ZW50XSBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnQpIHtcbiAgdmFyIGV2dDtcblxuICBpZiAoZXZlbnQpIHtcbiAgICBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuICAgIGlmICh0aGlzLl9ldmVudHNbZXZ0XSkgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudHMoKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vXG4vLyBBbGlhcyBtZXRob2RzIG5hbWVzIGJlY2F1c2UgcGVvcGxlIHJvbGwgbGlrZSB0aGF0LlxuLy9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBwcmVmaXguXG4vL1xuRXZlbnRFbWl0dGVyLnByZWZpeGVkID0gcHJlZml4O1xuXG4vL1xuLy8gQWxsb3cgYEV2ZW50RW1pdHRlcmAgdG8gYmUgaW1wb3J0ZWQgYXMgbW9kdWxlIG5hbWVzcGFjZS5cbi8vXG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xuaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgbW9kdWxlKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xufVxuIiwgImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi9pbmRleC5qcydcblxuZXhwb3J0IHsgRXZlbnRFbWl0dGVyIH1cbmV4cG9ydCBkZWZhdWx0IEV2ZW50RW1pdHRlclxuIiwgIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50ZW1pdHRlcjNcIjtcbi8qaW1wb3J0IGVydWRhIGZyb20gXCJlcnVkYVwiO1xuZXJ1ZGEuaW5pdCgpOyovXG5cbmNvbnN0IHJlc2V0QnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVzZXRcIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG5cbmNsYXNzIEdhbWUge1xuICAgIHJlYWRvbmx5IGlkOiBzdHJpbmc7XG4gICAgcmVhZG9ubHkgbW9uZXlFbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgcmVhZG9ubHkgY2xpY2tzRWxlbWVudDogSFRNTERpdkVsZW1lbnQ7XG4gICAgcmVhZG9ubHkgc3RvcmU6IFN0b3JlO1xuICAgIFxuICAgIHRpY2tzOiBudW1iZXI7XG4gICAgXG4gICAgbW9uZXk6IG51bWJlcjtcbiAgICBjbGlja3M6IG51bWJlcjtcbiAgICBtdWx0aXBsaWVyOiBudW1iZXI7XG4gICAgYXV0b0NsaWNrZXJUaWNrczogUmVjb3JkPHN0cmluZywgbnVtYmVyPjtcbiAgICBfb2xkQ2xpY2tzRWxlbWVudFRleHRMZW5ndGg6IG51bWJlcjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgbW9uZXlFbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQsXG4gICAgICAgIGNsaWNrc0VsZW1lbnQ6IEhUTUxEaXZFbGVtZW50LFxuICAgICAgICBzdG9yZTogU3RvcmVcbiAgICApIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLm1vbmV5RWxlbWVudCA9IG1vbmV5RWxlbWVudDtcbiAgICAgICAgdGhpcy5jbGlja3NFbGVtZW50ID0gY2xpY2tzRWxlbWVudDtcbiAgICAgICAgdGhpcy5zdG9yZSA9IHN0b3JlO1xuICAgICAgICBcbiAgICAgICAgdGhpcy50aWNrcyA9IDA7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm1vbmV5ID0gMDtcbiAgICAgICAgdGhpcy5jbGlja3MgPSAwO1xuICAgICAgICB0aGlzLm11bHRpcGxpZXIgPSAxO1xuICAgICAgICB0aGlzLmF1dG9DbGlja2VyVGlja3MgPSB7fTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX29sZENsaWNrc0VsZW1lbnRUZXh0TGVuZ3RoID0gMTtcbiAgICAgICAgXG4gICAgICAgIGNsaWNrc0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2xpY2soKTtcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGlja3MrKztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IHRpY2tJblNlY29uZCA9IHRoaXMudGlja3MgJSAyMCB8fCAyMDtcbiAgICAgICAgICAgIGxldCBjbGlja3NJblRpY2sgPSBOdW1iZXIodGhpcy5hdXRvQ2xpY2tlclRpY2tzW3RpY2tJblNlY29uZF0pIHx8IDA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjbGlja3NJblRpY2s7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGNsaWNrc1N0ciA9IHRoaXMuY2xpY2tzLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZih0aGlzLl9vbGRDbGlja3NFbGVtZW50VGV4dExlbmd0aCAhPT0gY2xpY2tzU3RyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tzRWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IGAkezE2MCAtIGNsaWNrc1N0ci5sZW5ndGggKiAxMH1weGA7XG4gICAgICAgICAgICAgICAgdGhpcy5fb2xkQ2xpY2tzRWxlbWVudFRleHRMZW5ndGggPSBjbGlja3NTdHIubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBtb25leUVsZW1lbnQuaW5uZXJUZXh0ID0gTWF0aC5mbG9vcih0aGlzLm1vbmV5KS50b1N0cmluZygpO1xuICAgICAgICAgICAgY2xpY2tzRWxlbWVudC5pbm5lclRleHQgPSB0aGlzLmNsaWNrcy50b1N0cmluZygpO1xuICAgICAgICB9LCA1MClcbiAgICAgICAgXG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZSgpO1xuICAgICAgICB9LCA0MDApXG4gICAgfVxuICAgIFxuICAgIGNsaWNrKCkge1xuICAgICAgICB0aGlzLmNsaWNrcyArPSB0aGlzLm11bHRpcGxpZXI7XG4gICAgfVxuICAgIFxuICAgIGFkZEF1dG9DbGlja2VyKHRpY2s6IG51bWJlcikge1xuICAgICAgICBpZighdGhpcy5hdXRvQ2xpY2tlclRpY2tzW3RpY2tdKSB0aGlzLmF1dG9DbGlja2VyVGlja3NbdGlja10gPSAwO1xuICAgICAgICB0aGlzLmF1dG9DbGlja2VyVGlja3NbdGlja10rKztcbiAgICB9XG4gICAgXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMudGlja3MgPSAwO1xuICAgICAgICB0aGlzLm1vbmV5ID0gMDtcbiAgICAgICAgdGhpcy5jbGlja3MgPSAwO1xuICAgICAgICB0aGlzLm11bHRpcGxpZXIgPSAxO1xuICAgICAgICB0aGlzLmF1dG9DbGlja2VyVGlja3MgPSB7fTtcbiAgICAgICAgXG4gICAgICAgIGZvcihjb25zdCBrZXkgaW4gREVGQVVMVF9JVEVNX1BSSUNFUykge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuc3RvcmUuaXRlbXNba2V5XTtcbiAgICAgICAgICAgIGlmKCFpdGVtKSBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IGRlZkl0ZW1QcmljZSA9IERFRkFVTFRfSVRFTV9QUklDRVNba2V5XTtcbiAgICAgICAgICAgIGlmKGRlZkl0ZW1QcmljZSA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaXRlbS5wcmljZSA9IGRlZkl0ZW1QcmljZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBzYXZlKCkge1xuICAgICAgICBsZXQgZGF0YTogR2FtZVNhdmVEYXRhID0ge1xuICAgICAgICAgICAgdGlja3M6IHRoaXMudGlja3MsXG4gICAgICAgICAgICBtb25leTogdGhpcy5tb25leSxcbiAgICAgICAgICAgIGNsaWNrczogdGhpcy5jbGlja3MsXG4gICAgICAgICAgICBtdWx0aXBsaWVyOiB0aGlzLm11bHRpcGxpZXIsXG4gICAgICAgICAgICBhdXRvX2NsaWNrZXJfdGlja3M6IHt9LFxuICAgICAgICAgICAgc3RvcmVfaXRlbV9wcmljZXM6IHt9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZvcihsZXQgdGljayA9IDE7IHRpY2sgPD0gMjA7IHRpY2srKykge1xuICAgICAgICAgICAgbGV0IGNsaWNrc0luVGljayA9IE51bWJlcih0aGlzLmF1dG9DbGlja2VyVGlja3NbdGlja10pIHx8IDA7XG4gICAgICAgICAgICBkYXRhLmF1dG9fY2xpY2tlcl90aWNrcyFbdGlja10gPSBjbGlja3NJblRpY2sudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZm9yKGNvbnN0IGtleSBpbiB0aGlzLnN0b3JlLml0ZW1zKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5zdG9yZS5pdGVtc1trZXldITtcbiAgICAgICAgICAgIGRhdGEuc3RvcmVfaXRlbV9wcmljZXMhW2tleV0gPSBpdGVtLnByaWNlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBnYW1lLmNsaWNrX2dhbWUjJHt0aGlzLmlkfWAsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICB9XG4gICAgXG4gICAgbG9hZFNhdmVEYXRhKGRhdGE6IEdhbWVTYXZlRGF0YSkge1xuICAgICAgICBpZih0eXBlb2YgZGF0YSAhPT0gXCJvYmplY3RcIiB8fCBBcnJheS5pc0FycmF5KGRhdGEpKSB0aHJvdyBUeXBlRXJyb3IoXCJBcmd1bWVudCAnZGF0YScgbXVzdCBiZSBvZiB0eXBlIEdhbWVTYXZlRGF0YS5cIik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnRpY2tzID0gTnVtYmVyKGRhdGEudGlja3MpIHx8IHRoaXMudGlja3M7XG4gICAgICAgIHRoaXMubW9uZXkgPSBOdW1iZXIoZGF0YS5tb25leSkgfHwgdGhpcy5tb25leTtcbiAgICAgICAgdGhpcy5jbGlja3MgPSBOdW1iZXIoZGF0YS5jbGlja3MpIHx8IHRoaXMuY2xpY2tzO1xuICAgICAgICB0aGlzLm11bHRpcGxpZXIgPSBOdW1iZXIoZGF0YS5tdWx0aXBsaWVyKSB8fCB0aGlzLm11bHRpcGxpZXI7XG4gICAgICAgIFxuICAgICAgICBpZih0eXBlb2YgZGF0YS5hdXRvX2NsaWNrZXJfdGlja3MgPT09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkoZGF0YS5hdXRvX2NsaWNrZXJfdGlja3MpKSB7XG4gICAgICAgICAgICBmb3IobGV0IHRpY2sgPSAxOyB0aWNrIDw9IDIwOyB0aWNrKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY2xpY2tzSW5UaWNrID0gTnVtYmVyKGRhdGEuYXV0b19jbGlja2VyX3RpY2tzW3RpY2tdKTtcbiAgICAgICAgICAgICAgICBpZihOdW1iZXIuaXNOYU4oY2xpY2tzSW5UaWNrKSkgY29udGludWU7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvQ2xpY2tlclRpY2tzW3RpY2tdID0gY2xpY2tzSW5UaWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZih0eXBlb2YgZGF0YS5zdG9yZV9pdGVtX3ByaWNlcyA9PT0gXCJvYmplY3RcIiAmJiAhQXJyYXkuaXNBcnJheShkYXRhLnN0b3JlX2l0ZW1fcHJpY2VzKSkge1xuICAgICAgICAgICAgZm9yKGxldCBba2V5LCBwcmljZVN0cl0gb2YgT2JqZWN0LmVudHJpZXMoZGF0YS5zdG9yZV9pdGVtX3ByaWNlcykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5zdG9yZS5pdGVtc1trZXldO1xuICAgICAgICAgICAgICAgIGlmKCFpdGVtKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgcHJpY2UgPSBOdW1iZXIocHJpY2VTdHIpIHx8IGl0ZW0ucHJpY2U7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoaXRlbS5wcmljZSAhPT0gcHJpY2UpIGl0ZW0ucHJpY2UgPSBwcmljZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBsb2FkU2F2ZSgpIHtcbiAgICAgICAgbGV0IHJhd0RhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgZ2FtZS5jbGlja19nYW1lIyR7dGhpcy5pZH1gKTtcbiAgICAgICAgaWYocmF3RGF0YSA9PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGxldCBkYXRhO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UocmF3RGF0YSk7XG4gICAgICAgIH0gY2F0Y2gge31cbiAgICAgICAgXG4gICAgICAgIGlmKGRhdGEgPT09IHVuZGVmaW5lZCkgY29uc29sZS5lcnJvcihcIlRoZSBnYW1lIHNhdmUgYXBwZWFycyB0byBiZSBjb3JydXB0ZWQgYW5kIGNvdWxkIG5vdCBiZSBsb2FkZWQuXCIpO1xuICAgICAgICBpZihBcnJheS5pc0FycmF5KGRhdGEpKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxvYWRTYXZlRGF0YShkYXRhKTtcbiAgICB9XG59XG5cbmNsYXNzIFN0b3JlIHtcbiAgICByZWFkb25seSBlbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcbiAgICBpdGVtczogUmVjb3JkPHN0cmluZywgU3RvcmVJdGVtPjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRGl2RWxlbWVudCwgaXRlbXM6IFJlY29yZDxzdHJpbmcsIFN0b3JlSXRlbT4pIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xuICAgIH1cbn1cblxuY2xhc3MgU3RvcmVJdGVtIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICAjcHJpY2U6IG51bWJlcjtcbiAgICByZWFkb25seSBnYW1lOiBHYW1lO1xuICAgIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbiAgICByZWFkb25seSBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgICAgIGdhbWU6IEdhbWUsXG4gICAgICAgIG5hbWU6IHN0cmluZyxcbiAgICAgICAgcHJpY2U6IG51bWJlclxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLiNwcmljZSA9IHByaWNlO1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICBcbiAgICAgICAgLyppZih0eXBlb2Ygb25CdXkgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGdhbWUubW9uZXkgPj0gdGhpcy5wcmljZSkge1xuICAgICAgICAgICAgICAgICAgICBnYW1lLm1vbmV5IC09IHRoaXMucHJpY2U7XG4gICAgICAgICAgICAgICAgICAgIG9uQnV5LmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSovXG4gICAgICAgIFxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJjbGlja1wiKTtcbiAgICAgICAgICAgIGlmKGdhbWUubW9uZXkgPj0gdGhpcy5wcmljZSkge1xuICAgICAgICAgICAgICAgIGdhbWUubW9uZXkgLT0gdGhpcy5wcmljZTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJidXlcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgIFxuICAgIGdldCBwcmljZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy4jcHJpY2U7XG4gICAgfVxuICAgIHNldCBwcmljZShhOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy4jcHJpY2UgPSBhO1xuICAgICAgICB0aGlzLmVsZW1lbnQuaW5uZXJUZXh0ID0gYCR7dGhpcy5uYW1lfSBSJCR7YX1gO1xuICAgIH1cbiAgICBcbiAgICBvbkJ1eShoYW5kbGVyOiAodGhpczogdGhpcykgPT4gdm9pZCk6IHRoaXMge1xuICAgICAgICB0aGlzLm9uKFwiYnV5XCIsICgpID0+IHtcbiAgICAgICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIG9uQ2xpY2soaGFuZGxlcjogKHRoaXM6IHRoaXMpID0+IHZvaWQpOiB0aGlzIHtcbiAgICAgICAgdGhpcy5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIGJ1eSgpIHtcbiAgICAgICAgaWYoZ2FtZS5tb25leSA+PSB0aGlzLnByaWNlKSB7XG4gICAgICAgICAgICBnYW1lLm1vbmV5IC09IHRoaXMucHJpY2U7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJidXlcIik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIEF1dG9DbGlja2VyIHtcbiAgICB0aWNrOiBudW1iZXI7XG4gICAgXG4gICAgY29uc3RydWN0b3IodGljazogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMudGljayA9IHRpY2s7XG4gICAgfVxufVxuXG5pbnRlcmZhY2UgR2FtZVNhdmVEYXRhIHtcbiAgICB0aWNrcz86IG51bWJlcixcbiAgICBtb25leT86IG51bWJlcixcbiAgICBjbGlja3M/OiBudW1iZXIsXG4gICAgbXVsdGlwbGllcj86IG51bWJlcixcbiAgICBhdXRvX2NsaWNrZXJfdGlja3M/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+LFxuICAgIHN0b3JlX2l0ZW1fcHJpY2VzPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPlxufVxuXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0b3JlXCIpIGFzIEhUTUxEaXZFbGVtZW50LCB7fSk7XG5cbmV4cG9ydCBjb25zdCBnYW1lID0gbmV3IEdhbWUoXG4gICAgXCIxXCIsXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb25leVwiKSBhcyBIVE1MU3BhbkVsZW1lbnQsXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjbGlja1wiKSBhcyBIVE1MRGl2RWxlbWVudCxcbiAgICBzdG9yZVxuKTtcblxuY29uc3QgREVGQVVMVF9JVEVNX1BSSUNFUzogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHtcbiAgICBcImF1dG9DbGlja1wiOiAxMDAsXG4gICAgXCJtdWx0aXBsaWVyXCI6IDEwMDBcbn1cblxuc3RvcmUuaXRlbXMgPSB7XG4gICAgXCJzZWxsXCI6IG5ldyBTdG9yZUl0ZW0oZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxsX2J1dHRvbi5zZWxsXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50LCBnYW1lLCBcIlZlbmRlclwiLCAwKVxuICAgIC5vbkNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmdhbWUubW9uZXkgKz0gdGhpcy5nYW1lLmNsaWNrcztcbiAgICAgICAgdGhpcy5nYW1lLmNsaWNrcyA9IDA7XG4gICAgfSksXG4gICAgXG4gICAgXCJhdXRvQ2xpY2tcIjogbmV3IFN0b3JlSXRlbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1eV9idXR0b24uYXV0b19jbGlja1wiKSBhcyBIVE1MQnV0dG9uRWxlbWVudCwgZ2FtZSwgXCJBdXRvIENsaWNrZXJcIiwgREVGQVVMVF9JVEVNX1BSSUNFUy5hdXRvQ2xpY2shKVxuICAgIC5vbkJ1eShmdW5jdGlvbih0aWNrPzogbnVtYmVyKSB7XG4gICAgICAgIHRpY2sgPSB0aWNrID8gKHRpY2sgJSAyMCB8fCAyMCkgOiAodGhpcy5nYW1lLnRpY2tzICUgMjAgfHwgMjApO1xuICAgICAgICB0aGlzLnByaWNlICs9IDEyO1xuICAgICAgICB0aGlzLmdhbWUuYWRkQXV0b0NsaWNrZXIodGljayk7XG4gICAgfSksXG4gICAgXG4gICAgXCJhdXRvQ2xpY2suYWxsXCI6IG5ldyBTdG9yZUl0ZW0oZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXlfYWxsX2J1dHRvbi5hdXRvX2NsaWNrXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50LCBnYW1lLCBcIkNvbXByYXIgdG9kb3NcIiwgMClcbiAgICAub25DbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHRpY2sgPSB0aGlzLmdhbWUudGlja3M7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5nYW1lLnN0b3JlLml0ZW1zW1wiYXV0b0NsaWNrXCJdITtcbiAgICAgICAgd2hpbGUodGhpcy5nYW1lLm1vbmV5ID49IGl0ZW0ucHJpY2UpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5tb25leSAtPSBpdGVtLnByaWNlO1xuICAgICAgICAgICAgaXRlbS5wcmljZSArPSAxMjtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGRBdXRvQ2xpY2tlcih0aWNrKysgJSAyMCB8fCAyMCk7XG4gICAgICAgIH1cbiAgICB9KSxcbiAgICBcbiAgICBcIm11bHRpcGxpZXJcIjogbmV3IFN0b3JlSXRlbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1eV9idXR0b24ubXVsdGlwbGllclwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudCwgZ2FtZSwgXCJNdWx0aXBsaWNhZG9yXCIsIERFRkFVTFRfSVRFTV9QUklDRVMubXVsdGlwbGllciEpXG4gICAgLm9uQnV5KGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnByaWNlICs9IE1hdGguZmxvb3IodGhpcy5wcmljZSAqIDEuMik7XG4gICAgICAgIHRoaXMuZ2FtZS5tdWx0aXBsaWVyKys7XG4gICAgfSksXG59XG5cbnJlc2V0QnV0dG9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGxldCByZXMgPSB3aW5kb3cuY29uZmlybShcIkRlc2VqYSByZXNldGFyIG8gam9nbz9cIik7XG4gICAgaWYocmVzKSBnYW1lLnJlc2V0KCk7XG59KVxuXG5mdW5jdGlvbiBsb2FkTGVnYWN5U2F2ZSgpIHtcbiAgICBnYW1lLnRpY2tzID0gTnVtYmVyKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGlja3NcIikpIHx8IGdhbWUudGlja3M7XG4gICAgZ2FtZS5tb25leSA9IE51bWJlcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIm1vbmV5XCIpKSB8fCBnYW1lLm1vbmV5O1xuICAgIGdhbWUuY2xpY2tzID0gTnVtYmVyKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY2xpY2tzXCIpKSB8fCBnYW1lLmNsaWNrcztcbiAgICBnYW1lLm11bHRpcGxpZXIgPSBOdW1iZXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJtdWx0aXBsaWVyXCIpKSB8fCBnYW1lLm11bHRpcGxpZXI7XG4gICAgXG4gICAgbGV0IGxvY2FsQXV0b0NsaWNrZXJUaWNrczogbnVtYmVyW10gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgdHJ5IHtcbiAgICAgICAgbG9jYWxBdXRvQ2xpY2tlclRpY2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImF1dG9fY2xpY2tlcl90aWNrc1wiKSB8fCBcIltdXCIpO1xuICAgIH0gY2F0Y2gge31cbiAgICBcbiAgICBpZihBcnJheS5pc0FycmF5KGxvY2FsQXV0b0NsaWNrZXJUaWNrcykpIHtcbiAgICAgICAgZm9yKGNvbnN0IHRpY2sgb2YgbG9jYWxBdXRvQ2xpY2tlclRpY2tzKSB7XG4gICAgICAgICAgICAvKmNvbnN0IGF1dG9DbGlja2VyID0gbmV3IEF1dG9DbGlja2VyKHRpY2sgfHwgMSk7XG4gICAgICAgICAgICBnYW1lLmF1dG9DbGlja2Vycy5wdXNoKGF1dG9DbGlja2VyKTsqL1xuICAgICAgICAgICAgaWYoIWdhbWUuYXV0b0NsaWNrZXJUaWNrc1t0aWNrXSkgZ2FtZS5hdXRvQ2xpY2tlclRpY2tzW3RpY2tdID0gMDtcbiAgICAgICAgICAgIGdhbWUuYXV0b0NsaWNrZXJUaWNrc1t0aWNrXSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZvcihjb25zdCBrZXkgaW4gZ2FtZS5zdG9yZS5pdGVtcykge1xuICAgICAgICBjb25zdCBpdGVtID0gZ2FtZS5zdG9yZS5pdGVtc1trZXldITtcbiAgICAgICAgXG4gICAgICAgIGxldCBwcmljZSA9IE51bWJlcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgc3RvcmUuJHtrZXl9LnByaWNlYCkpO1xuICAgICAgICBpZihOdW1iZXIuaXNOYU4ocHJpY2UpKSBjb250aW51ZTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGRlZkl0ZW1QcmljZSA9IERFRkFVTFRfSVRFTV9QUklDRVNba2V5XTtcbiAgICAgICAgaWYoaXRlbS5wcmljZSAhPT0gcHJpY2UgJiYgcHJpY2UgPiAoZGVmSXRlbVByaWNlID8/IDApKSBpdGVtLnByaWNlID0gcHJpY2U7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZWxldGVMZWdhY3lTYXZlKCkge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwidGlja3NcIik7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJtb25leVwiKTtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImNsaWNrc1wiKTtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcIm11bHRpcGxpZXJcIik7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJhdXRvX2NsaWNrZXJfdGlja3NcIik7XG4gICAgXG4gICAgZm9yKGNvbnN0IGtleSBpbiBnYW1lLnN0b3JlLml0ZW1zKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBnYW1lLnN0b3JlLml0ZW1zW2tleV0hO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgc3RvcmUuJHtrZXl9LnByaWNlYCk7XG4gICAgfVxufVxuXG5sb2FkTGVnYWN5U2F2ZSgpO1xuZGVsZXRlTGVnYWN5U2F2ZSgpO1xuZ2FtZS5sb2FkU2F2ZSgpO1xuXG4od2luZG93IGFzIGFueSkuZ2FtZSA9IGdhbWU7Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFFQSxVQUFJLE1BQU0sT0FBTyxVQUFVO0FBQTNCLFVBQ0ksU0FBUztBQVNiLGVBQVMsU0FBUztBQUFBLE1BQUM7QUFTbkIsVUFBSSxPQUFPLFFBQVE7QUFDakIsZUFBTyxZQUFZLHVCQUFPLE9BQU8sSUFBSTtBQU1yQyxZQUFJLENBQUMsSUFBSSxPQUFPLEVBQUUsVUFBVyxVQUFTO0FBQUEsTUFDeEM7QUFXQSxlQUFTLEdBQUcsSUFBSSxTQUFTLE1BQU07QUFDN0IsYUFBSyxLQUFLO0FBQ1YsYUFBSyxVQUFVO0FBQ2YsYUFBSyxPQUFPLFFBQVE7QUFBQSxNQUN0QjtBQWFBLGVBQVMsWUFBWSxTQUFTLE9BQU8sSUFBSSxTQUFTLE1BQU07QUFDdEQsWUFBSSxPQUFPLE9BQU8sWUFBWTtBQUM1QixnQkFBTSxJQUFJLFVBQVUsaUNBQWlDO0FBQUEsUUFDdkQ7QUFFQSxZQUFJLFdBQVcsSUFBSSxHQUFHLElBQUksV0FBVyxTQUFTLElBQUks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O0FBRUEscUJBQW1CLGlCQUFpQixTQUFTLE1BQU07QUFDL0MsUUFBSSxNQUFNLE9BQU8sUUFBUSx3QkFBd0I7QUFDakQsUUFBRyxJQUFLLE1BQUssTUFBTTtBQUFBLEVBQ3ZCLENBQUM7QUFFRCxXQUFTLGlCQUFpQjtBQUN0QixTQUFLLFFBQVEsT0FBTyxhQUFhLFFBQVEsT0FBTyxDQUFDLEtBQUssS0FBSztBQUMzRCxTQUFLLFFBQVEsT0FBTyxhQUFhLFFBQVEsT0FBTyxDQUFDLEtBQUssS0FBSztBQUMzRCxTQUFLLFNBQVMsT0FBTyxhQUFhLFFBQVEsUUFBUSxDQUFDLEtBQUssS0FBSztBQUM3RCxTQUFLLGFBQWEsT0FBTyxhQUFhLFFBQVEsWUFBWSxDQUFDLEtBQUssS0FBSztBQUVyRSxRQUFJLHdCQUE4QztBQUNsRCxRQUFJO0FBQ0EsOEJBQXdCLEtBQUssTUFBTSxhQUFhLFFBQVEsb0JBQW9CLEtBQUssSUFBSTtBQUFBLElBQ3pGLFFBQVE7QUFBQSxJQUFDO0FBRVQsUUFBRyxNQUFNLFFBQVEscUJBQXFCLEdBQUc7QUFDckMsaUJBQVUsUUFBUSx1QkFBdUI7QUFHckMsWUFBRyxDQUFDLEtBQUssaUJBQWlCLElBQUksRUFBRyxNQUFLLGlCQUFpQixJQUFJLElBQUk7QUFDL0QsYUFBSyxpQkFBaUIsSUFBSTtBQUFBLE1BQzlCO0FBQUEsSUFDSjtBQUVBLGVBQVUsT0FBTyxLQUFLLE1BQU0sT0FBTztBQUMvQixZQUFNLE9BQU8sS0FBSyxNQUFNLE1BQU0sR0FBRztBQUVqQyxVQUFJLFFBQVEsT0FBTyxhQUFhLFFBQVEsU0FBUyxHQUFHLFFBQVEsQ0FBQztBQUM3RCxVQUFHLE9BQU8sTUFBTSxLQUFLLEVBQUc7QUFFeEIsWUFBTSxlQUFlLG9CQUFvQixHQUFHO0FBQzVDLFVBQUcsS0FBSyxVQUFVLFNBQVMsU0FBUyxnQkFBZ0IsR0FBSSxNQUFLLFFBQVE7QUFBQSxJQUN6RTtBQUFBLEVBQ0o7QUFFQSxXQUFTLG1CQUFtQjtBQUN4QixpQkFBYSxXQUFXLE9BQU87QUFDL0IsaUJBQWEsV0FBVyxPQUFPO0FBQy9CLGlCQUFhLFdBQVcsUUFBUTtBQUNoQyxpQkFBYSxXQUFXLFlBQVk7QUFDcEMsaUJBQWEsV0FBVyxvQkFBb0I7QUFFNUMsZUFBVSxPQUFPLEtBQUssTUFBTSxPQUFPO0FBQy9CLFlBQU0sT0FBTyxLQUFLLE1BQU0sTUFBTSxHQUFHO0FBQ2pDLG1CQUFhLFdBQVcsU0FBUyxHQUFHLFFBQVE7QUFBQSxJQUNoRDtBQUFBLEVBQ0o7QUFFQSxpQkFBZTtBQUNmLG1CQUFpQjtBQUNqQixPQUFLLFNBQVM7QUFFZCxFQUFDLE9BQWUsT0FBTzsiLAogICJuYW1lcyI6IFsiRXZlbnRFbWl0dGVyIiwgInN0b3JlIiwgIkV2ZW50RW1pdHRlciIsICJnYW1lIl0KfQo=
