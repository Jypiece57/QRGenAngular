import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrGeneratorComponent } from './qr-generator/qr-generator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, QrGeneratorComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'qr-code-generator';
}

