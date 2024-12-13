import { Routes } from '@angular/router';

export const routes: Routes = [
  {

    path: '',
    loadComponent: () => import('./index/index.component'),

  },

  {
    path: 'list',
    loadComponent: () => import('./cliente-list/cliente-list.component'),

  },
  {
    path: 'new',
    loadComponent: () => import("./cliente-form/cliente-form.component"),

  },
  {
    path: 'list/:id/edit',
    loadComponent: () => import("./cliente-form/cliente-form.component"),

  },
  {
    path:'products',
    loadComponent: () => import("./product-form/product-form.component")
  },
  {
    path: 'venta',
    loadComponent: () => import("./venta/venta.component")
  },
  {
    path:'newProduct',
    loadComponent: () => import("./product-list/product-list.component")
  },
  {
    path: 'products/:id/edit',
    loadComponent: () => import("./product-list/product-list.component")
  }
];
