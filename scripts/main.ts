"use strict";
import { EventEmitter } from "eventemitter3";
import { Game } from "./game.js";
import { Store, StoreItem } from "./store.js";
/*import eruda from "eruda";
eruda.init();*/

const resetButtonElement = document.querySelector("#reset") as HTMLButtonElement;

const store = new Store(document.querySelector("#store") as HTMLDivElement, {}, {
    "autoClick": 100,
    "multiplier": 1000
})

export const game = new Game(
    "1",
    document.querySelector("#money") as HTMLSpanElement,
    document.querySelector("#click") as HTMLDivElement,
    store
);

store.items = {
    "sell": new StoreItem(
        document.querySelector(".sell_button.sell") as HTMLButtonElement,
        game,
        "Vender", 0
    )
    .onClick(function() {
        this.game.money += this.game.clicks;
        this.game.clicks = 0;
    }),
    
    "autoClick": new StoreItem(
        document.querySelector(".buy_button.auto_click") as HTMLButtonElement,
        game,
        "Auto Clicker",
        store.DEFAULT_ITEM_PRICES.autoClick!
    )
    .onBuy(function(tick?: number) {
        tick = tick ? (tick % 20 || 20) : (this.game.ticks % 20 || 20);
        this.price += 12;
        this.game.addAutoClicker(tick);
    }),
    
    "autoClick.all": new StoreItem(
        document.querySelector(".buy_all_button.auto_click") as HTMLButtonElement,
        game,
        "Comprar todos",
        0
    )
    .onClick(function() {
        let tick = this.game.ticks;
        
        const item = this.game.store.items["autoClick"]!;
        while(this.game.money >= item.price) {
            this.game.money -= item.price;
            item.price += 12;
            this.game.addAutoClicker(tick++ % 20 || 20);
        }
    }),
    
    "multiplier": new StoreItem(
        document.querySelector(".buy_button.multiplier") as HTMLButtonElement,
        game,
        "Multiplicador",
        store.DEFAULT_ITEM_PRICES.multiplier!
    )
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
        
        const defItemPrice = store.DEFAULT_ITEM_PRICES[key];
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