
import { Checkout } from "./classes/Checkout.mjs";
import { Item } from "./classes/Item.mjs";
import { Pricing_rule } from "./classes/Pricing_rules.mjs";


const A=new Item("A", 50, 481123456123456);
const B=new Item("B",30, 481123456123457);
const C=new Item("C", 20, 4811234561234568);

const pricing_rules=new Pricing_rule();

pricing_rules.addRule(A,2,90);
pricing_rules.addRule(B,3, 75);
pricing_rules.setCommonDiscount(200,10);

const checkout = new Checkout(pricing_rules);

const itemsArr=[B, A, B, B, A];
itemsArr.forEach(el=>{checkout.scan(el)});

console.log(checkout.total);