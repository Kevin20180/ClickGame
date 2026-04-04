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

  // ../node_modules/.pnpm/eventemitter3@5.0.4/node_modules/eventemitter3/index.js
  var require_eventemitter3 = __commonJS({
    "../node_modules/.pnpm/eventemitter3@5.0.4/node_modules/eventemitter3/index.js"(exports, module) {
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
      function EventEmitter3() {
        this._events = new Events();
        this._eventsCount = 0;
      }
      EventEmitter3.prototype.eventNames = function eventNames() {
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
      EventEmitter3.prototype.listeners = function listeners(event) {
        var evt = prefix ? prefix + event : event, handlers = this._events[evt];
        if (!handlers) return [];
        if (handlers.fn) return [handlers.fn];
        for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
          ee[i] = handlers[i].fn;
        }
        return ee;
      };
      EventEmitter3.prototype.listenerCount = function listenerCount(event) {
        var evt = prefix ? prefix + event : event, listeners = this._events[evt];
        if (!listeners) return 0;
        if (listeners.fn) return 1;
        return listeners.length;
      };
      EventEmitter3.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
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
      EventEmitter3.prototype.on = function on(event, fn, context) {
        return addListener(this, event, fn, context, false);
      };
      EventEmitter3.prototype.once = function once(event, fn, context) {
        return addListener(this, event, fn, context, true);
      };
      EventEmitter3.prototype.removeListener = function removeListener(event, fn, context, once) {
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
      EventEmitter3.prototype.removeAllListeners = function removeAllListeners(event) {
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
      EventEmitter3.prototype.off = EventEmitter3.prototype.removeListener;
      EventEmitter3.prototype.addListener = EventEmitter3.prototype.on;
      EventEmitter3.prefixed = prefix;
      EventEmitter3.EventEmitter = EventEmitter3;
      if ("undefined" !== typeof module) {
        module.exports = EventEmitter3;
      }
    }
  });

  // ../node_modules/.pnpm/eventemitter3@5.0.4/node_modules/eventemitter3/index.mjs
  var import_index = __toESM(require_eventemitter3(), 1);

  // scripts/store.ts
  var Store = class {
    element;
    items;
    DEFAULT_ITEM_PRICES;
    constructor(element, items, DEFAULT_ITEM_PRICES) {
      this.element = element;
      this.items = items;
      this.DEFAULT_ITEM_PRICES = DEFAULT_ITEM_PRICES;
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
      if (this.game.money >= this.price) {
        this.game.money -= this.price;
        this.emit("buy");
      }
    }
  };

  // scripts/game.ts
  var Game2 = class {
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
      for (const key in this.store.DEFAULT_ITEM_PRICES) {
        const item = this.store.items[key];
        if (!item) continue;
        const defItemPrice = this.store.DEFAULT_ITEM_PRICES[key];
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

  // scripts/main.ts
  var resetButtonElement = document.querySelector("#reset");
  var store = new Store(document.querySelector("#store"), {}, {
    "autoClick": 100,
    "multiplier": 1e3
  });
  var game = new Game2(
    "1",
    document.querySelector("#money"),
    document.querySelector("#click"),
    store
  );
  store.items = {
    "sell": new StoreItem(
      document.querySelector(".sell_button.sell"),
      game,
      "Vender",
      0
    ).onClick(function() {
      this.game.money += this.game.clicks;
      this.game.clicks = 0;
    }),
    "autoClick": new StoreItem(
      document.querySelector(".buy_button.auto_click"),
      game,
      "Auto Clicker",
      store.DEFAULT_ITEM_PRICES.autoClick
    ).onBuy(function(tick) {
      tick = tick ? tick % 20 || 20 : this.game.ticks % 20 || 20;
      this.price += 12;
      this.game.addAutoClicker(tick);
    }),
    "autoClick.all": new StoreItem(
      document.querySelector(".buy_all_button.auto_click"),
      game,
      "Comprar todos",
      0
    ).onClick(function() {
      let tick = this.game.ticks;
      const item = this.game.store.items["autoClick"];
      while (this.game.money >= item.price) {
        this.game.money -= item.price;
        item.price += 12;
        this.game.addAutoClicker(tick++ % 20 || 20);
      }
    }),
    "multiplier": new StoreItem(
      document.querySelector(".buy_button.multiplier"),
      game,
      "Multiplicador",
      store.DEFAULT_ITEM_PRICES.multiplier
    ).onBuy(function() {
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
      const defItemPrice = store.DEFAULT_ITEM_PRICES[key];
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2V2ZW50ZW1pdHRlcjNANS4wLjQvbm9kZV9tb2R1bGVzL2V2ZW50ZW1pdHRlcjMvaW5kZXguanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2V2ZW50ZW1pdHRlcjNANS4wLjQvbm9kZV9tb2R1bGVzL2V2ZW50ZW1pdHRlcjMvaW5kZXgubWpzIiwgIi4uLy4uL3NjcmlwdHMvc3RvcmUudHMiLCAiLi4vLi4vc2NyaXB0cy9nYW1lLnRzIiwgIi4uLy4uL3NjcmlwdHMvbWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuICAsIHByZWZpeCA9ICd+JztcblxuLyoqXG4gKiBDb25zdHJ1Y3RvciB0byBjcmVhdGUgYSBzdG9yYWdlIGZvciBvdXIgYEVFYCBvYmplY3RzLlxuICogQW4gYEV2ZW50c2AgaW5zdGFuY2UgaXMgYSBwbGFpbiBvYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhcmUgZXZlbnQgbmFtZXMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBFdmVudHMoKSB7fVxuXG4vL1xuLy8gV2UgdHJ5IHRvIG5vdCBpbmhlcml0IGZyb20gYE9iamVjdC5wcm90b3R5cGVgLiBJbiBzb21lIGVuZ2luZXMgY3JlYXRpbmcgYW5cbi8vIGluc3RhbmNlIGluIHRoaXMgd2F5IGlzIGZhc3RlciB0aGFuIGNhbGxpbmcgYE9iamVjdC5jcmVhdGUobnVsbClgIGRpcmVjdGx5LlxuLy8gSWYgYE9iamVjdC5jcmVhdGUobnVsbClgIGlzIG5vdCBzdXBwb3J0ZWQgd2UgcHJlZml4IHRoZSBldmVudCBuYW1lcyB3aXRoIGFcbi8vIGNoYXJhY3RlciB0byBtYWtlIHN1cmUgdGhhdCB0aGUgYnVpbHQtaW4gb2JqZWN0IHByb3BlcnRpZXMgYXJlIG5vdFxuLy8gb3ZlcnJpZGRlbiBvciB1c2VkIGFzIGFuIGF0dGFjayB2ZWN0b3IuXG4vL1xuaWYgKE9iamVjdC5jcmVhdGUpIHtcbiAgRXZlbnRzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgLy9cbiAgLy8gVGhpcyBoYWNrIGlzIG5lZWRlZCBiZWNhdXNlIHRoZSBgX19wcm90b19fYCBwcm9wZXJ0eSBpcyBzdGlsbCBpbmhlcml0ZWQgaW5cbiAgLy8gc29tZSBvbGQgYnJvd3NlcnMgbGlrZSBBbmRyb2lkIDQsIGlQaG9uZSA1LjEsIE9wZXJhIDExIGFuZCBTYWZhcmkgNS5cbiAgLy9cbiAgaWYgKCFuZXcgRXZlbnRzKCkuX19wcm90b19fKSBwcmVmaXggPSBmYWxzZTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRhdGlvbiBvZiBhIHNpbmdsZSBldmVudCBsaXN0ZW5lci5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHBhcmFtIHtCb29sZWFufSBbb25jZT1mYWxzZV0gU3BlY2lmeSBpZiB0aGUgbGlzdGVuZXIgaXMgYSBvbmUtdGltZSBsaXN0ZW5lci5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gRUUoZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdGhpcy5mbiA9IGZuO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLm9uY2UgPSBvbmNlIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIEFkZCBhIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBlbWl0dGVyIFJlZmVyZW5jZSB0byB0aGUgYEV2ZW50RW1pdHRlcmAgaW5zdGFuY2UuXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIFNwZWNpZnkgaWYgdGhlIGxpc3RlbmVyIGlzIGEgb25lLXRpbWUgbGlzdGVuZXIuXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYWRkTGlzdGVuZXIoZW1pdHRlciwgZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICB2YXIgbGlzdGVuZXIgPSBuZXcgRUUoZm4sIGNvbnRleHQgfHwgZW1pdHRlciwgb25jZSlcbiAgICAsIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCFlbWl0dGVyLl9ldmVudHNbZXZ0XSkgZW1pdHRlci5fZXZlbnRzW2V2dF0gPSBsaXN0ZW5lciwgZW1pdHRlci5fZXZlbnRzQ291bnQrKztcbiAgZWxzZSBpZiAoIWVtaXR0ZXIuX2V2ZW50c1tldnRdLmZuKSBlbWl0dGVyLl9ldmVudHNbZXZ0XS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZSBlbWl0dGVyLl9ldmVudHNbZXZ0XSA9IFtlbWl0dGVyLl9ldmVudHNbZXZ0XSwgbGlzdGVuZXJdO1xuXG4gIHJldHVybiBlbWl0dGVyO1xufVxuXG4vKipcbiAqIENsZWFyIGV2ZW50IGJ5IG5hbWUuXG4gKlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IGVtaXR0ZXIgUmVmZXJlbmNlIHRvIHRoZSBgRXZlbnRFbWl0dGVyYCBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldnQgVGhlIEV2ZW50IG5hbWUuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjbGVhckV2ZW50KGVtaXR0ZXIsIGV2dCkge1xuICBpZiAoLS1lbWl0dGVyLl9ldmVudHNDb3VudCA9PT0gMCkgZW1pdHRlci5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICBlbHNlIGRlbGV0ZSBlbWl0dGVyLl9ldmVudHNbZXZ0XTtcbn1cblxuLyoqXG4gKiBNaW5pbWFsIGBFdmVudEVtaXR0ZXJgIGludGVyZmFjZSB0aGF0IGlzIG1vbGRlZCBhZ2FpbnN0IHRoZSBOb2RlLmpzXG4gKiBgRXZlbnRFbWl0dGVyYCBpbnRlcmZhY2UuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG59XG5cbi8qKlxuICogUmV0dXJuIGFuIGFycmF5IGxpc3RpbmcgdGhlIGV2ZW50cyBmb3Igd2hpY2ggdGhlIGVtaXR0ZXIgaGFzIHJlZ2lzdGVyZWRcbiAqIGxpc3RlbmVycy5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHZhciBuYW1lcyA9IFtdXG4gICAgLCBldmVudHNcbiAgICAsIG5hbWU7XG5cbiAgaWYgKHRoaXMuX2V2ZW50c0NvdW50ID09PSAwKSByZXR1cm4gbmFtZXM7XG5cbiAgZm9yIChuYW1lIGluIChldmVudHMgPSB0aGlzLl9ldmVudHMpKSB7XG4gICAgaWYgKGhhcy5jYWxsKGV2ZW50cywgbmFtZSkpIG5hbWVzLnB1c2gocHJlZml4ID8gbmFtZS5zbGljZSgxKSA6IG5hbWUpO1xuICB9XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICByZXR1cm4gbmFtZXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZXZlbnRzKSk7XG4gIH1cblxuICByZXR1cm4gbmFtZXM7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge0FycmF5fSBUaGUgcmVnaXN0ZXJlZCBsaXN0ZW5lcnMuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKGV2ZW50KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50XG4gICAgLCBoYW5kbGVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmICghaGFuZGxlcnMpIHJldHVybiBbXTtcbiAgaWYgKGhhbmRsZXJzLmZuKSByZXR1cm4gW2hhbmRsZXJzLmZuXTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGhhbmRsZXJzLmxlbmd0aCwgZWUgPSBuZXcgQXJyYXkobCk7IGkgPCBsOyBpKyspIHtcbiAgICBlZVtpXSA9IGhhbmRsZXJzW2ldLmZuO1xuICB9XG5cbiAgcmV0dXJuIGVlO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIG51bWJlciBvZiBsaXN0ZW5lcnMgbGlzdGVuaW5nIHRvIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWJlciBvZiBsaXN0ZW5lcnMuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uIGxpc3RlbmVyQ291bnQoZXZlbnQpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnRcbiAgICAsIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmICghbGlzdGVuZXJzKSByZXR1cm4gMDtcbiAgaWYgKGxpc3RlbmVycy5mbikgcmV0dXJuIDE7XG4gIHJldHVybiBsaXN0ZW5lcnMubGVuZ3RoO1xufTtcblxuLyoqXG4gKiBDYWxscyBlYWNoIG9mIHRoZSBsaXN0ZW5lcnMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBldmVudCBoYWQgbGlzdGVuZXJzLCBlbHNlIGBmYWxzZWAuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZlbnQsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1tldnRdKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdXG4gICAgLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBhcmdzXG4gICAgLCBpO1xuXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAobGlzdGVuZXJzLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVycy5mbiwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICBjYXNlIDE6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCksIHRydWU7XG4gICAgICBjYXNlIDI6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEpLCB0cnVlO1xuICAgICAgY2FzZSAzOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiksIHRydWU7XG4gICAgICBjYXNlIDQ6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMyksIHRydWU7XG4gICAgICBjYXNlIDU6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQpLCB0cnVlO1xuICAgICAgY2FzZSA2OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMsIGE0LCBhNSksIHRydWU7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5mbi5hcHBseShsaXN0ZW5lcnMuY29udGV4dCwgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGhcbiAgICAgICwgajtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxpc3RlbmVyc1tpXS5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnNbaV0uZm4sIHVuZGVmaW5lZCwgdHJ1ZSk7XG5cbiAgICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICAgIGNhc2UgMTogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQpOyBicmVhaztcbiAgICAgICAgY2FzZSAyOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEpOyBicmVhaztcbiAgICAgICAgY2FzZSAzOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgNDogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExLCBhMiwgYTMpOyBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAoIWFyZ3MpIGZvciAoaiA9IDEsIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0xKTsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICBhcmdzW2ogLSAxXSA9IGFyZ3VtZW50c1tqXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaXN0ZW5lcnNbaV0uZm4uYXBwbHkobGlzdGVuZXJzW2ldLmNvbnRleHQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBBZGQgYSBsaXN0ZW5lciBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IFtjb250ZXh0PXRoaXNdIFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCBmYWxzZSk7XG59O1xuXG4vKipcbiAqIEFkZCBhIG9uZS10aW1lIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCB0cnVlKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBsaXN0ZW5lcnMgb2YgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgbWF0Y2ggdGhpcyBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgaGF2ZSB0aGlzIGNvbnRleHQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgT25seSByZW1vdmUgb25lLXRpbWUgbGlzdGVuZXJzLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiB0aGlzO1xuICBpZiAoIWZuKSB7XG4gICAgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAoXG4gICAgICBsaXN0ZW5lcnMuZm4gPT09IGZuICYmXG4gICAgICAoIW9uY2UgfHwgbGlzdGVuZXJzLm9uY2UpICYmXG4gICAgICAoIWNvbnRleHQgfHwgbGlzdGVuZXJzLmNvbnRleHQgPT09IGNvbnRleHQpXG4gICAgKSB7XG4gICAgICBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwLCBldmVudHMgPSBbXSwgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGxpc3RlbmVyc1tpXS5mbiAhPT0gZm4gfHxcbiAgICAgICAgKG9uY2UgJiYgIWxpc3RlbmVyc1tpXS5vbmNlKSB8fFxuICAgICAgICAoY29udGV4dCAmJiBsaXN0ZW5lcnNbaV0uY29udGV4dCAhPT0gY29udGV4dClcbiAgICAgICkge1xuICAgICAgICBldmVudHMucHVzaChsaXN0ZW5lcnNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vXG4gICAgLy8gUmVzZXQgdGhlIGFycmF5LCBvciByZW1vdmUgaXQgY29tcGxldGVseSBpZiB3ZSBoYXZlIG5vIG1vcmUgbGlzdGVuZXJzLlxuICAgIC8vXG4gICAgaWYgKGV2ZW50cy5sZW5ndGgpIHRoaXMuX2V2ZW50c1tldnRdID0gZXZlbnRzLmxlbmd0aCA9PT0gMSA/IGV2ZW50c1swXSA6IGV2ZW50cztcbiAgICBlbHNlIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYWxsIGxpc3RlbmVycywgb3IgdGhvc2Ugb2YgdGhlIHNwZWNpZmllZCBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gW2V2ZW50XSBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnQpIHtcbiAgdmFyIGV2dDtcblxuICBpZiAoZXZlbnQpIHtcbiAgICBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuICAgIGlmICh0aGlzLl9ldmVudHNbZXZ0XSkgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudHMoKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vXG4vLyBBbGlhcyBtZXRob2RzIG5hbWVzIGJlY2F1c2UgcGVvcGxlIHJvbGwgbGlrZSB0aGF0LlxuLy9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBwcmVmaXguXG4vL1xuRXZlbnRFbWl0dGVyLnByZWZpeGVkID0gcHJlZml4O1xuXG4vL1xuLy8gQWxsb3cgYEV2ZW50RW1pdHRlcmAgdG8gYmUgaW1wb3J0ZWQgYXMgbW9kdWxlIG5hbWVzcGFjZS5cbi8vXG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xuaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgbW9kdWxlKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xufVxuIiwgImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi9pbmRleC5qcydcblxuZXhwb3J0IHsgRXZlbnRFbWl0dGVyIH1cbmV4cG9ydCBkZWZhdWx0IEV2ZW50RW1pdHRlclxuIiwgImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gXCJldmVudGVtaXR0ZXIzXCI7XG5pbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vZ2FtZS5qc1wiO1xuXG5leHBvcnQgY2xhc3MgU3RvcmUge1xuICAgIHJlYWRvbmx5IGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xuICAgIGl0ZW1zOiBSZWNvcmQ8c3RyaW5nLCBTdG9yZUl0ZW0+O1xuICAgIFxuICAgIHJlYWRvbmx5IERFRkFVTFRfSVRFTV9QUklDRVM6IFJlY29yZDxzdHJpbmcsIG51bWJlcj47XG4gICAgXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50LFxuICAgICAgICBpdGVtczogUmVjb3JkPHN0cmluZywgU3RvcmVJdGVtPixcbiAgICAgICAgREVGQVVMVF9JVEVNX1BSSUNFUzogUmVjb3JkPHN0cmluZywgbnVtYmVyPlxuICAgICkge1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XG4gICAgICAgIHRoaXMuREVGQVVMVF9JVEVNX1BSSUNFUyA9IERFRkFVTFRfSVRFTV9QUklDRVM7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU3RvcmVJdGVtIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICAjcHJpY2U6IG51bWJlcjtcbiAgICByZWFkb25seSBnYW1lOiBHYW1lO1xuICAgIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbiAgICByZWFkb25seSBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgICAgIGdhbWU6IEdhbWUsXG4gICAgICAgIG5hbWU6IHN0cmluZyxcbiAgICAgICAgcHJpY2U6IG51bWJlclxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLiNwcmljZSA9IHByaWNlO1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICBcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiY2xpY2tcIik7XG4gICAgICAgICAgICBpZihnYW1lLm1vbmV5ID49IHRoaXMucHJpY2UpIHtcbiAgICAgICAgICAgICAgICBnYW1lLm1vbmV5IC09IHRoaXMucHJpY2U7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwiYnV5XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICBcbiAgICBnZXQgcHJpY2UoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI3ByaWNlO1xuICAgIH1cbiAgICBzZXQgcHJpY2UoYTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuI3ByaWNlID0gYTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmlubmVyVGV4dCA9IGAke3RoaXMubmFtZX0gUiQke2F9YDtcbiAgICB9XG4gICAgXG4gICAgb25CdXkoaGFuZGxlcjogKHRoaXM6IHRoaXMpID0+IHZvaWQpOiB0aGlzIHtcbiAgICAgICAgdGhpcy5vbihcImJ1eVwiLCAoKSA9PiB7XG4gICAgICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICBvbkNsaWNrKGhhbmRsZXI6ICh0aGlzOiB0aGlzKSA9PiB2b2lkKTogdGhpcyB7XG4gICAgICAgIHRoaXMub24oXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICBidXkoKSB7XG4gICAgICAgIGlmKHRoaXMuZ2FtZS5tb25leSA+PSB0aGlzLnByaWNlKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUubW9uZXkgLT0gdGhpcy5wcmljZTtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImJ1eVwiKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCAiaW1wb3J0IHsgU3RvcmUgfSBmcm9tIFwiLi9zdG9yZS5qc1wiO1xuXG5leHBvcnQgY2xhc3MgR2FtZSB7XG4gICAgcmVhZG9ubHkgaWQ6IHN0cmluZztcbiAgICByZWFkb25seSBtb25leUVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudDtcbiAgICByZWFkb25seSBjbGlja3NFbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcbiAgICByZWFkb25seSBzdG9yZTogU3RvcmU7XG4gICAgXG4gICAgdGlja3M6IG51bWJlcjtcbiAgICBcbiAgICBtb25leTogbnVtYmVyO1xuICAgIGNsaWNrczogbnVtYmVyO1xuICAgIG11bHRpcGxpZXI6IG51bWJlcjtcbiAgICBhdXRvQ2xpY2tlclRpY2tzOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+O1xuICAgIF9vbGRDbGlja3NFbGVtZW50VGV4dExlbmd0aDogbnVtYmVyO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBtb25leUVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCxcbiAgICAgICAgY2xpY2tzRWxlbWVudDogSFRNTERpdkVsZW1lbnQsXG4gICAgICAgIHN0b3JlOiBTdG9yZVxuICAgICkge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMubW9uZXlFbGVtZW50ID0gbW9uZXlFbGVtZW50O1xuICAgICAgICB0aGlzLmNsaWNrc0VsZW1lbnQgPSBjbGlja3NFbGVtZW50O1xuICAgICAgICB0aGlzLnN0b3JlID0gc3RvcmU7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnRpY2tzID0gMDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubW9uZXkgPSAwO1xuICAgICAgICB0aGlzLmNsaWNrcyA9IDA7XG4gICAgICAgIHRoaXMubXVsdGlwbGllciA9IDE7XG4gICAgICAgIHRoaXMuYXV0b0NsaWNrZXJUaWNrcyA9IHt9O1xuICAgICAgICBcbiAgICAgICAgdGhpcy5fb2xkQ2xpY2tzRWxlbWVudFRleHRMZW5ndGggPSAxO1xuICAgICAgICBcbiAgICAgICAgY2xpY2tzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbGljaygpO1xuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50aWNrcysrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgdGlja0luU2Vjb25kID0gdGhpcy50aWNrcyAlIDIwIHx8IDIwO1xuICAgICAgICAgICAgbGV0IGNsaWNrc0luVGljayA9IE51bWJlcih0aGlzLmF1dG9DbGlja2VyVGlja3NbdGlja0luU2Vjb25kXSkgfHwgMDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGNsaWNrc0luVGljazsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgY2xpY2tzU3RyID0gdGhpcy5jbGlja3MudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGlmKHRoaXMuX29sZENsaWNrc0VsZW1lbnRUZXh0TGVuZ3RoICE9PSBjbGlja3NTdHIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja3NFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gYCR7MTYwIC0gY2xpY2tzU3RyLmxlbmd0aCAqIDEwfXB4YDtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbGRDbGlja3NFbGVtZW50VGV4dExlbmd0aCA9IGNsaWNrc1N0ci5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG1vbmV5RWxlbWVudC5pbm5lclRleHQgPSBNYXRoLmZsb29yKHRoaXMubW9uZXkpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBjbGlja3NFbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuY2xpY2tzLnRvU3RyaW5nKCk7XG4gICAgICAgIH0sIDUwKVxuICAgICAgICBcbiAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zYXZlKCk7XG4gICAgICAgIH0sIDQwMClcbiAgICB9XG4gICAgXG4gICAgY2xpY2soKSB7XG4gICAgICAgIHRoaXMuY2xpY2tzICs9IHRoaXMubXVsdGlwbGllcjtcbiAgICB9XG4gICAgXG4gICAgYWRkQXV0b0NsaWNrZXIodGljazogbnVtYmVyKSB7XG4gICAgICAgIGlmKCF0aGlzLmF1dG9DbGlja2VyVGlja3NbdGlja10pIHRoaXMuYXV0b0NsaWNrZXJUaWNrc1t0aWNrXSA9IDA7XG4gICAgICAgIHRoaXMuYXV0b0NsaWNrZXJUaWNrc1t0aWNrXSsrO1xuICAgIH1cbiAgICBcbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy50aWNrcyA9IDA7XG4gICAgICAgIHRoaXMubW9uZXkgPSAwO1xuICAgICAgICB0aGlzLmNsaWNrcyA9IDA7XG4gICAgICAgIHRoaXMubXVsdGlwbGllciA9IDE7XG4gICAgICAgIHRoaXMuYXV0b0NsaWNrZXJUaWNrcyA9IHt9O1xuICAgICAgICBcbiAgICAgICAgZm9yKGNvbnN0IGtleSBpbiB0aGlzLnN0b3JlLkRFRkFVTFRfSVRFTV9QUklDRVMpIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnN0b3JlLml0ZW1zW2tleV07XG4gICAgICAgICAgICBpZighaXRlbSkgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCBkZWZJdGVtUHJpY2UgPSB0aGlzLnN0b3JlLkRFRkFVTFRfSVRFTV9QUklDRVNba2V5XTtcbiAgICAgICAgICAgIGlmKGRlZkl0ZW1QcmljZSA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaXRlbS5wcmljZSA9IGRlZkl0ZW1QcmljZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBzYXZlKCkge1xuICAgICAgICBsZXQgZGF0YTogR2FtZVNhdmVEYXRhID0ge1xuICAgICAgICAgICAgdGlja3M6IHRoaXMudGlja3MsXG4gICAgICAgICAgICBtb25leTogdGhpcy5tb25leSxcbiAgICAgICAgICAgIGNsaWNrczogdGhpcy5jbGlja3MsXG4gICAgICAgICAgICBtdWx0aXBsaWVyOiB0aGlzLm11bHRpcGxpZXIsXG4gICAgICAgICAgICBhdXRvX2NsaWNrZXJfdGlja3M6IHt9LFxuICAgICAgICAgICAgc3RvcmVfaXRlbV9wcmljZXM6IHt9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZvcihsZXQgdGljayA9IDE7IHRpY2sgPD0gMjA7IHRpY2srKykge1xuICAgICAgICAgICAgbGV0IGNsaWNrc0luVGljayA9IE51bWJlcih0aGlzLmF1dG9DbGlja2VyVGlja3NbdGlja10pIHx8IDA7XG4gICAgICAgICAgICBkYXRhLmF1dG9fY2xpY2tlcl90aWNrcyFbdGlja10gPSBjbGlja3NJblRpY2sudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZm9yKGNvbnN0IGtleSBpbiB0aGlzLnN0b3JlLml0ZW1zKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5zdG9yZS5pdGVtc1trZXldITtcbiAgICAgICAgICAgIGRhdGEuc3RvcmVfaXRlbV9wcmljZXMhW2tleV0gPSBpdGVtLnByaWNlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBnYW1lLmNsaWNrX2dhbWUjJHt0aGlzLmlkfWAsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICB9XG4gICAgXG4gICAgbG9hZFNhdmVEYXRhKGRhdGE6IEdhbWVTYXZlRGF0YSkge1xuICAgICAgICBpZih0eXBlb2YgZGF0YSAhPT0gXCJvYmplY3RcIiB8fCBBcnJheS5pc0FycmF5KGRhdGEpKSB0aHJvdyBUeXBlRXJyb3IoXCJBcmd1bWVudCAnZGF0YScgbXVzdCBiZSBvZiB0eXBlIEdhbWVTYXZlRGF0YS5cIik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnRpY2tzID0gTnVtYmVyKGRhdGEudGlja3MpIHx8IHRoaXMudGlja3M7XG4gICAgICAgIHRoaXMubW9uZXkgPSBOdW1iZXIoZGF0YS5tb25leSkgfHwgdGhpcy5tb25leTtcbiAgICAgICAgdGhpcy5jbGlja3MgPSBOdW1iZXIoZGF0YS5jbGlja3MpIHx8IHRoaXMuY2xpY2tzO1xuICAgICAgICB0aGlzLm11bHRpcGxpZXIgPSBOdW1iZXIoZGF0YS5tdWx0aXBsaWVyKSB8fCB0aGlzLm11bHRpcGxpZXI7XG4gICAgICAgIFxuICAgICAgICBpZih0eXBlb2YgZGF0YS5hdXRvX2NsaWNrZXJfdGlja3MgPT09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkoZGF0YS5hdXRvX2NsaWNrZXJfdGlja3MpKSB7XG4gICAgICAgICAgICBmb3IobGV0IHRpY2sgPSAxOyB0aWNrIDw9IDIwOyB0aWNrKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY2xpY2tzSW5UaWNrID0gTnVtYmVyKGRhdGEuYXV0b19jbGlja2VyX3RpY2tzW3RpY2tdKTtcbiAgICAgICAgICAgICAgICBpZihOdW1iZXIuaXNOYU4oY2xpY2tzSW5UaWNrKSkgY29udGludWU7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvQ2xpY2tlclRpY2tzW3RpY2tdID0gY2xpY2tzSW5UaWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZih0eXBlb2YgZGF0YS5zdG9yZV9pdGVtX3ByaWNlcyA9PT0gXCJvYmplY3RcIiAmJiAhQXJyYXkuaXNBcnJheShkYXRhLnN0b3JlX2l0ZW1fcHJpY2VzKSkge1xuICAgICAgICAgICAgZm9yKGxldCBba2V5LCBwcmljZVN0cl0gb2YgT2JqZWN0LmVudHJpZXMoZGF0YS5zdG9yZV9pdGVtX3ByaWNlcykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5zdG9yZS5pdGVtc1trZXldO1xuICAgICAgICAgICAgICAgIGlmKCFpdGVtKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgcHJpY2UgPSBOdW1iZXIocHJpY2VTdHIpIHx8IGl0ZW0ucHJpY2U7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoaXRlbS5wcmljZSAhPT0gcHJpY2UpIGl0ZW0ucHJpY2UgPSBwcmljZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBsb2FkU2F2ZSgpIHtcbiAgICAgICAgbGV0IHJhd0RhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgZ2FtZS5jbGlja19nYW1lIyR7dGhpcy5pZH1gKTtcbiAgICAgICAgaWYocmF3RGF0YSA9PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGxldCBkYXRhO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UocmF3RGF0YSk7XG4gICAgICAgIH0gY2F0Y2gge31cbiAgICAgICAgXG4gICAgICAgIGlmKGRhdGEgPT09IHVuZGVmaW5lZCkgY29uc29sZS5lcnJvcihcIlRoZSBnYW1lIHNhdmUgYXBwZWFycyB0byBiZSBjb3JydXB0ZWQgYW5kIGNvdWxkIG5vdCBiZSBsb2FkZWQuXCIpO1xuICAgICAgICBpZihBcnJheS5pc0FycmF5KGRhdGEpKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxvYWRTYXZlRGF0YShkYXRhKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBdXRvQ2xpY2tlciB7XG4gICAgdGljazogbnVtYmVyO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHRpY2s6IG51bWJlcikge1xuICAgICAgICB0aGlzLnRpY2sgPSB0aWNrO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBHYW1lU2F2ZURhdGEge1xuICAgIHRpY2tzPzogbnVtYmVyLFxuICAgIG1vbmV5PzogbnVtYmVyLFxuICAgIGNsaWNrcz86IG51bWJlcixcbiAgICBtdWx0aXBsaWVyPzogbnVtYmVyLFxuICAgIGF1dG9fY2xpY2tlcl90aWNrcz86IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sXG4gICAgc3RvcmVfaXRlbV9wcmljZXM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+XG59IiwgIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50ZW1pdHRlcjNcIjtcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9nYW1lLmpzXCI7XG5pbXBvcnQgeyBTdG9yZSwgU3RvcmVJdGVtIH0gZnJvbSBcIi4vc3RvcmUuanNcIjtcbi8qaW1wb3J0IGVydWRhIGZyb20gXCJlcnVkYVwiO1xuZXJ1ZGEuaW5pdCgpOyovXG5cbmNvbnN0IHJlc2V0QnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVzZXRcIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG5cbmNvbnN0IHN0b3JlID0gbmV3IFN0b3JlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3RvcmVcIikgYXMgSFRNTERpdkVsZW1lbnQsIHt9LCB7XG4gICAgXCJhdXRvQ2xpY2tcIjogMTAwLFxuICAgIFwibXVsdGlwbGllclwiOiAxMDAwXG59KVxuXG5leHBvcnQgY29uc3QgZ2FtZSA9IG5ldyBHYW1lKFxuICAgIFwiMVwiLFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9uZXlcIikgYXMgSFRNTFNwYW5FbGVtZW50LFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xpY2tcIikgYXMgSFRNTERpdkVsZW1lbnQsXG4gICAgc3RvcmVcbik7XG5cbnN0b3JlLml0ZW1zID0ge1xuICAgIFwic2VsbFwiOiBuZXcgU3RvcmVJdGVtKFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGxfYnV0dG9uLnNlbGxcIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQsXG4gICAgICAgIGdhbWUsXG4gICAgICAgIFwiVmVuZGVyXCIsIDBcbiAgICApXG4gICAgLm9uQ2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5tb25leSArPSB0aGlzLmdhbWUuY2xpY2tzO1xuICAgICAgICB0aGlzLmdhbWUuY2xpY2tzID0gMDtcbiAgICB9KSxcbiAgICBcbiAgICBcImF1dG9DbGlja1wiOiBuZXcgU3RvcmVJdGVtKFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1eV9idXR0b24uYXV0b19jbGlja1wiKSBhcyBIVE1MQnV0dG9uRWxlbWVudCxcbiAgICAgICAgZ2FtZSxcbiAgICAgICAgXCJBdXRvIENsaWNrZXJcIixcbiAgICAgICAgc3RvcmUuREVGQVVMVF9JVEVNX1BSSUNFUy5hdXRvQ2xpY2shXG4gICAgKVxuICAgIC5vbkJ1eShmdW5jdGlvbih0aWNrPzogbnVtYmVyKSB7XG4gICAgICAgIHRpY2sgPSB0aWNrID8gKHRpY2sgJSAyMCB8fCAyMCkgOiAodGhpcy5nYW1lLnRpY2tzICUgMjAgfHwgMjApO1xuICAgICAgICB0aGlzLnByaWNlICs9IDEyO1xuICAgICAgICB0aGlzLmdhbWUuYWRkQXV0b0NsaWNrZXIodGljayk7XG4gICAgfSksXG4gICAgXG4gICAgXCJhdXRvQ2xpY2suYWxsXCI6IG5ldyBTdG9yZUl0ZW0oXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV5X2FsbF9idXR0b24uYXV0b19jbGlja1wiKSBhcyBIVE1MQnV0dG9uRWxlbWVudCxcbiAgICAgICAgZ2FtZSxcbiAgICAgICAgXCJDb21wcmFyIHRvZG9zXCIsXG4gICAgICAgIDBcbiAgICApXG4gICAgLm9uQ2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCB0aWNrID0gdGhpcy5nYW1lLnRpY2tzO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZ2FtZS5zdG9yZS5pdGVtc1tcImF1dG9DbGlja1wiXSE7XG4gICAgICAgIHdoaWxlKHRoaXMuZ2FtZS5tb25leSA+PSBpdGVtLnByaWNlKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUubW9uZXkgLT0gaXRlbS5wcmljZTtcbiAgICAgICAgICAgIGl0ZW0ucHJpY2UgKz0gMTI7XG4gICAgICAgICAgICB0aGlzLmdhbWUuYWRkQXV0b0NsaWNrZXIodGljaysrICUgMjAgfHwgMjApO1xuICAgICAgICB9XG4gICAgfSksXG4gICAgXG4gICAgXCJtdWx0aXBsaWVyXCI6IG5ldyBTdG9yZUl0ZW0oXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV5X2J1dHRvbi5tdWx0aXBsaWVyXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50LFxuICAgICAgICBnYW1lLFxuICAgICAgICBcIk11bHRpcGxpY2Fkb3JcIixcbiAgICAgICAgc3RvcmUuREVGQVVMVF9JVEVNX1BSSUNFUy5tdWx0aXBsaWVyIVxuICAgIClcbiAgICAub25CdXkoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucHJpY2UgKz0gTWF0aC5mbG9vcih0aGlzLnByaWNlICogMS4yKTtcbiAgICAgICAgdGhpcy5nYW1lLm11bHRpcGxpZXIrKztcbiAgICB9KSxcbn1cblxucmVzZXRCdXR0b25FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgbGV0IHJlcyA9IHdpbmRvdy5jb25maXJtKFwiRGVzZWphIHJlc2V0YXIgbyBqb2dvP1wiKTtcbiAgICBpZihyZXMpIGdhbWUucmVzZXQoKTtcbn0pXG5cbmZ1bmN0aW9uIGxvYWRMZWdhY3lTYXZlKCkge1xuICAgIGdhbWUudGlja3MgPSBOdW1iZXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0aWNrc1wiKSkgfHwgZ2FtZS50aWNrcztcbiAgICBnYW1lLm1vbmV5ID0gTnVtYmVyKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibW9uZXlcIikpIHx8IGdhbWUubW9uZXk7XG4gICAgZ2FtZS5jbGlja3MgPSBOdW1iZXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjbGlja3NcIikpIHx8IGdhbWUuY2xpY2tzO1xuICAgIGdhbWUubXVsdGlwbGllciA9IE51bWJlcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIm11bHRpcGxpZXJcIikpIHx8IGdhbWUubXVsdGlwbGllcjtcbiAgICBcbiAgICBsZXQgbG9jYWxBdXRvQ2xpY2tlclRpY2tzOiBudW1iZXJbXSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICB0cnkge1xuICAgICAgICBsb2NhbEF1dG9DbGlja2VyVGlja3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiYXV0b19jbGlja2VyX3RpY2tzXCIpIHx8IFwiW11cIik7XG4gICAgfSBjYXRjaCB7fVxuICAgIFxuICAgIGlmKEFycmF5LmlzQXJyYXkobG9jYWxBdXRvQ2xpY2tlclRpY2tzKSkge1xuICAgICAgICBmb3IoY29uc3QgdGljayBvZiBsb2NhbEF1dG9DbGlja2VyVGlja3MpIHtcbiAgICAgICAgICAgIC8qY29uc3QgYXV0b0NsaWNrZXIgPSBuZXcgQXV0b0NsaWNrZXIodGljayB8fCAxKTtcbiAgICAgICAgICAgIGdhbWUuYXV0b0NsaWNrZXJzLnB1c2goYXV0b0NsaWNrZXIpOyovXG4gICAgICAgICAgICBpZighZ2FtZS5hdXRvQ2xpY2tlclRpY2tzW3RpY2tdKSBnYW1lLmF1dG9DbGlja2VyVGlja3NbdGlja10gPSAwO1xuICAgICAgICAgICAgZ2FtZS5hdXRvQ2xpY2tlclRpY2tzW3RpY2tdKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZm9yKGNvbnN0IGtleSBpbiBnYW1lLnN0b3JlLml0ZW1zKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBnYW1lLnN0b3JlLml0ZW1zW2tleV0hO1xuICAgICAgICBcbiAgICAgICAgbGV0IHByaWNlID0gTnVtYmVyKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBzdG9yZS4ke2tleX0ucHJpY2VgKSk7XG4gICAgICAgIGlmKE51bWJlci5pc05hTihwcmljZSkpIGNvbnRpbnVlO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZGVmSXRlbVByaWNlID0gc3RvcmUuREVGQVVMVF9JVEVNX1BSSUNFU1trZXldO1xuICAgICAgICBpZihpdGVtLnByaWNlICE9PSBwcmljZSAmJiBwcmljZSA+IChkZWZJdGVtUHJpY2UgPz8gMCkpIGl0ZW0ucHJpY2UgPSBwcmljZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZUxlZ2FjeVNhdmUoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJ0aWNrc1wiKTtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcIm1vbmV5XCIpO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY2xpY2tzXCIpO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwibXVsdGlwbGllclwiKTtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImF1dG9fY2xpY2tlcl90aWNrc1wiKTtcbiAgICBcbiAgICBmb3IoY29uc3Qga2V5IGluIGdhbWUuc3RvcmUuaXRlbXMpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IGdhbWUuc3RvcmUuaXRlbXNba2V5XSE7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGBzdG9yZS4ke2tleX0ucHJpY2VgKTtcbiAgICB9XG59XG5cbmxvYWRMZWdhY3lTYXZlKCk7XG5kZWxldGVMZWdhY3lTYXZlKCk7XG5nYW1lLmxvYWRTYXZlKCk7XG5cbih3aW5kb3cgYXMgYW55KS5nYW1lID0gZ2FtZTsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUVBLFVBQUksTUFBTSxPQUFPLFVBQVU7QUFBM0IsVUFDSSxTQUFTO0FBU2IsZUFBUyxTQUFT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QVEsb0JBQW9CLEtBQUssSUFBSTtBQUFBLElBQ3pGLFFBQVE7QUFBQSxJQUFDO0FBRVQsUUFBRyxNQUFNLFFBQVEscUJBQXFCLEdBQUc7QUFDckMsaUJBQVUsUUFBUSx1QkFBdUI7QUFHckMsWUFBRyxDQUFDLEtBQUssaUJBQWlCLElBQUksRUFBRyxNQUFLLGlCQUFpQixJQUFJLElBQUk7QUFDL0QsYUFBSyxpQkFBaUIsSUFBSTtBQUFBLE1BQzlCO0FBQUEsSUFDSjtBQUVBLGVBQVUsT0FBTyxLQUFLLE1BQU0sT0FBTztBQUMvQixZQUFNLE9BQU8sS0FBSyxNQUFNLE1BQU0sR0FBRztBQUVqQyxVQUFJLFFBQVEsT0FBTyxhQUFhLFFBQVEsU0FBUyxHQUFHLFFBQVEsQ0FBQztBQUM3RCxVQUFHLE9BQU8sTUFBTSxLQUFLLEVBQUc7QUFFeEIsWUFBTSxlQUFlLE1BQU0sb0JBQW9CLEdBQUc7QUFDbEQsVUFBRyxLQUFLLFVBQVUsU0FBUyxTQUFTLGdCQUFnQixHQUFJLE1BQUssUUFBUTtBQUFBLElBQ3pFO0FBQUEsRUFDSjtBQUVBLFdBQVMsbUJBQW1CO0FBQ3hCLGlCQUFhLFdBQVcsT0FBTztBQUMvQixpQkFBYSxXQUFXLE9BQU87QUFDL0IsaUJBQWEsV0FBVyxRQUFRO0FBQ2hDLGlCQUFhLFdBQVcsWUFBWTtBQUNwQyxpQkFBYSxXQUFXLG9CQUFvQjtBQUU1QyxlQUFVLE9BQU8sS0FBSyxNQUFNLE9BQU87QUFDL0IsWUFBTSxPQUFPLEtBQUssTUFBTSxNQUFNLEdBQUc7QUFDakMsbUJBQWEsV0FBVyxTQUFTLEdBQUcsUUFBUTtBQUFBLElBQ2hEO0FBQUEsRUFDSjtBQUVBLGlCQUFlO0FBQ2YsbUJBQWlCO0FBQ2pCLE9BQUssU0FBUztBQUVkLEVBQUMsT0FBZSxPQUFPOyIsCiAgIm5hbWVzIjogWyJFdmVudEVtaXR0ZXIiLCAiRXZlbnRFbWl0dGVyIiwgImdhbWUiLCAiR2FtZSIsICJzdG9yZSIsICJHYW1lIl0KfQo=
