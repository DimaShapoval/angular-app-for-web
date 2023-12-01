import { Component } from '@angular/core';
import { CalculatorComponent } from './calculator/calculator.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CalculatorComponent,
    RouterOutlet,
    CommonModule,
  ],
  template: `
    <div class="sorting-options">
        <button (click)="sortProducts('price')">Sort by Price</button>
        <button (click)="sortProducts('name')">Sort by Name</button>
        <button (click)="sortProducts('rating')">Sort by Rating</button>
      </div>

      <div class="products">
        <div class="product" *ngFor="let product of sortedProducts">
          <h2>{{ product.title }}</h2>
          <span class="price">{{ product.price }}</span>
          <img [src]="product.image" class="product-image">
          <span class="rating">Rating:{{ product.rating.rate }}</span>
        </div>
      </div>

    <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = "First"

  public products: any;
  public sortedProducts: any[] = [];

  sortDirection: { [key: string]: string } = {};

  public ngOnInit() {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        this.products = json
        console.log(this.products)

        this.sortedProducts = [...this.products]
        console.log(this.sortedProducts)
      })
  }

  public sortProducts(parameter: string) {
    this.sortDirection[parameter] = this.sortDirection[parameter] === 'asc' ? 'desc' : 'asc';

    this.sortedProducts.sort((a, b) => {
      const modifier = this.sortDirection[parameter] === 'asc' ? 1 : -1;

      switch (parameter) {
        case 'price':
          return (a.price - b.price) * modifier;
        case 'name':
          return a.title.localeCompare(b.title) * modifier;
        case 'rating':
          return (b.rating.rate - a.rating.rate) * modifier;
        default:
          return 0;
      }
    });
  }
}
