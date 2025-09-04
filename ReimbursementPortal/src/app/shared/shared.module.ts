import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptImageComponent } from './receipt-image.component';

@NgModule({
  declarations: [ReceiptImageComponent],
  imports: [CommonModule],
  exports: [ReceiptImageComponent],
})
export class SharedModule {}
