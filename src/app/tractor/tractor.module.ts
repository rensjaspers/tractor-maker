import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TractorComponent } from './tractor.component';

@NgModule({
  declarations: [TractorComponent],
  exports: [TractorComponent],
  imports: [CommonModule],
})
export class TractorModule {}
