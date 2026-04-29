import { CommonModule } from '@angular/common'; // Importa il modulo base Angular (ngIf, ngFor, ecc.)
import { Component } from '@angular/core'; // Importa il decoratore per definire un componente
import { FormsModule, NgForm } from '@angular/forms'; // Importa il supporto per i form template-driven e il tipo NgForm
import { Product } from '../product'; // Importa l'interfaccia/type Product
import { ProductDetailComponent } from '../product-detail-component/product-detail-component'; // Importa il componente figlio per il dettaglio prodotto

@Component({
  selector: 'app-product-list-component', // Nome del tag HTML del componente
  imports: [CommonModule, FormsModule, ProductDetailComponent], // Moduli e componenti utilizzabili nel template
  templateUrl: './product-list-component.html', // Percorso del file HTML associato
  styleUrls: ['./product-list-component.css'], // Percorso del file CSS associato
})
export class ProductListComponent { // Definizione della classe del componente

  products: Product[] = [ // Array di prodotti tipizzato con Product
    {
      name: 'Laptop Pro 14', // Nome del prodotto
      price: 1299, // Prezzo del prodotto
      description: 'Laptop leggero con ottime prestazioni per lavoro e studio.', // Descrizione
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

  newProduct: { // Oggetto che rappresenta i dati del form per un nuovo prodotto
    name: string; // Nome del prodotto
    price: number | null; // Prezzo (può essere null se non inserito)
    description: string; // Descrizione
  } = {
    name: '', // Valore iniziale vuoto per il nome
    price: null, // Valore iniziale null per il prezzo
    description: '', // Valore iniziale vuoto per la descrizione
  };

  selectedProduct: Product | null = null; // Prodotto selezionato (null se nessuno selezionato)

  addProduct(form: NgForm): void { // Metodo chiamato al submit del form
    if (form.invalid || this.newProduct.price === null) { // Controlla se il form è invalido o il prezzo è null
      return; // Esce dal metodo se i dati non sono validi
    }

    const name = this.newProduct.name.trim();  // Rimuove spazi iniziali/finali dal nome
    const description = this.newProduct.description.trim(); // Rimuove spazi iniziali/finali dalla descrizione

    if (!name || !description) { // Controlla se nome o descrizione sono vuoti
      return; // Esce se non validi
    }

    const product: Product = { // Crea un nuovo oggetto prodotto
      name, // Assegna il nome
      price: Number(this.newProduct.price), // Converte il prezzo in numero
      description, // Assegna la descrizione
    };

    this.products = [...this.products, product]; // Aggiunge il nuovo prodotto creando un nuovo array (immutabilità)
    form.resetForm({ name: '', price: null, description: '' }); // Reset del form con valori iniziali
  }

  selectProduct(product: Product): void { // Metodo chiamato quando si clicca un prodotto
    this.selectedProduct = product; // Imposta il prodotto selezionato
  }

  removeProduct(productToRemove: Product, event: MouseEvent): void { // Metodo per rimuovere un prodotto
    event.stopPropagation(); // Impedisce che il click attivi anche altri eventi (es. selezione)

    this.products = this.products.filter((product) => product !== productToRemove); // Rimuove il prodotto filtrando l'array

    if (this.selectedProduct === productToRemove) { // Controlla se il prodotto rimosso era selezionato
      this.selectedProduct = null; // Deseleziona il prodotto
    }
  }
}