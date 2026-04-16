import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor() {}

  ngOnInit(): void {
    this.initializeProducts();
  }

  /**
   * Inizializza l'array di prodotti
   */
  private initializeProducts(): void {
    this.products = [
      {
        id: 1,
        name: 'Laptop Pro',
        price: 1299.99,
        description: 'Potente laptop per professionisti con processore Intel i9'
      },
      {
        id: 2,
        name: 'Smartphone Ultra',
        price: 899.99,
        description: 'Smartphone di ultima generazione con display AMOLED'
      },
      {
        id: 3,
        name: 'Auricolari Wireless',
        price: 199.99,
        description: 'Auricolari con cancellazione del rumore e batteria 48h'
      },
      {
        id: 4,
        name: 'Monitor 4K',
        price: 599.99,
        description: 'Monitor 4K da 32 pollici con colori vividi'
      },
      {
        id: 5,
        name: 'Tastiera Meccanica',
        price: 149.99,
        description: 'Tastiera meccanica RGB per gaming e produttività'
      }
    ];
  }
}
