import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterInstitutionPage } from './register-institution.page';
import { ExploreContainerComponentModule } from '../../0_explore-container/explore-container.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: RegisterInstitutionPage }])
  ],
  declarations: [RegisterInstitutionPage]
})
export class RegisterInstitutionPageModule {}
