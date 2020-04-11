import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'individual',
    component: TabsPage,
    children: [
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../search/search.module').then(m => m.SearchPageModule)
          }
        ]
      },
      {
        path: 'submitFeedback',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../submitFeedback/submitFeedback.module').then(m => m.SubmitFeedbackModule)
          }
        ]
      },
      {
        path: 'viewGivenFeedback',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../viewGivenFeedback/viewGivenFeedback.module').then(m => m.ViewGivenFeedbackModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/individual/profile',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/individual/profile',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
