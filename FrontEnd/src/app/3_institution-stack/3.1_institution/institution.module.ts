import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InstitutionPageRoutingModule } from './institution-routing.module';
import { InstitutionPage } from './institution.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    InstitutionPageRoutingModule
  ],
  declarations: [InstitutionPage]
})
export class InstitutionPageModule {}
