import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsFormComponent } from './products-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SimpleChange, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('ProductsFormsComponent', () => {
  let component: ProductsFormComponent;
  let fixture: ComponentFixture<ProductsFormComponent>;
  const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['updateProduct', 'saveProduct']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let productsService: jasmine.SpyObj<ProductsService>;
  let router: jasmine.SpyObj<Router>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsFormComponent ],
      imports: [RouterTestingModule,HttpClientTestingModule,ReactiveFormsModule ],
      providers:[
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: Router, useValue: routerSpy },
      ]
    })
    .compileComponents();
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    fixture = TestBed.createComponent(ProductsFormComponent);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form values',()=>{
     component.ngOnInit();
     const form = component.productForm.value;
     expect(form).toEqual({ name:'', id:'', description:'', logo:'', date_release:''})
  })

  it('should call setPreviusValues when enters in ngOnChanges',()=>{
    const spy = spyOn(component,'setPreviusValues');
    const changes: SimpleChanges = {
      someProperty: new SimpleChange(null, 'newValue', true)
    };
    component.ngOnChanges(changes);
    expect(spy).toHaveBeenCalled();
  })

  it('should call unsubscribe on ngOnDestroy', () => {
    let unsubscribeSpy;
    if(component.dateRealeaseSubscription)
      unsubscribeSpy = spyOn(component.dateRealeaseSubscription, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should update form values',()=>{
    component.ngOnInit();

    component.currentValues = { name:'abc',id:'25', description:'tatata', logo:'bu',
                                date_release:new Date('2024-12-12'),date_revision:new Date('2025-12-12')}
    component.setPreviusValues();
    const form = component.productForm.value;
    expect(form).toEqual({ name:'abc', description:'tatata', logo:'bu', date_release:new Date('2024-12-12')}) 
    const idInput = component.productForm.get("id");

    expect(idInput?.status).toBe('DISABLED');
  })

  it('should update date_revision when date_release changes', () => {
    const dateReleaseControl = component.productForm.get('date_release');
    const dateRevisionControl = component.productForm.get('date_revision');
    
    const initialDate = new Date();
    const expectedDate = new Date(initialDate);
    expectedDate.setFullYear(expectedDate.getFullYear() + 1);

    dateReleaseControl?.setValue(initialDate.toISOString().split('T')[0]);
    component.fliberancionHandler();

    expect(dateRevisionControl?.value).toBe(expectedDate.toISOString().split('T')[0]);
  });

  it('should reset values',()=>{
    component.ngOnInit();
    component.currentValues = { name:'abc',id:'25', description:'tatata', logo:'bu',
    date_release:new Date('2024-12-12'),date_revision:new Date('2025-12-12')}
    component.setPreviusValues();
    component.reset();
    component.productForm.get('id')?.enable()
    const form = component.productForm.value;
    expect(form).toEqual({ id:'25',name:'', description:'', logo:'', date_release:null}) 
  })

  describe('submit',()=>{
    it('should  call updateProduct due to component has currentValues',async()=>{
        component.currentValues = { name:'abc',id:'25', description:'tatata', logo:'bu',
        date_release:new Date('2024-12-12'),date_revision:new Date('2025-12-12')}

        productsService.updateProduct.and.returnValue(of({}));
        await component.onSubmit();
        expect(productsService.updateProduct).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/products']);
    })
    it('should  call saveProduct due to component has not currentValues',async()=>{
 
      productsService.saveProduct.and.returnValue(of({}));
      await component.onSubmit();
      expect(productsService.saveProduct).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/products']);
  })
  })
});
