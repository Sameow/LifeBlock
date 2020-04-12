import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerStackPage } from './owner-stack.page';

const routes: Routes = [
  {
    path: 'owner',
    component: OwnerStackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnerStackPageRoutingModule {}
