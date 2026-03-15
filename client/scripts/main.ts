"use strict";
import { EventEmitter } from "eventemitter3";
/*import eruda from "eruda";
eruda.init();*/

const resetButtonElement = document.querySelector("#reset") as HTMLButtonElement;

class Game {
    readonly moneyElement: HTMLSpanElement;
    readonly clicksElement: HTMLDivElement;
    readonly store: Store;
    
    ticks: number;
    
    money: number;
    clicks: number;
    multiplier: number;
    autoClickers: AutoClicker[];
    _oldClicksElementTextLength: number;
    
    constructor(
        moneyElement: HTMLSpanElement,
        clicksElement: HTMLDivElement,
        store: Store
    ) {
        this.moneyElement = moneyElement;
        this.clicksElement = clicksElement;
        this.store = store;
        
        this.ticks = 0;
        
        this.money = 0;
        this.clicks = 0;
        this.multiplier = 1;
        this.autoClickers = [];
        
        this._oldClicksElementTextLength = 1;
        
        clicksElement.addEventListener("click", () => {
            this.click();
        })
        
        setInterval(() => {
            this.ticks++;
            
            let tickInSecond = this.ticks % 20 || 20;
            for(const autoClicker of this.autoClickers) {
                if(autoClicker.tick !== tickInSecond) continue;
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
    }
    
    click() {
        this.clicks += this.multiplier;
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

const store = new Store(document.querySelector("#store") as HTMLDivElement, {});

export const game = new Game(
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
        this.price += 12;
        
        const autoClicker = new AutoClicker(tick ? (tick % 20 || 20) : (this.game.ticks % 20 || 20));
        this.game.autoClickers.push(autoClicker);
    }),
    
    "autoClick.all": new StoreItem(document.querySelector(".buy_all_button.auto_click") as HTMLButtonElement, game, "Comprar todos", 0)
    .onClick(function() {
        let tick = this.game.ticks;
        
        const item = game.store.items["autoClick"]!;
        while(this.game.money >= item.price) {
            item.buy();
            const autoClicker = this.game.autoClickers[this.game.autoClickers.length - 1];
            if(autoClicker) autoClicker.tick = (tick++ % 20 || 20);
        }
    }),
    
    "multiplier": new StoreItem(document.querySelector(".buy_button.multiplier") as HTMLButtonElement, game, "Multiplicador", DEFAULT_ITEM_PRICES.multiplier!)
    .onBuy(function() {
        this.price += Math.floor(this.price * 1.2);
        this.game.multiplier++;
    }),
}

export function reset() {
    game.ticks = 0;
    game.money = 0;
    game.clicks = 0;
    game.multiplier = 1;
    game.autoClickers = [];
    
    for(const key in DEFAULT_ITEM_PRICES) {
        const item = game.store.items[key];
        if(!item) continue;
        const defItemPrice = DEFAULT_ITEM_PRICES[key];
        if(defItemPrice === undefined) continue;
        
        item.price = defItemPrice;
    }
}

resetButtonElement.addEventListener("click", () => {
    let res = window.confirm("Deseja resetar o jogo?");
    if(res) reset();
})

setInterval(() => {
    localStorage.setItem("ticks", game.ticks.toString());
    localStorage.setItem("money", game.money. toString());
    localStorage.setItem("clicks", game.clicks.toString());
    localStorage.setItem("multiplier", game.multiplier.toString());
    localStorage.setItem("auto_clicker_ticks", JSON.stringify(game.autoClickers.map(a => a.tick)));
    
    for(const key in game.store.items) {
        const item = game.store.items[key]!;
        localStorage.setItem(`store.${key}.price`, item.price.toString());
    }
}, 300)

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
        const autoClicker = new AutoClicker(tick || 1);
        game.autoClickers.push(autoClicker);
    }
}

for(const key in game.store.items) {
    const item = game.store.items[key]!;
    
    let price = Number(localStorage.getItem(`store.${key}.price`));
    if(Number.isNaN(price)) continue;
    
    const defItemPrice = DEFAULT_ITEM_PRICES[key];
    if(item.price !== price && price > (defItemPrice ?? 0)) item.price = price;
}

(window as any).game = game;