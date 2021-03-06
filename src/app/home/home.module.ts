import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { TractorModule } from '../tractor/tractor.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularSplitModule } from 'angular-split';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    TractorModule,
    FontAwesomeModule,
    AngularSplitModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
