# 🚀 QUICK START GUIDE

## 📦 Installazione

```bash
# 1. Installa dipendenze
npm install

# 2. Avvia il server
npm start

# 3. Apri il browser
# Vai su: http://localhost:4200
```

---

## 📂 Struttura File Principali

### Core Component Files (i file che hai richiesto):
1. **[src/app/models/product.ts](src/app/models/product.ts)** - Interfaccia Product
2. **[src/app/components/product-list/product-list.component.ts](src/app/components/product-list/product-list.component.ts)** ✨ 
3. **[src/app/components/product-list/product-list.component.html](src/app/components/product-list/product-list.component.html)** ✨
4. **[src/app/components/product-list/product-list.component.css](src/app/components/product-list/product-list.component.css)** ✨

### Configuration Files:
- `angular.json` - Configurazione Angular CLI
- `tsconfig.json` - Configurazione TypeScript
- `package.json` - Dipendenze npm

### Documentation:
- `DOCUMENTATION.md` - Documentazione completa
- `IMPLEMENTATION_SUMMARY.md` - Riepilogo implementazione
- `EXTENSION_SNIPPETS.md` - Snippet per estensioni future

---

## 🎯 Caratteristiche Implementate

✅ **Interfaccia Product**
```typescript
interface Product {
  id?: number;
  name: string;
  price: number;
  description: string;
}
```

✅ **5 Prodotti Iniziali**
- Laptop Pro €1299.99
- Smartphone Ultra €899.99
- Auricolari Wireless €199.99
- Monitor 4K €599.99
- Tastiera Meccanica €149.99

✅ **Funzionalità**
- Visualizza con `*ngFor`
- Cliccabile e selezionabile
- Pulsante elimina per ogni prodotto
- EventEmitter al parent
- Gestione state selectedProduct

---

## 💻 Uso del Componente

### Nel parent template:
```html
<app-product-list
  [products]="products"
  (productSelected)="onProductSelected($event)"
  (productDeleted)="onProductDeleted($event)"
></app-product-list>
```

### Nel parent component:
```typescript
onProductSelected(product: Product): void {
  console.log('Selezionato:', product);
}

onProductDeleted(product: Product): void {
  console.log('Eliminato:', product);
}
```

---

## 🔧 Comandi Disponibili

```bash
# Avvia server di sviluppo
npm start

# Build per production
npm run build

# Esegui test
npm test

# Esegui test in watch mode
npm run test -- --watch

# Lint del codice
npm run lint
```

---

## 🧪 Test

```bash
# Run test
npm test

# Test con coverage
npm test -- --code-coverage
```

---

## 📱 Responsive Design

- Grid auto-responsive: 1 colonna su mobile, 2-3 su desktop
- Card che si adattano alla larghezza disponibile
- Hover effects per desktop
- Touch-friendly su mobile

---

## 🎨 Classe CSS e Stili

### Product Card:
- Default: bordo grigio, sfondo bianco
- Hover: bordo blu, ombra più marcata
- Selected: bordo verde, sfondo verde chiaro

### Button Delete:
- Background: rosso (#f44336)
- Hover: rosso scuro (#d32f2f)
- Click: rosso ancora più scuro (#c62828)

### Selected Indicator:
- Background: verde (#4caf50)
- Posizione: top-right
- Testo: "✓ Selezionato"

---

## 🔄 Event Flow

```
User clicks product
    ↓
selectProduct() called
    ↓
productSelected.emit(product)
    ↓
Parent receives event
Parent onProductSelected() triggered
```

```
User clicks delete button
    ↓
deleteProduct() called
    ↓
productDeleted.emit(product)
    ↓
Parent receives event
Parent onProductDeleted() triggered
```

---

## 📋 Metodi Componente

### `selectProduct(product: Product): void`
Seleziona un prodotto e emette l'evento

### `deleteProduct(index: number): void`
Elimina un prodotto e emette l'evento

### `isSelected(product: Product): boolean`
Verifica se un prodotto è selezionato

### `initializeProducts(): void` (private)
Carica 5 prodotti iniziali se l'array è vuoto

---

## 🌐 Property Binding & Event Binding

```html
<!-- Property Binding con [class.selected] -->
<div [class.selected]="isSelected(product)">

<!-- Event Binding con (click) -->
<div (click)="selectProduct(product)">

<!-- Event Binding con $event.stopPropagation() -->
<button (click)="deleteProduct(i); $event.stopPropagation()">

<!-- *ngFor con index -->
<div *ngFor="let product of products; let i = index">

<!-- *ngIf con negazione -->
<div *ngIf="products.length === 0">

<!-- Pipe di currency -->
{{ product.price | currency: 'EUR' }}
```

---

## 🐛 Debugging

### Console Logs
I metodi sono già dotati di console.log utili per tracking

### Nel browser DevTools:
1. Apri la console (F12)
2. Clicca su un prodotto → vedi il log di selezione
3. Clicca elimina → vedi il log di eliminazione

---

## 🚨 Troubleshooting

### Prodotti non compaiono?
- Controlla che `products` array non sia vuoto nel parent
- Verifica che CommonModule sia importato in app.module.ts

### Click non funziona?
- Controlla la console per errori
- Verifica che (click) sia scritto correttamente

### Stili non applicati?
- Controlla che product-list.component.css sia nello stesso folder
- Verifica il path in `styleUrls: ['./product-list.component.css']`

---

## 📖 File Documentazione

- **DOCUMENTATION.md** - Guida completa e dettagliata
- **IMPLEMENTATION_SUMMARY.md** - Riepilogo di tout ciò che è stato fatto
- **EXTENSION_SNIPPETS.md** - Idee e snippet per estensioni future
- **QUICK_START.md** - Questa guida

---

## ✨ Prossimi Passi Opzionali

Vedi `EXTENSION_SNIPPETS.md` per aggiungere:
- 🔍 Filtro di ricerca
- 📊 Ordinamento
- 🛒 Carrello e quantità
- ⭐ Sistema di rating
- 📑 Paginazione
- 💜 Lista preferiti
- ➕ Form creazione prodotto
- 💾 Persistenza con localStorage
- ✨ Animazioni

---

**Sei pronto per partire! 🚀**

Apri il terminale e digita: `npm start`
