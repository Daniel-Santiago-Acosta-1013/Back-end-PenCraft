import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Model } from 'mongoose';
import { Product } from '../schemas/product.schema';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

const mockProductModel = () => ({
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  save: jest.fn(),
});

describe('ProductService', () => {
  let productService: ProductService;
  let productModel: Model<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: 'ProductModel',
          useFactory: mockProductModel,
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productModel = module.get<Model<Product>>('ProductModel');
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
    expect(productModel).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product and return it', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Sample Product',
        description: 'This is a sample product for testing purposes.',
        price: 19.99,
      };

      const createdProduct: Product = {
        _id: '1',
        ...createProductDto,
      };

      productModel.prototype.save = jest.fn().mockResolvedValue(createdProduct);

      const result = await productService.create(createProductDto);
      expect(result).toEqual(createdProduct);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products: Product[] = [
        {
          _id: '1',
          name: 'Product 1',
          description: 'This is product 1',
          price: 9.99,
        },
        {
          _id: '2',
          name: 'Product 2',
          description: 'This is product 2',
          price: 19.99,
        },
      ];

      productModel.find = jest.fn().mockResolvedValue(products);

      const result = await productService.findAll();
      expect(result).toEqual(products);
    });
  });

  describe('findOne', () => {
    it('should return a product by ID', async () => {
      const product: Product = {
        _id: '1',
        name: 'Product 1',
        description: 'This is product 1',
        price: 9.99,
      };

      productModel.findById = jest.fn().mockResolvedValue(product);

      const result = await productService.findOne('1');
      expect(result).toEqual(product);
    });
  });

  describe('update', () => {
    it('should update a product and return it', async () => {
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        description: 'This is an updated product',
        price: 29.99,
      };

      const updatedProduct: Partial<Product> = {
        _id: '1',
        ...updateProductDto,
      };

      productModel.findByIdAndUpdate = jest
        .fn()
        .mockResolvedValue(updatedProduct);
      productModel.findById = jest.fn().mockResolvedValue(updatedProduct);

      const result = await productService.update('1', updateProductDto);
      expect(result).toEqual(updatedProduct);
      expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        updateProductDto,
      );
    });
  });

  describe('delete', () => {
    it('should delete a product and return it', async () => {
      const productToDelete: Product = {
        _id: '1',
        name: 'Product 1',
        description: 'This is product 1',
        price: 9.99,
      };

      productModel.findByIdAndDelete = jest
        .fn()
        .mockResolvedValue(productToDelete);

      const result = await productService.delete('1');
      expect(result).toEqual(productToDelete);
      expect(productModel.findByIdAndDelete).toHaveBeenCalledWith('1');
    });
  });
});
