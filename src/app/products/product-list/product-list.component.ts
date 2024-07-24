import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, firstValueFrom, Observable, switchMap } from 'rxjs';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/products.models';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  productList$?:Observable<Product[]>;
  pagesNum$?:Observable<number>;
  searchTerm$ = new BehaviorSubject<string>('');
  showMenu="";

  constructor(private productsService:ProductsService) {
      this.searchTerm$.pipe( debounceTime(300), distinctUntilChanged(), 
        switchMap( (term) =>{ 
            this.search(term); 
            return '';
        }) 
      ).subscribe();
   }

  ngOnInit(): void {
    this.productsService.refresh();
    this.productList$ = this.productsService.getProducts();
    this.pagesNum$ = this.productsService.pagesNum$;
  }


  ngOnDestroy(): void {
    this.searchTerm$.unsubscribe();
  }

  trackByProductId(index: number, product: Product):string {
    return product.id;
  }

  changeElementsXPage(numElements:string){
    this.productList$ = this.productsService.searchProduct(this.searchTerm$.getValue(),parseInt(numElements),);
  }
  
  search(term:string){
    return this.productList$ = this.productsService.searchProduct(term);
  }

  setShowMenu(id:string,$event:MouseEvent){
    this.showMenu =id;
    $event.stopPropagation();
  }

  onKeyUp(value: string) {
    this.searchTerm$.next(value);
  }

  async deleteProduct(id:string){
    this.showMenu="";
    if(id){
      await firstValueFrom(this.productsService.deleteProduct(id));
      this.productsService.refresh();
    }

  }

}
