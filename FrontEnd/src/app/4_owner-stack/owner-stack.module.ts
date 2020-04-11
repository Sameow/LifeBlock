import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnerStackPageRoutingModule } from './owner-stack-routing.module';

import { OwnerStackPage } from './owner-stack.page';
import { ApproveInstitutionButtonComponentModule } from '../8_approve-institution-button/approve-institution-button.module'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApproveInstitutionButtonComponentModule,
    OwnerStackPageRoutingModule
  ],
  declarations: [OwnerStackPage]
})
export class OwnerStackPageModule {}
