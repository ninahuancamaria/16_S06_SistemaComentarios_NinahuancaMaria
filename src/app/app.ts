import { Component } from '@angular/core';
import { Comentarios } from './comentarios/comentarios';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Comentarios],
  template: '<app-comentarios></app-comentarios>'
})
export class App{}