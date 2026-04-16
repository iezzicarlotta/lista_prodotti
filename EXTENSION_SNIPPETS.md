# 🔧 Snippet di Estensione

## 1. Aggiungere Filtro Prodotti

### Nel componente:
```typescript
searchTerm: string = '';

getFilteredProducts(): Product[] {
  if (!this.searchTerm) {
    return this.products;
  }
  return this.products.filter(p =>
    p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}
```

### Nel template:
```html
<input
  type="text"
  [(ngModel)]="searchTerm"
  placeholder="Cerca prodotti..."
  class="search-input"
/>

<div *ngFor="let product of getFilteredProducts()">
  <!-- prodotto -->
</div>
```

---

## 2. Aggiungere Ordinamento

### Nel componente:
```typescript
sortBy: 'name' | 'price' = 'name';

getSortedProducts(): Product[] {
  const products = [...this.products];
  
  if (this.sortBy === 'name') {
    return products.sort((a, b) => a.name.localeCompare(b.name));
  } else if (this.sortBy === 'price') {
    return products.sort((a, b) => a.price - b.price);
  }
  return products;
}
```

### Nel template:
```html
<select [(ngModel)]="sortBy" class="sort-select">
  <option value="name">Ordina per Nome</option>
  <option value="price">Ordina per Prezzo</option>
</select>

<div *ngFor="let product of getSortedProducts()">
  <!-- prodotto -->
</div>
```

---

## 3. Aggiungere Quantità e Carrello

### Nel componente:
```typescript
interface CartItem extends Product {
  quantity: number;
}

cart: CartItem[] = [];

addToCart(product: Product): void {
  const existingItem = this.cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    this.cart.push({ ...product, quantity: 1 });
  }
}

getTotalPrice(): number {
  return this.cart.reduce((total, item) => 
    total + (item.price * item.quantity), 0
  );
}
```

### Nel template:
```html
<button
  class="btn-add-cart"
  (click)="addToCart(product); $event.stopPropagation()"
>
  🛒 Aggiungi al Carrello
</button>

<div class="cart" *ngIf="cart.length > 0">
  <h3>Carrello ({{ cart.length }} articoli)</h3>
  <p>Totale: {{ getTotalPrice() | currency: 'EUR' }}</p>
</div>
```

---

## 4. Aggiungere Valutazione (Rating)

### Nel modello:
```typescript
export interface Product {
  id?: number;
  name: string;
  price: number;
  description: string;
  rating?: number; // da 1 a 5
  reviews?: number;
}
```

### Nel componente:
```typescript
setRating(product: Product, rating: number): void {
  product.rating = rating;
  console.log(`${product.name} valutato: ${rating} stelle`);
}
```

### Nel template:
```html
<div class="rating" *ngIf="product.rating">
  <span *ngFor="let i of [1,2,3,4,5]" 
    class="star"
    [class.filled]="i <= product.rating"
    (click)="setRating(product, i)">
    ★
  </span>
</div>
```

---

## 5. Aggiungere Categorie

### Nel modello:
```typescript
export interface Product {
  id?: number;
  name: string;
  price: number;
  description: string;
  category: string;
}
```

### Nel componente:
```typescript
categories: string[] = [];

ngOnInit(): void {
  this.initializeProducts();
  this.extractCategories();
}

private extractCategories(): void {
  this.categories = [...new Set(this.products.map(p => p.category))];
}

filterByCategory(category: string): Product[] {
  return this.products.filter(p => p.category === category);
}
```

### Nel template:
```html
<div class="categories">
  <button
    *ngFor="let category of categories"
    (click)="selectedCategory = category"
    [class.active]="selectedCategory === category"
  >
    {{ category }}
  </button>
</div>

<div *ngFor="let product of filterByCategory(selectedCategory)">
  <!-- prodotto -->
</div>
```

---

## 6. Aggiungere Paginazione

### Nel componente:
```typescript
pageSize: number = 3;
currentPage: number = 1;

getPagedProducts(): Product[] {
  const start = (this.currentPage - 1) * this.pageSize;
  return this.products.slice(start, start + this.pageSize);
}

getTotalPages(): number {
  return Math.ceil(this.products.length / this.pageSize);
}

nextPage(): void {
  if (this.currentPage < this.getTotalPages()) {
    this.currentPage++;
  }
}

previousPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}
```

### Nel template:
```html
<div *ngFor="let product of getPagedProducts()">
  <!-- prodotto -->
</div>

<div class="pagination">
  <button (click)="previousPage()" [disabled]="currentPage === 1">← Precedente</button>
  <span>Pagina {{ currentPage }} di {{ getTotalPages() }}</span>
  <button (click)="nextPage()" [disabled]="currentPage === getTotalPages()">Successiva →</button>
</div>
```

---

## 7. Aggiungere Preferiti (Wishlist)

### Nel componente:
```typescript
favorites: Set<number> = new Set();

toggleFavorite(product: Product): void {
  if (product.id !== undefined) {
    if (this.favorites.has(product.id)) {
      this.favorites.delete(product.id);
    } else {
      this.favorites.add(product.id);
    }
  }
}

isFavorite(product: Product): boolean {
  return product.id !== undefined && this.favorites.has(product.id);
}
```

### Nel template:
```html
<button
  class="btn-favorite"
  [class.favorited]="isFavorite(product)"
  (click)="toggleFavorite(product); $event.stopPropagation()"
>
  {{ isFavorite(product) ? '❤️' : '🤍' }}
</button>
```

---

## 8. Aggiungere Form di Creazione Prodotto

### Nel componente (con Reactive Forms):
```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

productForm: FormGroup;

constructor(private fb: FormBuilder) {
  this.productForm = this.fb.group({
    name: ['', Validators.required],
    price: ['', [Validators.required, Validators.min(0)]],
    description: ['', Validators.required]
  });
}

addNewProduct(): void {
  if (this.productForm.valid) {
    const newProduct: Product = {
      id: Math.max(...this.products.map(p => p.id || 0), 0) + 1,
      ...this.productForm.value
    };
    this.products.push(newProduct);
    this.productForm.reset();
  }
}
```

### Nel template:
```html
<form [formGroup]="productForm" (ngSubmit)="addNewProduct()">
  <input formControlName="name" placeholder="Nome prodotto" />
  <input formControlName="price" type="number" placeholder="Prezzo" />
  <textarea formControlName="description" placeholder="Descrizione"></textarea>
  <button type="submit" [disabled]="!productForm.valid">Aggiungi Prodotto</button>
</form>
```

---

## 9. Aggiungere LocalStorage (Persistenza)

### Nel componente:
```typescript
private storageKey = 'products-list';

ngOnInit(): void {
  this.loadFromStorage();
}

private loadFromStorage(): void {
  const stored = localStorage.getItem(this.storageKey);
  if (stored) {
    this.products = JSON.parse(stored);
  } else {
    this.initializeProducts();
  }
}

private saveToStorage(): void {
  localStorage.setItem(this.storageKey, JSON.stringify(this.products));
}

deleteProduct(index: number): void {
  if (index >= 0 && index < this.products.length) {
    const deletedProduct = this.products[index];
    this.products.splice(index, 1);
    this.saveToStorage(); // Salva dopo eliminazione
    this.productDeleted.emit(deletedProduct);
  }
}
```

---

## 10. Aggiungere Animazioni

### Nel modulo:
```typescript
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule // Aggiungi questa riga
  ]
})
export class AppModule { }
```

### Nel componente:
```typescript
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ProductListComponent { }
```

### Nel template:
```html
<div @fadeInOut *ngFor="let product of products">
  <!-- prodotto -->
</div>
```

---

Questi snippet possono essere integrati nel componente per aggiungere nuove funzionalità! 🚀
