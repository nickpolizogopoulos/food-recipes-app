import { Component, Input } from '@angular/core';

import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  template: `
  
    <div style="margin-bottom: 8px;">
      <a class="list-group-item clearfix pointer" [routerLink]="[index]">
          <div class="pull-left">
              <p class="lead">{{ recipe.name }}</p>
              <p class="list-group-item-text">{{ recipe.description }}</p>
          </div>
          <span class="pull-right">
              <img
                [src]=" recipe.imagePath "alt="{{ recipe.name }}"
                class="img-responsive" style="max-width: 180px;"
              >
          </span>
      </a>
    </div>
  `,
  styles: [`
    
    @media screen and (max-width: 550px) {
      .pull-right {
        margin-top: 20px;
      }
    }
    
  `]
})
export class RecipeItemComponent {

  @Input() recipe: Recipe;
  @Input() index: number;

}
