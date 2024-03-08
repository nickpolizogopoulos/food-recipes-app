import { Component } from '@angular/core';

@Component({
  selector: 'app-recipe-start',
  template: `
  
    <ol class="lead">
      <li>
          <p>Select <u>Manage</u> at the top right and then Fetch Data.</p>
      </li>
      <li>
          <p>Once the recipe list is fetched, select a recipe to read, edit or delete from the recipe list.</p>
      </li>
      <li>
          <p>When you finish, select <u>Manage</u> and then <u>Save</u> to save the changes!</p>
      </li>
    </ol>
  
  `,
  styles: [``]
})
export class RecipeStartComponent {

}
