import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail-component',
  imports: [CommonModule],
  templateUrl: './product-detail-component.html',
  styleUrls: ['./product-detail-component.css'],
})
export class ProductDetailComponent {
  @Input() product: Product | null = null;
}
