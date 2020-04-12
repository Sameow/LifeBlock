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
              import('../3.2_home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'search_user',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../3.3_search-user/search-user.module').then(m => m.SearchUserPageModule)
          }
        ]
      },
      {
        path: 'search_institution',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../3.4_search-institution/search-institution.module').then(m => m.SearchInstitutionPageModule)
          }
        ]
      },
      
      {
        path: 'upload_interaction',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../3.5_upload-interaction/upload-interaction.module').then(m => m.UploadInteractionPageModule)
          }
        ]
      },
      {
        path: 'view_history',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../3.6_view-history/view-history.module').then(m => m.ViewHistoryPageModule)
          }
        ]
      },
      {
        
        path: 'register_institution',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../3.7_register-institution/register-institution.module').then(m => m.RegisterInstitutionPageModule)
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
