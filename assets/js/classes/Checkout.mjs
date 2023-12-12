
import { Pricing_rules } from "./Pricing_rules.mjs";

export class Checkout{
    #items=[];//selected goods array
    #rule={};//discount rules

    constructor(pricing_rule){
        this.#rule=pricing_rule;
    }

    scan(item){
        this.#items.push(item);
    }

    get count(){
        return this.#items.length
    }

    item(i){
        return this.#items[i];
    }

    get total(){
        let groupedItems=this.#rule.prototype.groupedItems(this.#items);

        return groupedItems;
    }
}