
import { Checkout } from "./classes/Checkout.mjs";
import { Item } from "./classes/Item.mjs";
import { Pricing_rules } from "./classes/Pricing_rules.mjs";

const itemName=document.getElementById("item-name");
const itemPrice=document.getElementById("item-price");
const cardWrapper=document.getElementById("card-wrapper");
const itemsTypes=[];

document.querySelector("#btn-create").addEventListener('click', createItem);
document.querySelector('form').addEventListener('submit', createItem);


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
        setTimeout('document.querySelector(\'label[for="item-name"]\').style=""',1500);
        return;
    }

    if(!itemPrice.value){
    //the item price is incorrect
        let label=document.querySelector('label[for="item-price"]');
        label.style.color="red";
        setTimeout('document.querySelector(\'label[for="item-price"]\').style=""',1500);
        return;
    }

    itemsTypes.push(new Item(itemName.value, itemPrice.value));
    let card=`
        <div class="item-card">
            ${itemsTypes[itemsTypes.length-1].name}: ${itemsTypes[itemsTypes.length-1].price}
        </div>
    `;
    cardWrapper.insertAdjacentHTML('beforeend',card);
    itemName.value=itemPrice.value="";
    
}