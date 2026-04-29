import { CommonModule } from '@angular/common'; // Importa il modulo base Angular (per direttive come ngIf, ngFor)
import { Component, Input } from '@angular/core'; // Importa il decoratore Component e Input per ricevere dati dal componente padre
import { Product } from '../product'; // Importa il tipo/interfaccia Product

@Component({
  selector: 'app-product-detail-component', // Nome del tag HTML per usare questo componente
  imports: [CommonModule], // Moduli necessari nel template (es. ngIf)
  templateUrl: './product-detail-component.html', // File HTML associato al componente
  styleUrls: ['./product-detail-component.css'], // File CSS associato
})
export class ProductDetailComponent { // Definizione della classe del componente

  @Input() product: Product | null = null; 
  // Proprietà in input dal componente padre
  // Può essere un Product oppure null (se nessun prodotto è selezionato)
}