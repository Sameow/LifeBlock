import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionPage } from './institution.page';

const routes: Routes = [
  {
    path: 'institution',
    component: InstitutionPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'search_institution',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../searchInstitution/searchInstitution.module').then(m => m.SearchInstitutionPageModule)
          }
        ]
      },
      {
        path: 'search_user',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../searchUser/searchUser.module').then(m => m.SearchUserPageModule)
          }
        ]
      },
      {
        path: 'upload_interaction',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../uploadInteraction/uploadInteraction.module').then(m => m.UploadInteractionPageModule)
          }
        ]
      },
      {
        path: 'approve_institution',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../approveInstitution/approveInstitution.module').then(m => m.ApproveInstitutionPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/institution/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/institution/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitutionPageRoutingModule {}
