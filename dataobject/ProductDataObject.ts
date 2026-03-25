export class ProductDetails {

public ProductMacBook: string;
public ProductiPhone: string;

constructor({ ProductMacBook, ProductiPhone }: { ProductMacBook: string; ProductiPhone: string }) {
      this.ProductMacBook = ProductMacBook;
      this.ProductiPhone = ProductiPhone;
}

}