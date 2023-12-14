

export class Item{

    #name;//The item name
    #price;

    constructor(name, price, barcode){
        this.#name=name;
        this.#price=Number(price);
    }

    get name(){
        return this.#name;
    }

    get price(){
        return this.#price;
    }

    changePrice(newPrice){
        this.#price=newPrice;
    return true;//the price has been successfully changed
    }

    
}