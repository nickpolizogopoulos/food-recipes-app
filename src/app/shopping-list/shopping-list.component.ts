import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  template: `
  
    <div class="row">
      <div class="col-xs-10">
        <app-shopping-edit></app-shopping-edit>
        <hr>
        <ul class="list-group">
          <a 
            style="cursor: pointer;"
            class="list-group-item"
            *ngFor="let ingredient of ingredients let i = index"
            (click)="onEditItem(i)"
          >
            {{ ingredient.name }} ({{ingredient.amount}})
          </a>
        </ul>
      </div>
    </div>
  
  `
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(
    private shoppingListService: ShoppingListService
  ) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChanged
        .subscribe( {
          next: (ingredients: Ingredient[]) => 
            this.ingredients = ingredients
        });
  }

  
  onEditItem( id: number ): void {
    this.shoppingListService.startedEditing.next(id);  
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  // onIngredientAdded( ingredient: Ingredient ) {
  //   this.ingredients.push(ingredient);
  // }
  
}
