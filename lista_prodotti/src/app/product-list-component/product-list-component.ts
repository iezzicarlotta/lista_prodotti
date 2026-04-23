import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail-component/product-detail-component';

@Component({
  selector: 'app-product-list-component',
  imports: [CommonModule, FormsModule, ProductDetailComponent],
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

  newProduct: {
    name: string;
    price: number | null;
    description: string;
  } = {
    name: '',
    price: null,
    description: '',
  };

  selectedProduct: Product | null = null;

  addProduct(form: NgForm): void {
    if (form.invalid || this.newProduct.price === null) {
      return;
    }

    const name = this.newProduct.name.trim();
    const description = this.newProduct.description.trim();

    if (!name || !description) {
      return;
    }

    const product: Product = {
      name,
      price: Number(this.newProduct.price),
      description,
    };

    this.products = [...this.products, product];
    form.resetForm({ name: '', price: null, description: '' });
  }

  selectProduct(product: Product): void {
    this.selectedProduct = product;
  }

  removeProduct(productToRemove: Product, event: MouseEvent): void {
    event.stopPropagation();
    this.products = this.products.filter((product) => product !== productToRemove);

    if (this.selectedProduct === productToRemove) {
      this.selectedProduct = null;
    }
  }
}
