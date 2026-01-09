import { Injectable, NotFoundException } from '@nestjs/common';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { 
      id: 1, 
      name: 'Laptop', 
      description: 'Laptop de alta gama',
      price: 1500,
      category: 'Electrónica'
    },
    { 
      id: 2, 
      name: 'Mouse', 
      description: 'Mouse inalámbrico',
      price: 50,
      category: 'Accesorios'
    },
    { 
      id: 3, 
      name: 'Teclado', 
      description: 'Teclado mecánico RGB',
      price: 120,
      category: 'Accesorios'
    },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  search(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return this.products.filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    );
  }

  create(productData: Omit<Product, 'id'>): Product {
    const newProduct: Product = {
      id: Date.now(), // En producción usa UUID o ID de DB
      name: productData.name,
      description: productData.description,
      price: productData.price,
      category: productData.category,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, productData: Partial<Omit<Product, 'id'>>): Product {
    const index = this.products.findIndex(p => p.id === id);
    
    if (index === -1) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    this.products[index] = {
      ...this.products[index],
      ...productData,
      id, // Mantener el ID original
    };

    return this.products[index];
  }

  delete(id: number): { message: string } {
    const index = this.products.findIndex(p => p.id === id);
    
    if (index === -1) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    this.products.splice(index, 1);
    return { message: 'Producto eliminado exitosamente' };
  }
}