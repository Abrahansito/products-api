import { Controller, Get, Post, Put, Delete, Body, Param, Query,} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('search')
  search(@Query('q') q: string) {
    return this.productsService.search(q);
  }

  @Post()
  create(@Body() product) {
    return this.productsService.create(product);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() product) {
    return this.productsService.update(Number(id), product);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(Number(id));
  }
}
