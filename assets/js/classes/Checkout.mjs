
export class Checkout {
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

    get rule(){
        return this.#rule;
    }

    get total(){
        let groupedItems=this.#rule.groupProductsByItem(this.#items);// divide the stream of goods into groups
        let sum=groupedItems.reduce((acc,el)=>acc+this.#rule.calcDiscountPrice(el.item, el.count),0)

        return this.#rule.calcCommonDiscount(sum);
    }
}