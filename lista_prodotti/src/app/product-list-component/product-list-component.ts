import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail-component/product-detail-component';

@Component({
  selector: 'app-product-list-component',
  imports: [CommonModule, ProductDetailComponent],
  templateUrl: './product-list-component.html',
  styleUrl: './product-list-component.css',
})
export class ProductListComponent {
  products: Product[] = [
    {
      name: 'Laptop Pro 14',
      price: 1299,
      description: 'Laptop leggero con ottime prestazioni per lavoro e studio.',
    },
    {
      name: 'Mouse Wireless',
      price: 29.9,
      description: 'Mouse ergonomico senza fili con batteria di lunga durata.',
    },
    {
      name: 'Tastiera Meccanica',
      price: 89.5,
      description: 'Tastiera con switch meccanici e retroilluminazione.',
    },
    {
      name: 'Monitor 27" 4K',
      price: 349,
      description: 'Monitor ad alta risoluzione ideale per produttivita e media.',
    },
    {
      name: 'Cuffie Bluetooth',
      price: 79,
      description: 'Cuffie wireless con isolamento passivo del rumore.',
    },
  ];

  selectedProduct: Product | null = null;

  selectProduct(product: Product): void {
    this.selectedProduct = product;
  }
}
