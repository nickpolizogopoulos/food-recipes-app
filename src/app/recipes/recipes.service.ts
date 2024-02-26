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
    //     new Recipe(
    //         'Margherita Pizza',
    //         'Margherita pizza - 8 slices.',
    //         'https://www.5dollardinners.com/wp-content/uploads/2016/01/Chicken-Margherita-Pizza-from-5DollarDinners.jpg',
    //         [
    //             new Ingredient('Pizza dough', 1),
    //             new Ingredient('Tomato sauce', 1),
    //             new Ingredient('Sliced tomatoes', 2),
    //             new Ingredient('Mozzarella', 1),
    //         ]
    //     ),
    //     new Recipe(
    //         'Chef's Salad',
    //         'Classic Chef's Salad.',
    //         'https://www.allrecipes.com/thmb/Q84xeMgnOJPZAUOdNyrb9dbFZr4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/285625-ChefsSalad_MFS_006-2550ecee70ae46dbaec530a58314c99c.jpg',
    //         [
    //             new Ingredient('Chicken', 2),
    //             new Ingredient('Cheese', 1),
    //             new Ingredient('Eggs', 5),
    //             new Ingredient('Cucumber', 1),
    //             new Ingredient('Mayonnaise', 1),
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