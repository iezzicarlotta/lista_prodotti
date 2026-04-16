import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { Product } from '../../models/product';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with 5 products', () => {
    expect(component.products.length).toBe(5);
  });

  it('should select a product when selectProduct is called', () => {
    const product: Product = component.products[0];
    spyOn(component.productSelected, 'emit');

    component.selectProduct(product);

    expect(component.selectedProduct).toBe(product);
    expect(component.productSelected.emit).toHaveBeenCalledWith(product);
  });

  it('should delete a product when deleteProduct is called', () => {
    const initialLength = component.products.length;
    const deletedProduct = component.products[0];
    spyOn(component.productDeleted, 'emit');

    component.deleteProduct(0);

    expect(component.products.length).toBe(initialLength - 1);
    expect(component.productDeleted.emit).toHaveBeenCalledWith(deletedProduct);
  });

  it('should clear selection when selected product is deleted', () => {
    const product = component.products[0];
    component.selectProduct(product);
    expect(component.selectedProduct).toBe(product);

    component.deleteProduct(0);

    expect(component.selectedProduct).toBeNull();
  });

  it('should identify selected product correctly', () => {
    const product = component.products[0];
    component.selectProduct(product);

    expect(component.isSelected(product)).toBe(true);
    expect(component.isSelected(component.products[0])).toBe(false);
  });

  it('should not delete product at out-of-bounds index', () => {
    const initialLength = component.products.length;
    component.deleteProduct(999);

    expect(component.products.length).toBe(initialLength);
  });
});
