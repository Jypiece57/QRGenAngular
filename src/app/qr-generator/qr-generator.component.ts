import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QrService } from '../qr.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qr-generator',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.css']
})
export class QrGeneratorComponent {
  url: string = '';
  fillColor: string = '#000000';
  backColor: string = '#ffffff';
  selectedIcon: File | null = null;
  iconPreviewUrl: string | null = null;
  qrImageUrl: string | null = null;
  qrBlob: Blob | null = null;
  isLoading: boolean = false;

  constructor(private qrService: QrService) { }

  /**
   * Maneja la selección del ícono y genera una previsualización.
   * @param event - Evento de archivo cargado.
   */
  onIconSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedIcon = file;

      // Crear una URL para la previsualización del archivo
      const reader = new FileReader();
      reader.onload = () => {
        this.iconPreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }



  generateQr() {
    const formData = new FormData();
    formData.append('url', this.url);
    formData.append('fill_color', this.fillColor);
    formData.append('back_color', this.backColor);
  
    if (this.selectedIcon) {
      formData.append('icon_path', this.selectedIcon);
    }
  
    this.qrService.generateQr(formData).subscribe(
      (response) => {
        this.qrBlob = response;
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = () => {
          this.qrImageUrl = reader.result as string;
        };
      },
      (error) => {
        console.error('Error generating QR code:', error);
      }
    );
  }
  

  downloadQr() {
    if (this.qrBlob) {
      const url = window.URL.createObjectURL(this.qrBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qr.png';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }
}
