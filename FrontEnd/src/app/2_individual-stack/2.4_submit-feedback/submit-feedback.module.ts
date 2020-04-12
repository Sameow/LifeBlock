import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubmitFeedbackPage } from './submit-feedback.page';
import { ExploreContainerComponentModule } from '../../0_explore-container/explore-container.module';
import { SearchInstitutionButtonComponentModule } from '../../5_search-institution-button/search-institution-button.module'


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    SearchInstitutionButtonComponentModule,
    RouterModule.forChild([{ path: '', component: SubmitFeedbackPage }])
  ],
  declarations: [SubmitFeedbackPage]
})
export class SubmitFeedbackPageModule {}
