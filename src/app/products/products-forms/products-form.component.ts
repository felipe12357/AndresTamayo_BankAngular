import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { uniqueIdValidator } from 'src/app/utils/validators';
import { ProductsService } from '../services/products.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { Product } from '../models/products.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-forms',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit, OnDestroy {

  productForm!: FormGroup;
  mindate?:string;
  dateRealeaseSubscription?:Subscription;

  @Input() currentValues?: Product;

  constructor(private productsService: ProductsService,private router:Router) {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-CA');
    this.mindate = formatter.format(now);
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      id: new FormControl('', [Validators.required,Validators.minLength(5),Validators.maxLength(10)],
                              [uniqueIdValidator(this.productsService)]),
      name: new FormControl('', [Validators.required,Validators.minLength(5),Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(200)]),
      logo: new FormControl('', [Validators.required]),
      date_release:new FormControl('',[Validators.required]),
      date_revision: new FormControl({ value: '', disabled: true })
    });

    this.fliberancionHandler();
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.setPreviusValues();
  }

  ngOnDestroy(): void {
    this.dateRealeaseSubscription?.unsubscribe();
  }

  setPreviusValues(){
    if(this.currentValues){
      const {id,name,description,logo,date_release,date_revision} = this.currentValues;
      this.productForm.setValue({ id, name, description, logo, date_release, date_revision })
 
      const idControl = this.productForm.get("id");
      if (idControl)
        idControl.disable();
    }
  }

  fliberancionHandler(){
    this.productForm.get("date_revision")?.disabled;

    this.dateRealeaseSubscription = this.productForm.get("date_release")?.valueChanges.subscribe(val =>{
      const date = new Date(val);
      date.setFullYear(date.getFullYear() + 1);
      this.productForm.get('date_revision')?.setValue(date.toISOString().split('T')[0]);
    })
  }

  reset(){
    this.productForm.get('date_revision')?.enable();
    this.productForm.setValue({ id:'', name:'', description:'', logo:'', date_release:'', date_revision:'' })

    this.productForm.get('date_revision')?.disable();

    if(this.currentValues){
      this.productForm.get('id')?.setValue(this.currentValues.id);
    }
  }

  async onSubmit(){
    this.productForm.get('date_revision')?.enable();

    if(this.currentValues){
      this.productForm.get('id')?.enable();
      await firstValueFrom( this.productsService.updateProduct(this.productForm.value));
    }
    else 
      await firstValueFrom( this.productsService.saveProduct(this.productForm.value));
      
    this.router.navigate(['/products']);
  }

}
