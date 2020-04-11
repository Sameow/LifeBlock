import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApproveInstitutionPage } from './approveInstitution.page';
import { ExploreContainerComponentModule } from '../../0_explore-container/explore-container.module';
import { ApproveInstitutionButtonComponentModule } from '../../8_approve-institution-button/approve-institution-button.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ApproveInstitutionButtonComponentModule,
    RouterModule.forChild([{ path: '', component: ApproveInstitutionPage }])
  ],
  declarations: [ApproveInstitutionPage]
})
export class ApproveInstitutionPageModule {}
