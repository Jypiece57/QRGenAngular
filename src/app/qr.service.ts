import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  private apiUrl = 'http://localhost:5000/generate_qr'; // Endpoint del backend

  constructor(private http: HttpClient) { }

  /**
   * Genera un código QR en el backend.
   * @param formData - Contiene los datos para generar el QR (URL, colores, ícono).
   * @returns Observable<Blob> - La respuesta es un archivo Blob (imagen PNG).
   */
  generateQr(formData: FormData): Observable<Blob> {
    return this.http.post(this.apiUrl, formData, { responseType: 'blob' });
  }
}
