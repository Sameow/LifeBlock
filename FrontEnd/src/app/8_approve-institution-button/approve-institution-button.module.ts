import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApproveInstitutionButtonComponent } from './approve-institution-button.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [ApproveInstitutionButtonComponent],
  exports: [ApproveInstitutionButtonComponent]
})
export class ApproveInstitutionButtonComponentModule {}
