import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, RouterLink],
  template: `
  <mat-toolbar style="background-color: blueviolet">
    <button mat-icon-button routerLink="/">
      Home
    </button>
  </mat-toolbar>
  `,
  styles: ``
})
export class HeaderComponent {

}
