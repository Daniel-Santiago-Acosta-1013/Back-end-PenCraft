// product.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../services/product.service';
import { Model } from 'mongoose';
import { Product } from '../schemas/product.schema';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import * as mongoose from 'mongoose';

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

      jest
        .spyOn(productModel.prototype, 'save')
        .mockResolvedValue(createdProduct);

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
  
      jest.spyOn(productModel, 'find').mockImplementation(() =>
        ({
          exec: jest.fn().mockResolvedValue(products),
        } as unknown as mongoose.Query<Product[], Product>),
      );
  
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

      jest.spyOn(productModel, 'findById').mockResolvedValue(product);

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

      jest
        .spyOn(productModel, 'findByIdAndUpdate')
        .mockResolvedValue(updatedProduct);
      jest.spyOn(productModel, 'findById').mockResolvedValue(updatedProduct);

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
  
      jest.spyOn(productModel, 'findByIdAndDelete').mockResolvedValue(productToDelete as any);
  
      const result = await productService.delete('1');
      expect(result).toEqual(productToDelete);
      expect(productModel.findByIdAndDelete).toHaveBeenCalledWith('1');
    });
  });
  
  
});
