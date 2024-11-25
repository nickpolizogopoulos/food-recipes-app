import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';

const route: Routes = [
  {
    path: '',
    component: AuthComponent
  }
];

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(route)
  ]
})
export class AuthModule {}