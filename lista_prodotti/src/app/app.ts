import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list-component/product-list-component';
import { ProductDetailComponent } from './product-detail-component/product-detail-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductListComponent, ProductDetailComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('lista_prodotti');
}
