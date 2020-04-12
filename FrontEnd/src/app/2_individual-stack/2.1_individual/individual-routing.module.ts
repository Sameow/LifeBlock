import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndividualPage } from './individual.page';

const routes: Routes = [
  {
    path: 'individual',
    component: IndividualPage,
    children: [
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../2.2_profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../2.3_search/search.module').then(m => m.SearchPageModule)
          }
        ]
      },
      {
        path: 'submit_feedback',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../2.4_submit-feedback/submit-feedback.module').then(m => m.SubmitFeedbackPageModule)
          }
        ]
      },
      {
        path: 'view_history',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../2.5_view-history/view-history.module').then(m => m.ViewHistoryPageModule)
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
export class IndividualPageRoutingModule {}
