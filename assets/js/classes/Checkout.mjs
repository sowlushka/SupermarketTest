

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
        let groupedItems=rules.groupedItems(this.#items);

        return groupedItems;
    }
}