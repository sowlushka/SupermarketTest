

export class Item{

    #name;//The item name
    #barcode;
    #price;

    constructor(name, price, barcode){
        this.#name=name;
        this.#price=price;
        this.#barcode=barcode;
    }

    get name(){
        return this.#name;
    }

    get barcode(){
        return this.#barcode;
    }

    get price(){
        return this.#price;
    }

    changePrice(newPrice){
        this.#price=newPrice;
    return true;//the price has been successfully changed
    }

    
}