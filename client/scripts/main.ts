"use strict";
import { EventEmitter } from "eventemitter3";
/*import eruda from "eruda";
eruda.init();*/

const resetButtonElement = document.querySelector("#reset") as HTMLButtonElement;

class Game {
    readonly id: string;
    readonly moneyElement: HTMLSpanElement;
    readonly clicksElement: HTMLDivElement;
    readonly store: Store;
    
    ticks: number;
    
    money: number;
    clicks: number;
    multiplier: number;
    autoClickerTicks: Record<string, number>;
    _oldClicksElementTextLength: number;
    
    constructor(
        id: string,
        moneyElement: HTMLSpanElement,
        clicksElement: HTMLDivElement,
        store: Store
    ) {
        this.id = id;
        this.moneyElement = moneyElement;
        this.clicksElement = clicksElement;
        this.store = store;
        
        this.ticks = 0;
        
        this.money = 0;
        this.clicks = 0;
        this.multiplier = 1;
        this.autoClickerTicks = {};
        
        this._oldClicksElementTextLength = 1;
        
        clicksElement.addEventListener("click", () => {
            this.click();
        })
        
        setInterval(() => {
            this.ticks++;
            
            let tickInSecond = this.ticks % 20 || 20;
            let clicksInTick = Number(this.autoClickerTicks[tickInSecond]) || 0;
            
            for(let i = 0; i < clicksInTick; i++) {
                this.click();
            }
            
            let clicksStr = this.clicks.toString();
            if(this._oldClicksElementTextLength !== clicksStr.length) {
                this.clicksElement.style.fontSize = `${160 - clicksStr.length * 10}px`;
                this._oldClicksElementTextLength = clicksStr.length;
            }
            
            moneyElement.innerText = Math.floor(this.money).toString();
            clicksElement.innerText = this.clicks.toString();
        }, 50)
        
        setInterval(() => {
            this.save();
        }, 400)
    }
    
    click() {
        this.clicks += this.multiplier;
    }
    
    addAutoClicker(tick: number) {
        if(!this.autoClickerTicks[tick]) this.autoClickerTicks[tick] = 0;
        this.autoClickerTicks[tick]++;
    }
    
    reset() {
        this.ticks = 0;
        this.money = 0;
        this.clicks = 0;
        this.multiplier = 1;
        this.autoClickerTicks = {};
        
        for(const key in DEFAULT_ITEM_PRICES) {
            const item = this.store.items[key];
            if(!item) continue;
            const defItemPrice = DEFAULT_ITEM_PRICES[key];
            if(defItemPrice === undefined) continue;
            
            item.price = defItemPrice;
        }
    }
    
    save() {
        let data: GameSaveData = {
            ticks: this.ticks,
            money: this.money,
            clicks: this.clicks,
            multiplier: this.multiplier,
            auto_clicker_ticks: {},
            store_item_prices: {}
        }
        
        for(let tick = 1; tick <= 20; tick++) {
            let clicksInTick = Number(this.autoClickerTicks[tick]) || 0;
            data.auto_clicker_ticks![tick] = clicksInTick.toString();
        }
        
        for(const key in this.store.items) {
            const item = this.store.items[key]!;
            data.store_item_prices![key] = item.price.toString();
        }
        
        localStorage.setItem(`game.click_game#${this.id}`, JSON.stringify(data));
    }
    
    loadSaveData(data: GameSaveData) {
        if(typeof data !== "object" || Array.isArray(data)) throw TypeError("Argument 'data' must be of type GameSaveData.");
        
        this.ticks = Number(data.ticks) || this.ticks;
        this.money = Number(data.money) || this.money;
        this.clicks = Number(data.clicks) || this.clicks;
        this.multiplier = Number(data.multiplier) || this.multiplier;
        
        if(typeof data.auto_clicker_ticks === "object" && !Array.isArray(data.auto_clicker_ticks)) {
            for(let tick = 1; tick <= 20; tick++) {
                let clicksInTick = Number(data.auto_clicker_ticks[tick]);
                if(Number.isNaN(clicksInTick)) continue;
                
                this.autoClickerTicks[tick] = clicksInTick;
            }
        }
        
        if(typeof data.store_item_prices === "object" && !Array.isArray(data.store_item_prices)) {
            for(let [key, priceStr] of Object.entries(data.store_item_prices)) {
                const item = this.store.items[key];
                if(!item) continue;
                
                let price = Number(priceStr) || item.price;
                
                if(item.price !== price) item.price = price;
            }
        }
    }
    
    loadSave() {
        let rawData = localStorage.getItem(`game.click_game#${this.id}`);
        if(rawData == undefined) return;
        
        let data;
        try {
            data = JSON.parse(rawData);
        } catch {}
        
        if(data === undefined) console.error("The game save appears to be corrupted and could not be loaded.");
        if(Array.isArray(data)) return;
        
        this.loadSaveData(data);
    }
}

class Store {
    readonly element: HTMLDivElement;
    items: Record<string, StoreItem>;
    
    constructor(element: HTMLDivElement, items: Record<string, StoreItem>) {
        this.element = element;
        this.items = items;
    }
}

class StoreItem extends EventEmitter {
    #price: number;
    readonly game: Game;
    readonly name: string;
    readonly element: HTMLElement;
    
    constructor(
        element: HTMLElement,
        game: Game,
        name: string,
        price: number
    ) {
        super();
        this.element = element;
        this.#price = price;
        this.game = game;
        this.name = name;
        
        /*if(typeof onBuy === "function") {
            element.addEventListener("click", () => {
                if(game.money >= this.price) {
                    game.money -= this.price;
                    onBuy.call(this);
                }
            })
        }*/
        
        element.addEventListener("click", () => {
            this.emit("click");
            if(game.money >= this.price) {
                game.money -= this.price;
                this.emit("buy");
            }
        })
    }
    
    get price(): number {
        return this.#price;
    }
    set price(a: number) {
        this.#price = a;
        this.element.innerText = `${this.name} R$${a}`;
    }
    
    onBuy(handler: (this: this) => void): this {
        this.on("buy", () => {
            handler.call(this);
        })
        return this;
    }
    
    onClick(handler: (this: this) => void): this {
        this.on("click", () => {
            handler.call(this);
        })
        return this;
    }
    
    buy() {
        if(game.money >= this.price) {
            game.money -= this.price;
            this.emit("buy");
        }
    }
}

class AutoClicker {
    tick: number;
    
    constructor(tick: number) {
        this.tick = tick;
    }
}

interface GameSaveData {
    ticks?: number,
    money?: number,
    clicks?: number,
    multiplier?: number,
    auto_clicker_ticks?: Record<string, string>,
    store_item_prices?: Record<string, string>
}

const store = new Store(document.querySelector("#store") as HTMLDivElement, {});

export const game = new Game(
    "1",
    document.querySelector("#money") as HTMLSpanElement,
    document.querySelector("#click") as HTMLDivElement,
    store
);

const DEFAULT_ITEM_PRICES: Record<string, number> = {
    "autoClick": 100,
    "multiplier": 1000
}

store.items = {
    "sell": new StoreItem(document.querySelector(".sell_button.sell") as HTMLButtonElement, game, "Vender", 0)
    .onClick(function() {
        this.game.money += this.game.clicks;
        this.game.clicks = 0;
    }),
    
    "autoClick": new StoreItem(document.querySelector(".buy_button.auto_click") as HTMLButtonElement, game, "Auto Clicker", DEFAULT_ITEM_PRICES.autoClick!)
    .onBuy(function(tick?: number) {
        tick = tick ? (tick % 20 || 20) : (this.game.ticks % 20 || 20);
        this.price += 12;
        this.game.addAutoClicker(tick);
    }),
    
    "autoClick.all": new StoreItem(document.querySelector(".buy_all_button.auto_click") as HTMLButtonElement, game, "Comprar todos", 0)
    .onClick(function() {
        let tick = this.game.ticks;
        
        const item = game.store.items["autoClick"]!;
        while(this.game.money >= item.price) {
            item.buy();
            /*const autoClicker = this.game.autoClickers[this.game.autoClickers.length - 1];
            if(autoClicker) autoClicker.tick = (tick++ % 20 || 20);*/
        }
    }),
    
    "multiplier": new StoreItem(document.querySelector(".buy_button.multiplier") as HTMLButtonElement, game, "Multiplicador", DEFAULT_ITEM_PRICES.multiplier!)
    .onBuy(function() {
        this.price += Math.floor(this.price * 1.2);
        this.game.multiplier++;
    }),
}

resetButtonElement.addEventListener("click", () => {
    let res = window.confirm("Deseja resetar o jogo?");
    if(res) game.reset();
})

function loadLegacySave() {
    game.ticks = Number(localStorage.getItem("ticks")) || game.ticks;
    game.money = Number(localStorage.getItem("money")) || game.money;
    game.clicks = Number(localStorage.getItem("clicks")) || game.clicks;
    game.multiplier = Number(localStorage.getItem("multiplier")) || game.multiplier;
    
    let localAutoClickerTicks: number[] | undefined = undefined;
    try {
        localAutoClickerTicks = JSON.parse(localStorage.getItem("auto_clicker_ticks") || "[]");
    } catch {}
    
    if(Array.isArray(localAutoClickerTicks)) {
        for(const tick of localAutoClickerTicks) {
            /*const autoClicker = new AutoClicker(tick || 1);
            game.autoClickers.push(autoClicker);*/
            if(!game.autoClickerTicks[tick]) game.autoClickerTicks[tick] = 0;
            game.autoClickerTicks[tick]++;
        }
    }
    
    for(const key in game.store.items) {
        const item = game.store.items[key]!;
        
        let price = Number(localStorage.getItem(`store.${key}.price`));
        if(Number.isNaN(price)) continue;
        
        const defItemPrice = DEFAULT_ITEM_PRICES[key];
        if(item.price !== price && price > (defItemPrice ?? 0)) item.price = price;
    }
}

function deleteLegacySave() {
    localStorage.removeItem("ticks");
    localStorage.removeItem("money");
    localStorage.removeItem("clicks");
    localStorage.removeItem("multiplier");
    localStorage.removeItem("auto_clicker_ticks");
    
    for(const key in game.store.items) {
        const item = game.store.items[key]!;
        localStorage.removeItem(`store.${key}.price`);
    }
}

loadLegacySave();
deleteLegacySave();
game.loadSave();

(window as any).game = game;