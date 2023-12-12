

export class Item{

    #Name;//The item name
    #barcode;
    #price;

        constructor(Name, price, barcode){

        }

    get Name(){
        return this.#Name;
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