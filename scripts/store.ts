import { EventEmitter } from "eventemitter3";
import { Game } from "./game.js";

export class Store {
    readonly element: HTMLDivElement;
    items: Record<string, StoreItem>;
    
    readonly DEFAULT_ITEM_PRICES: Record<string, number>;
    
    constructor(
        element: HTMLDivElement,
        items: Record<string, StoreItem>,
        DEFAULT_ITEM_PRICES: Record<string, number>
    ) {
        this.element = element;
        this.items = items;
        this.DEFAULT_ITEM_PRICES = DEFAULT_ITEM_PRICES;
    }
}

export class StoreItem extends EventEmitter {
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
        if(this.game.money >= this.price) {
            this.game.money -= this.price;
            this.emit("buy");
        }
    }
}