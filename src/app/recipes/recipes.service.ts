import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable({
    providedIn: 'root'
})
export class RecipesService {

    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
        
    //     new Recipe(
    //         'French fries',
    //         'French fries with mayonnaise sauce.',
    //         'https://images.themodernproper.com/billowy-turkey/production/posts/2022/Homemade-French-Fries_8.jpg?w=960&h=540&q=82&fm=jpg&fit=crop&dm=1662474181&s=df605b62c9fee026dcef2c0301541888',
    //         [
    //             new Ingredient('Potatoes', 3),
    //             new Ingredient('Olive Oil', 1),
    //             new Ingredient('Oregano', 1),
    //             new Ingredient('Salt', 1),
    //             new Ingredient('Mayonnaise', 1),
    //         ]
    //     ),

    //     new Recipe(
    //         'Greek Souvlaki',
    //         'Ten pieces of pork souvlaki.',
    //         'https://dimosio.gr/wp-content/uploads/2022/05/souvlaki-mylo.jpg',
    //         [
    //             new Ingredient('Souvlaki', 10),
    //             new Ingredient('Olive Oil', 1),
    //             new Ingredient('Oregano', 1),
    //             new Ingredient('Salt', 1),
    //             new Ingredient('Lemons', 2),
    //         ]
    //     ),

    //     new Recipe(
    //         'Club Sandwich',
    //         'Turkey or Ham club sandwich.',
    //         'https://live.staticflickr.com/3915/14446773531_088a072208_b.jpg',
    //         [
    //             new Ingredient('Sandwich Bread', 12),
    //             new Ingredient('Turkey or Ham', 5),
    //             new Ingredient('Lettuce', 1),
    //             new Ingredient('Mayonnaise', 1),
    //             new Ingredient('French Fries', 15),
    //         ]
    //     ),
    // ];

    private recipes: Recipe[] = [];

    constructor(
        private shoppingListService: ShoppingListService
    ) { }

    setRecipes(recipes:Recipe[]):void {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice())
    }

    getRecipes():Recipe[] {
        return this.recipes.slice();
    }

    getRecipe(index:number):Recipe {
        return this.recipes[index];
    }

    addIngredientsToShoppingList( ingredients: Ingredient[] ):void {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe( recipe:Recipe ):void {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    
    updateRecipe( index:number, newRecipe:Recipe ):void {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe( index:number ):void {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}