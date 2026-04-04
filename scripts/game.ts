import { Store } from "./store.js";

export class Game {
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
        
        for(const key in this.store.DEFAULT_ITEM_PRICES) {
            const item = this.store.items[key];
            if(!item) continue;
            const defItemPrice = this.store.DEFAULT_ITEM_PRICES[key];
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

export class AutoClicker {
    tick: number;
    
    constructor(tick: number) {
        this.tick = tick;
    }
}

export interface GameSaveData {
    ticks?: number,
    money?: number,
    clicks?: number,
    multiplier?: number,
    auto_clicker_ticks?: Record<string, string>,
    store_item_prices?: Record<string, string>
}