import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { firstValueFrom, of } from 'rxjs';
import { Product, ProductsDTO } from '../models/products.models';


describe('ProductsServiceService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;


  const mockProducts:Product[]= [
    { id:'1',name: 'Product One', description: 'First product description',logo:'1',date_release:new Date('2023-12-11'),date_revision:new Date('2023-12-11') },
    { id:'2',name: 'Product Two', description: 'Second product description',logo:'1',date_release:new Date('2023-12-11'),date_revision:new Date('2023-12-11') },
    { id:'3',name: 'Another Product', description: 'Another description',logo:'1',date_release:new Date('2023-12-11'),date_revision:new Date('2023-12-11') },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search elements from the exist',async()=>{
    service.productList = of(mockProducts);
    const result = await (firstValueFrom( service.searchProduct('Another') ));
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('3');
  })

  it('should return the product by id',async()=>{
    service.productList = of(mockProducts);
    const result = await (firstValueFrom( service.searchProductById('2') ));
    expect(result.name).toBe('Product Two');
    expect(result.id).toBe('2');
  })

  it('should load products and map response', async() => {
    const mockResponse: ProductsDTO = {
      data: mockProducts
    };
    const URL = 'http://localhost:3002/bp/products';

    const promise = firstValueFrom( service.loadProducts() );

    const req = httpMock.expectOne(URL);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    const products = await promise;
    expect(products.length).toBe(3);
    expect(products[0].name).toBe('Product One');
    expect(products[1].name).toBe('Product Two');
  });

  it('should call load method when refresh is used',()=>{
    service.productList.subscribe();
    spyOn(service, 'loadProducts').and.returnValue(of([]));
    service.refresh();
    expect(service.loadProducts).toHaveBeenCalled();
  })

  it('should call /products/verification/ url with the id send',async()=>{
      const URL = 'http://localhost:3002/bp/products/verification/hola';
      const promise = firstValueFrom( service.checkId('hola'));
      const req = httpMock.expectOne(URL);
      expect(req.request.method).toBe('GET');
      req.flush('');
      await(promise);
      expect(req.request.url).toBe(URL);
  })

  it('should call delete method and with specific url',async()=>{
      const URL = 'http://localhost:3002/bp/products/hola';
      const promise = firstValueFrom( service.deleteProduct('hola'));
      const req = httpMock.expectOne(URL);
      expect(req.request.method).toBe('DELETE');
      req.flush('');
      await(promise);
      expect(req.request.url).toBe(URL);
  })

  it('should call put method and with specific url',async()=>{
    const URL = 'http://localhost:3002/bp/products/1';
    const promise = firstValueFrom( service.updateProduct(mockProducts[0]));
    const req = httpMock.expectOne(URL);
    expect(req.request.method).toBe('PUT');
    req.flush('');
    await(promise);
    expect(req.request.url).toBe(URL);
    const resultObj ={
      name: 'Product One', 
      description: 'First product description',logo:'1',
      date_release:new Date('2023-12-11'),
      date_revision:new Date('2023-12-11')
    }
    expect(req.request.body).toEqual(resultObj)

  })

  it('should call POST method and with specific url',async()=>{
    const URL = 'http://localhost:3002/bp/products';
    const promise = firstValueFrom( service.saveProduct(mockProducts[1]));
    const req = httpMock.expectOne(URL);
    expect(req.request.method).toBe('POST');
    req.flush('');
    await(promise);
    expect(req.request.url).toBe(URL);
    expect(req.request.body).toEqual(mockProducts[1])
  })

  it('should get products according to de elementsXpage params',async()=>{
    service.productList = of(mockProducts);
    const result = await (firstValueFrom( service.getProducts(2) ));
    expect(result.length).toBe(2);
  })

});
