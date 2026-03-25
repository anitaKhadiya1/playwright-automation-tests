import { PlayWrightHelper } from "../utilities/PlaywrightHelper";
import { ProductDetails as Product } from "../dataobject/ProductDataObject";

const playWrightHelper = new PlayWrightHelper();

export class ProductData {

    static getProductDetails(): Product{
       return new Product ({
       ProductMacBook : "MacBook",
       ProductiPhone : "iPhone"
       })
    }

}