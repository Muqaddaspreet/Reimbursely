import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-receipt-image',
  template: `
    <div
      *ngIf="imageData && imageData.trim() !== ''"
      class="receipt-image-container"
    >
      <img
        *ngIf="isImage()"
        [src]="imageData"
        alt="Receipt Image"
        class="receipt-image"
        (click)="openImageModal()"
        style="max-width: 100px; max-height: 100px; cursor: pointer; border: 1px solid #ddd; border-radius: 4px;"
      />
      <div
        *ngIf="!isImage()"
        class="receipt-file"
        (click)="openFileModal()"
        style="padding: 10px; background: #f8f9fa; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; text-align: center;"
      >
        <i class="fas fa-file-pdf" style="font-size: 24px; color: #dc3545;"></i>
        <br />
        <small>PDF Receipt</small>
      </div>
    </div>
    <div *ngIf="!imageData || imageData.trim() === ''" class="no-receipt">
      No receipt
    </div>
  `,
  styles: [
    `
      .receipt-image-container {
        display: inline-block;
      }
      .receipt-image:hover {
        opacity: 0.8;
        transform: scale(1.05);
        transition: all 0.2s ease;
      }
      .receipt-file:hover {
        background: #e9ecef;
      }
      .no-receipt {
        color: #6c757d;
        font-style: italic;
      }
    `,
  ],
})
export class ReceiptImageComponent {
  @Input() imageData: string = '';

  isImage(): boolean {
    if (!this.imageData) return false;
    return this.imageData.startsWith('data:image/');
  }

  openImageModal() {
    if (this.imageData) {
      // Create a modal or open in new window
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head><title>Receipt Image</title></head>
            <body style="margin: 0; padding: 20px; text-align: center; background: #f8f9fa;">
              <img src="${this.imageData}" style="max-width: 100%; max-height: 100vh; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
            </body>
          </html>
        `);
      }
    }
  }

  openFileModal() {
    if (this.imageData) {
      // For PDF files, open in new window
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head><title>Receipt PDF</title></head>
            <body style="margin: 0; padding: 0;">
              <embed src="${this.imageData}" type="application/pdf" width="100%" height="100vh" />
            </body>
          </html>
        `);
      }
    }
  }
}
