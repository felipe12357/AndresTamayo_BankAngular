import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from './products-routing';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductsFormComponent } from './products-forms/products-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UpdateProductComponent } from './update-product/update-product.component';




@NgModule({
  declarations: [
    ProductListComponent,
    CreateProductComponent,
    ProductsFormComponent,
    UpdateProductComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule ,
    SharedModule
  ]
})
export class ProductsModule { }
