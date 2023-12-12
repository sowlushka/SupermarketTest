
export class Pricing_rules{
    #rules=[];
    #commonDiscountLowPriceLimit;
    #commonDiscountPercentage;


    addRule(item, numberForDiscount, discountPrice){
        if(this.#rules.some(el=>el.item==item)) return 

        this.#rules.push({
            item: item,
            numberForDiscount: numberForDiscount,
            discountPrice: discountPrice
        });
    }

    setCommonDiscount(priceLimit, percentage){
        this.#commonDiscountLowPriceLimit=priceLimit;
        this.#commonDiscountPercentage=percentage;
    }


    getProductRule(itemName){
        return this.#rules.find(el=>el.item.name==itemName);
    }


    groupProductsByItem(itemsArray){
     
        let uniqItems=Array.from(new Set(itemsArray));//get unique items arr
        return uniqItems.map(element=>{
            return {
                        item: element,
                        count: itemsArray.reduce((acc,el)=>el.name==element.name?acc+1:acc,0)
                   }
        });
    }
    

    calcDiscountPrice(item, count){
        let rule=getProductRule(item);
        return Math.floor(count/rule.numberForDiscount)*rule.discountPrice+(count%rule.numberForDiscount)*item.price;
    }

    calcCommonDiscount(itemsSummaryPrice){
        return itemsSummaryPrice>=this.#commonDiscountLowPriceLimit?itemsSummaryPrice*(100-this.#commonDiscountPercentage)/100:itemsSummaryPrice;
    }




}