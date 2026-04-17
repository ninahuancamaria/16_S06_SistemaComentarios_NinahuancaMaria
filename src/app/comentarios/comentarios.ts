import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Comentario } from '../services/api';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comentarios.html',
  styleUrls: ['./comentarios.css']
})
export class Comentarios implements OnInit {
  comentarios: Comentario[] = [];
  nombre = '';
  body = '';
  mensaje = '';
  cargando = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getComentarios().subscribe({
      next: (data) => {
        this.comentarios = data.slice(0, 10);
      },
      error: () => this.mensaje = 'Error al cargar comentarios.'
    });
  }

  get totalComentarios(): number {
    return this.comentarios.length;
  }

  enviar(): void {
    if (!this.nombre.trim() || !this.body.trim()) return;

    const nuevo: Comentario = {
      postId: 1,
      name: this.nombre,
      body: this.body,
      fecha: new Date().toLocaleString('es-PE')
    };

    this.cargando = true;
    this.api.postComentario(nuevo).subscribe({
      next: (res) => {
        this.comentarios.unshift({ ...res, fecha: nuevo.fecha });
        this.mensaje = '¡Comentario registrado exitosamente!';
        this.limpiar();
        this.cargando = false;
        setTimeout(() => this.mensaje = '', 3000);
      },
      error: () => {
        this.mensaje = 'Error al enviar el comentario.';
        this.cargando = false;
      }
    });
  }

  limpiar(): void {
    this.nombre = '';
    this.body = '';
  }
}