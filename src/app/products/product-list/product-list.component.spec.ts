import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { ProductsService } from '../services/products.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { firstValueFrom, of } from 'rxjs';
import { Product } from '../models/products.models';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productsService:ProductsService;

  const mockProducts:Product[]= [
    { id:'1',name: 'Product One', description: 'First product description',logo:'1',date_release:new Date('2023-12-11'),date_revision:new Date('2023-12-11') },
    { id:'2',name: 'Product Two', description: 'Second product description',logo:'1',date_release:new Date('2023-12-11'),date_revision:new Date('2023-12-11') },
    { id:'3',name: 'Another Product', description: 'Another description',logo:'1',date_release:new Date('2023-12-11'),date_revision:new Date('2023-12-11') },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      providers:[ProductsService
      ],
      imports: [RouterTestingModule,HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call update searchterm Subject',fakeAsync(()=>{
      component.onKeyUp('hola');
       expect(component.searchTerm$.getValue()).toBe('hola');
  }))

  it('should call refresh from product service,getProducts and get pagesNum$',async()=>{
     const spy1 = spyOn(productsService, 'getProducts');
     const spy2 = spyOn(productsService, 'refresh');
     let pagesNum$;
     component.ngOnInit();
     if(component.pagesNum$){
        pagesNum$ = await firstValueFrom(component.pagesNum$);
        expect(pagesNum$).toBe(5);
     }

     expect(spy1).toHaveBeenCalled();
     expect(spy2).toHaveBeenCalled();
  })

  it('should call unsubscribe on ngOnDestroy', () => {
    const unsubscribeSpy = spyOn(component.searchTerm$, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should return the id of the receive object',()=>{
    const result = component.trackByProductId(1,mockProducts[0]);
    expect(result).toBe('1');
  })

  it('should call search product when changeElementsXpage is call',async()=>{
    const spy1 = spyOn(productsService, 'searchProduct').and.returnValue(of([mockProducts[0]]));
    component.searchTerm$.next('bu')
    component.changeElementsXPage('1');
    let productList;
    if(component.productList$){
      productList = await (firstValueFrom(component.productList$));
      expect(productList.length).toBe(1);
    } 
    expect(spy1).toHaveBeenCalledWith('bu',1);  
  })

  it('should call search product when search is call',async()=>{
    const spy1 = spyOn(productsService, 'searchProduct').and.returnValue(of([mockProducts[0]]));
    component.search('bu');
    let productList;
    if(component.productList$){
      productList = await (firstValueFrom(component.productList$));
      expect(productList.length).toBe(1);
    } 
    expect(spy1).toHaveBeenCalledWith('bu');  
  })

  it('should set showMenu and call stopPropagation on the event', () => {
    const mockEvent = { stopPropagation: jasmine.createSpy('stopPropagation') } as unknown as MouseEvent;
    component.setShowMenu('testId', mockEvent);
    expect(component.showMenu).toBe('testId');
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });
});
