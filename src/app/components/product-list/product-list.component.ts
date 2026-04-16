import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[] = [];
  @Output() productSelected = new EventEmitter<Product>();
  @Output() productDeleted = new EventEmitter<Product>();

  selectedProduct: Product | null = null;

  constructor() {}

  ngOnInit(): void {
    this.initializeProducts();
  }

  /**
   * Inizializza l'array di prodotti se vuoto
   */
  private initializeProducts(): void {
    if (this.products.length === 0) {
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

  /**
   * Seleziona un prodotto e emette l'evento al parent
   * @param product - Il prodotto da selezionare
   */
  selectProduct(product: Product): void {
    this.selectedProduct = product;
    this.productSelected.emit(product);
  }

  /**
   * Elimina un prodotto dall'array e emette l'evento al parent
   * @param index - Indice del prodotto da eliminare
   */
  deleteProduct(index: number): void {
    if (index >= 0 && index < this.products.length) {
      const deletedProduct = this.products[index];
      this.products.splice(index, 1);
      this.productDeleted.emit(deletedProduct);

      // Se il prodotto eliminato era selezionato, deseleziona
      if (this.selectedProduct === deletedProduct) {
        this.selectedProduct = null;
      }
    }
  }

  /**
   * Verifica se un prodotto è attualmente selezionato
   * @param product - Il prodotto da verificare
   * @returns true se il prodotto è selezionato
   */
  isSelected(product: Product): boolean {
    return this.selectedProduct === product;
  }
}
