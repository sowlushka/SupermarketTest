
export class Pricing_rule{
    #productsList=[];// array of the products for discounting
    #numberForDiscount=[];//The number of products for which a discount is allowed
    #discountPrice=[];//The price for the discount quantity of goods

    addRule(product, numberForDiscount, discountPrice){
        this.#productsList=[];
        this.#productsList.push(product);
        this.#numberForDiscount.push(numberForDiscount);
        this.#discountPrice.push(discountPrice);
    }
}