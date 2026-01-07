import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {

  private products = [
    { id: 1, name: 'Laptop', price: 1500 },
    { id: 2, name: 'Mouse', price: 50 },
  ];

  findAll() {
    return this.products;
  }

  search(query: string) {
    return this.products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  create(product: { name: string; price: number }) {
    const newProduct = {
      id: Date.now(),
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, product: { name: string; price: number }) {
    const index = this.products.findIndex(p => p.id === id);
    if (index >= 0) {
      this.products[index] = { id, ...product };
      return this.products[index];
    }
    return null;
  }

  delete(id: number) {
    this.products = this.products.filter(p => p.id !== id);
    return { message: 'Product deleted' };
  }
}
