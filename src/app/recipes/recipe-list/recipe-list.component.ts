import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  template: `
  
    <div class="row">
      <div class="col-xs-12">
        <button class="btn btn-success" (click)="onNewRecipe()">
          New Recipe
        </button>
      </div>
    </div>
    <hr>
    <app-loading-spinner *ngIf="loading" />
    <div class="row">
      <div class="col-xs-12">
        <app-recipe-item
          *ngFor="let recipeElement of recipes let i = index"
          [recipe]="recipeElement"
          [index]="i"
        />
      </div>
    </div>
  `
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  subscription: Subscription;
  loading: boolean = false;

  constructor(
    private recipeService: RecipesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataStorageService: DataStorageService
    ) {}

  ngOnInit(): void { 

    this.subscription = this.recipeService.recipesChanged
      .subscribe( recipes => this.recipes = recipes );

    this.recipes = this.recipeService.getRecipes();

    this.loading = true;
    this.dataStorageService.fetchRecipes()
      .subscribe({ next: () => this.loading = false });
  }

  onNewRecipe(): void {
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
