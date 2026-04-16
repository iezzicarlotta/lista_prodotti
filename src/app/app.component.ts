import { Component } from '@angular/core';
import { Product } from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Product List App';
  products: Product[] = [];
  lastAction = '';

  /**
   * Gestisce l'evento di selezione prodotto dal child component
   * @param product - Il prodotto selezionato
   */
  onProductSelected(product: Product): void {
    console.log('Prodotto selezionato dal parent:', product);
    this.lastAction = `Prodotto selezionato: ${product.name}`;
  }

  /**
   * Gestisce l'evento di eliminazione prodotto dal child component
   * @param product - Il prodotto eliminato
   */
  onProductDeleted(product: Product): void {
    console.log('Prodotto eliminato dal parent:', product);
    this.lastAction = `Prodotto eliminato: ${product.name}`;
  }
}
