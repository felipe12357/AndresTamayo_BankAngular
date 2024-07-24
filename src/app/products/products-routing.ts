import { RouterModule, Routes } from "@angular/router";
import { ProductListComponent } from "./product-list/product-list.component";
import { NgModule } from "@angular/core";
import { CreateProductComponent } from "./create-product/create-product.component";
import { UpdateProductComponent } from "./update-product/update-product.component";

const routes: Routes = [
      { path: '', component: ProductListComponent},
      { path: 'create-product', component: CreateProductComponent },
      { path: 'update-product/:id', component: UpdateProductComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductsRoutingModule {}