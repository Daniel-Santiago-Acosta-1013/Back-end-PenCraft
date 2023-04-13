import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
  });

  describe('create', () => {
    it('should call productService.create with the provided product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Sample Product',
        description: 'This is a sample product for testing purposes.',
        price: 19.99,
      };
      await productController.create(createProductDto);
      expect(productService.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = [
        {
          _id: '1',
          name: 'zapato nike',
          description: 'es un zapato re melo',
          price: 10000,
        },
        {
          _id: '2',
          name: 'zapato adidas',
          description: 'es un zapato re melo pero adidas jeje',
          price: 10000,
        },
      ];
      jest.spyOn(productService, 'findAll').mockResolvedValue(products);
      expect(await productController.findAll()).toBe(products);
    });

    it('should return "No hay productos" if no products are found', async () => {
      jest.spyOn(productService, 'findAll').mockResolvedValue([]);
      expect(await productController.findAll()).toBe('No hay productos');
    });
  });

  describe('findOne', () => {
    it('should return a product with the specified id', async () => {
      const product = {
        _id: '1',
        name: 'Sample Product',
        description: 'This is a sample product for testing purposes.',
        price: 19.99,
      };
      jest.spyOn(productService, 'findOne').mockResolvedValue(product);
      expect(await productController.findOne('1')).toBe(product);
    });

    it('should return "No existe un producto con ese id" if no product is found', async () => {
      jest.spyOn(productService, 'findOne').mockResolvedValue(null);
      expect(await productController.findOne('1')).toBe(
        'No existe un producto con ese id',
      );
    });
  });

  describe('update', () => {
    it('should call productService.update with the provided id and product data', async () => {
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        description: 'This is an updated product for testing purposes.',
        price: 24.99,
      };
      jest.spyOn(productService, 'update').mockResolvedValue(undefined);
      await productController.update('1', updateProductDto);
      expect(productService.update).toHaveBeenCalledWith('1', updateProductDto);
    });
  });

  describe('delete', () => {
    it('should call productService.delete with the provided id', async () => {
      jest.spyOn(productService, 'delete').mockResolvedValue(undefined);
      await productController.delete('1');
      expect(productService.delete).toHaveBeenCalledWith('1');
    });
  });
});
