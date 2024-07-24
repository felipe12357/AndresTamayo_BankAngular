import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'products' },
    {
      path: 'products',
      loadChildren: () =>
        import('./products/products.module').then((m) => m.ProductsModule),
    }
  ];