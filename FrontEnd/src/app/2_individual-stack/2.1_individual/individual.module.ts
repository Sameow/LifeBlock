import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IndividualPageRoutingModule } from './individual-routing.module';

import { IndividualPage } from './individual.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    IndividualPageRoutingModule
  ],
  declarations: [IndividualPage]
})
export class IndividualPageModule {}
