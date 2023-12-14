
import { Checkout } from "./classes/Checkout.mjs";
import { Item } from "./classes/Item.mjs";
import { Pricing_rules } from "./classes/Pricing_rules.mjs";

const flashTime=2000;//Time for label flash when input error

//The references to HTML elements
const itemName=document.getElementById("item-name");
const itemPrice=document.getElementById("item-price");
const cardWrapper=document.getElementById("card-wrapper");
const discountSelect=document.getElementById("select-item-discount");
const discountCount=document.getElementById("discount-count");
const discountPrice=document.getElementById("discount-price");
const priceRulesList=document.querySelector("#price-rule-wrapper");
const totalDiscountMinPrice=document.getElementById("total-discount-minprice");
const totalDiscountPercentage=document.getElementById("total-discount-percentage");
const scanSelect=document.getElementById("select-item-scan");
const basketList=document.getElementById("basket-card-wrapper");
const basketTotalPrice=document.getElementById("basket-total-price");

const itemsTypes=[];
const basketItems=[];
const pricing_rules=new Pricing_rules();


//--------------Buttons events----------------------------------------------
document.querySelector("#btn-create").addEventListener('click', createItem);


document.querySelector("#btn-reset").addEventListener('click', ()=>{
    itemsTypes.length=0;
    cardWrapper.innerHTML="";
    discountSelect.innerHTML=scanSelect.innerHTML="<option value=\"\"></option>";

});


document.querySelector("#btn-rule-add").addEventListener('click', createPricingRuleForItem);
document.querySelector("#btn-rule-reset").addEventListener('click', ()=>{
    pricing_rules.resetItemsRules();//reset all discounts for items
    priceRulesList.innerHTML="";
    let totalBasketRule=pricing_rules.getCommonDiscountObj()
    if(totalBasketRule.minPrice){
        showBasketPriceRule(totalBasketRule.minPrice, totalBasketRule.percentage);
    }
    discountSelect.innerHTML="<option value=\"\"></option>";
    itemsTypes.forEach((item,indx)=>{
        const newOption=document.createElement("option");
        newOption.value=indx;
        newOption.innerText=item.name;
        discountSelect.appendChild(newOption);
    });
});

document.querySelector("#btn-rule-total-add").addEventListener('click',(e)=>{
    //check empty inputs
    if(!totalDiscountMinPrice.value){
        const label=document.querySelector('label[for="total-discount-minprice"]');
        label.style.color="red";
        setTimeout('document.querySelector(\'label[for="total-discount-minprice"]\').style=""',flashTime);
        return;
    }

    if(!totalDiscountPercentage.value){
        const label=document.querySelector('label[for="total-discount-percentage"]');
        label.style.color="red";
        setTimeout('document.querySelector(\'label[for="total-discount-percentage"]\').style=""',flashTime);
        return;
    }

    pricing_rules.setBasketDiscount(totalDiscountMinPrice.value, totalDiscountPercentage.value);
    showBasketPriceRule(totalDiscountMinPrice.value, totalDiscountPercentage.value);
    e.target.disabled=true;
    
    //erase inputs
    totalDiscountMinPrice.value="";
    totalDiscountPercentage.value="";
});


document.querySelector("#btn-rule-total-reset").addEventListener('click',(e)=>{
    pricing_rules.resetTotalRule();
    showAllPricingRules(pricing_rules);
    document.querySelector("#btn-rule-total-add").disabled=false;//enable button for basket discount
});


document.querySelector("#btn-scan-add").addEventListener('click',(e)=>{
    let scanValue=scanSelect.value;
    //check empty value in the select
    if(scanValue===""){
        const label=document.querySelector('label[for="select-item-scan"]');
        label.style.color="red";
        setTimeout('document.querySelector(\'label[for="select-item-scan"]\').style=""',flashTime);
        return;
    }

    basketItems.push(itemsTypes[scanValue]);
    showBasket();
});

document.querySelector("#btn-scan-reset").addEventListener('click',()=>{
    basketItems.length=0;
    basketList.innerHTML="";
    basketTotalPrice.innerText="";
});

//-----------------------Buttons Events End-------------------------------------------------------



function createItem(){
    if(itemsTypes.some(item=>item.name==itemName.value)){
    //the item name was repeated
        let label=document.querySelector('label[for="item-name"]');
        label.style.color="red";
        setTimeout('document.querySelector(\'label[for="item-name"]\').style=""',flashTime);
        return;
    }

    if(!itemPrice.value){
    //the item price is incorrect
        let label=document.querySelector('label[for="item-price"]');
        label.style.color="red";
        setTimeout('document.querySelector(\'label[for="item-price"]\').style=""',flashTime);
        return;
    }

    const newItem=new Item(itemName.value, itemPrice.value)
    itemsTypes.push(newItem);
    let card=`
        <div class="item-card">
            ${newItem.name}: ${newItem.price}
        </div>
    `;
    cardWrapper.insertAdjacentHTML('beforeend',card);
    itemName.value=itemPrice.value="";

    let html=`<option value="${itemsTypes.length-1}">${newItem.name}</option>`
    
    discountSelect.insertAdjacentHTML("beforeend", html);
    scanSelect.insertAdjacentHTML("beforeend", html);
    
}



function createPricingRuleForItem(){
//function create pricing rules for selected goods types

    //Checking input values
    if(discountSelect.value===""){
        const label=document.querySelector('label[for="select-item-discount"]');
        label.style.color="red";
        setTimeout('document.querySelector(\'label[for="select-item-discount"]\').style=""',flashTime);
        return;
    }

    if(!discountCount.value){
        const label=document.querySelector('label[for="discount-count"]');
        label.style.color="red";
        setTimeout('document.querySelector(\'label[for="discount-count"]\').style=""',flashTime);
        return;
    }

    if(!discountPrice.value){
        const label=document.querySelector('label[for="discount-price"]');
        label.style.color="red";
        setTimeout('document.querySelector(\'label[for="discount-price"]\').style=""',flashTime);
        return;
    }

    let discountItem=itemsTypes[discountSelect.value];
    pricing_rules.addRule(discountItem, discountCount.value, discountPrice.value);
    showItemPriceRule(discountItem.name, discountCount.value, discountPrice.value);

    //clearing inputs
    discountCount.value="";
    discountPrice.value="";

    //removing item from the select
    let removeSelect=discountSelect.querySelector(`option[value="${discountSelect.value}"]`);
    removeSelect.remove();
}

function showAllPricingRules(pricing_rules){
//function writes all discount rules in the HTML <div> element
    priceRulesList.innerHTML="";
    itemsTypes.forEach(item=>{
            let rule=pricing_rules.getProductRule(item.name);
            if(rule)showItemPriceRule(item.name,rule.numberForDiscount, rule.discountPrice);
    });

   
    let totalRule=pricing_rules.getCommonDiscountObj();
    if (totalRule.minPrice){
        showBasketPriceRule(totalRule.minPrice, totalRule.percentage);
    }

}

function showBasketPriceRule(minPrice, percentage){
    const newDiv=document.createElement("div");
    newDiv.innerText=`Total discount is ${percentage}% for £${minPrice} basket min price`;
    priceRulesList.appendChild(newDiv);
}

function showItemPriceRule(name, count, price){
    const newDiv=document.createElement("div");
    newDiv.innerText=`Price for ${count} items ${name} is £${price}`;
    priceRulesList.appendChild(newDiv);
}

function showBasket(){
    const checkout = new Checkout(pricing_rules);
    basketList.innerHTML="";
    basketItems.forEach(item=>{
        let card=`
            <div class="item-card">
                ${item.name}: ${item.price}
            </div>
        `;
        basketList.insertAdjacentHTML('beforeend',card);
        checkout.scan(item);
    });

    basketTotalPrice.innerText=`Total basket price is £${checkout.total}`;
}