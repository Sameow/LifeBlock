import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./1_login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./2_individual-stack/2.1_individual/individual.module').then( m => m.IndividualPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./3_institution-stack/3.1_institution/institution.module').then( m => m.InstitutionPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./4_owner-stack/owner-stack.module').then( m => m.OwnerStackPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
