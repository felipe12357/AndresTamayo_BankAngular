import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/products.models';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {

  productId!: string;
  product?:Product;
  constructor(private route: ActivatedRoute,private productsService:ProductsService) { }

  async ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    this.product= await firstValueFrom(this.productsService.searchProductById(this.productId));
  }
}
