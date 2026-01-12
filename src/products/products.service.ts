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
    {
      id: 4,
      name: 'Monitor',
      description: 'Monitor 27 pulgadas',
      price: 300,
      category: 'Electrónica'
    },
    {
      id: 5,
      name: 'Impresora',
      description: 'Impresora multifuncional',
      price: 200,
      category: 'Oficina'
    },
    {
      id: 6,
      name: 'Auriculares',
      description: 'Auriculares con cancelación de ruido',
      price: 180,
      category: 'Audio'
    },
    {
      id: 7,
      name: 'Cámara',
      description: 'Cámara digital de 24MP',
      price: 400,
      category: 'Fotografía'
    },
    {
      id: 8,
      name: 'Smartphone',
      description: 'Smartphone de última generación',
      price: 800,
      category: 'Electrónica'
    },
    {
      id: 9,
      name: 'Tablet',
      description: 'Tablet de 10 pulgadas',
      price: 500,
      category: 'Electrónica'
    },
    {
      id: 10,
      name: 'Router',
      description: 'Router inalámbrico de alta velocidad',
      price: 100,
      category: 'Redes'
    }
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
    const nextId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    const newProduct: Product = {
      id: nextId, // Asignar el siguiente ID disponible
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