
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

    setBasketDiscount(priceLimit, percentage){
        if(!priceLimit || !percentage)return;
        this.#commonDiscountLowPriceLimit=priceLimit;
        this.#commonDiscountPercentage=percentage;

    }


    getProductRule(itemName){
        return this.#rules.find(el=>el.item.name==itemName);
    }

    getCommonDiscountObj(){
        return {minPrice: this.#commonDiscountLowPriceLimit, percentage: this.#commonDiscountPercentage};
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
        if(!item?.name && !count)return null;
        let rule=this.getProductRule(item.name);
        let result=item.price*count;
        if(rule){
            result=Math.floor(count/rule.numberForDiscount)*rule.discountPrice+(count%rule.numberForDiscount)*item.price;
        }
        return result;
    }

    calcCommonDiscount(itemsSummaryPrice){
        let result=itemsSummaryPrice;
        if(this.#commonDiscountLowPriceLimit && this.#commonDiscountPercentage){
            result= itemsSummaryPrice>=this.#commonDiscountLowPriceLimit?itemsSummaryPrice*(100-this.#commonDiscountPercentage)/100:itemsSummaryPrice;
        }
        return result;
    }

    resetTotalRule(){
        this.#commonDiscountLowPriceLimit=undefined;
        this.#commonDiscountPercentage=undefined;
    }

    resetItemsRules(){
        this.#rules.length=0;
    }

    resetAll(){
        this.resetTotalRule();
        this.resetItemsRules();
    }

    get isRulesExists(){
        return !this.#rules.length && !this.#commonDiscountLowPriceLimit && !this.#commonDiscountPercentage ? false : true;
    }
}