import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, map, take, tap } from 'rxjs';

import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private url: string = 'https://ng-course-food-application-default-rtdb.firebaseio.com/recipes.json';

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    // private authService:AuthService
  ) { }

  // *Storing Recipes without interceptor
  // storeRecipes() {
  //   const recipes = this.recipesService.getRecipes()
  //   return this.authService.user.pipe(
  //     take(1),
  //     exhaustMap( user => {
  //       const params = new HttpParams().set('auth', user.token);
  //       return this.http
  //         .put( this.url, recipes, {params: params} )
  //     })
  //     ).subscribe()
  // }

  // *Fetching Recipes without interceptor
  // fetchRecipes() {
  //   return this.authService.user.pipe(
  //     take(1),
  //     exhaustMap( user => {
  //       const params = new HttpParams().set('auth', user.token)
  //       return this.http
  //         .get <Recipe[]> (
  //           this.url,
  //           {params: params}
  //         )
  //     }),
  //     map( recipes => {
  //       return recipes.map(recipe => {
  //         return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
  //       })
  //     }),
  //     tap( recipes => this.recipesService.setRecipes(recipes) )
  //   ) 
  // }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    return this.http
      .put( this.url, recipes )
      .subscribe();
  }
  
  fetchRecipes() {
    return this.http
      .get <Recipe[]> ( this.url )
      .pipe(
        map( recipes => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
          })
        }),
        tap( recipes => this.recipesService.setRecipes(recipes) )
      );
  }


}
