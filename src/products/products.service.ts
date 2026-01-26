import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al crear el producto');
    }
  }

  findAll() {
    return this.productRepository.find({
      order: { created_at: 'DESC' } // Ordenar por fecha, más nuevos primero
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  // Buscador avanzado
  async search(term: string) {
    return this.productRepository.find({
      where: [
        { name: ILike(`%${term}%`) },
        { description: ILike(`%${term}%`) },
        { category: ILike(`%${term}%`) }
      ]
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // preload busca primero si existe, y si existe, fusiona los datos nuevos
    const product = await this.productRepository.preload({
      id: id,
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    try {
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar producto');
    }
  }

  async delete(id: number) {
    const product = await this.findOne(id); // Reutilizamos findOne para verificar que existe
    await this.productRepository.remove(product);
    return { message: 'Producto eliminado exitosamente' };
  }
}