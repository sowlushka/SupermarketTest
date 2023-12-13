
import { Checkout } from "./classes/Checkout.mjs";
import { Item } from "./classes/Item.mjs";
import { Pricing_rules } from "./classes/Pricing_rules.mjs";

const flashTime=1500;//Time for label flash when input error

const itemName=document.getElementById("item-name");
const itemPrice=document.getElementById("item-price");
const cardWrapper=document.getElementById("card-wrapper");
const discountSelect=document.getElementById("select-item-discount");
const discountCount=document.getElementById("discount-count");
const discountPrice=document.getElementById("discount-price");
const priceRulesList=document.querySelector("#price-rule-wrapper");
const itemsTypes=[];
const pricing_rules=new Pricing_rules();

document.querySelector("#btn-create").addEventListener('click', createItem);


document.querySelector("#btn-reset").addEventListener('click', ()=>{
    itemsTypes.length=0;
    cardWrapper.innerHTML="";
    discountSelect.innerHTML="<option value=\"\"></option>";
});


document.querySelector("#btn-rule-add").addEventListener('click', createPricingRuleForItem);


/*
const A=new Item("A", 50);
const B=new Item("B",30);
const C=new Item("C", 20);

const pricing_rules=new Pricing_rules();

pricing_rules.addRule(A,2,90);
pricing_rules.addRule(B,3, 75);
pricing_rules.setCommonDiscount(200,10);

const checkout = new Checkout(pricing_rules);

//const itemsArr=[B, A, B, B, A];
itemsArr.forEach(el=>{checkout.scan(el)});

console.log(checkout.total);
*/

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
    const newOption=document.createElement("option");
    newOption.value=itemsTypes.length-1;
    newOption.innerText=newItem.name;
    discountSelect.appendChild(newOption);
    
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
    const newDiv=document.createElement("div");
    newDiv.innerText=`Price for ${discountCount.value} items ${discountItem.name} is £${discountPrice.value}`;
    priceRulesList.appendChild(newDiv);
    discountCount.value="";
    discountPrice.value="";

    //removing item from the select
    let removeSelect=discountSelect.querySelector(`option[value="${discountSelect.value}"]`);
    removeSelect.remove();
}