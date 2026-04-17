import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Comentario {
  id?: number;
  postId?: number;
  name: string;
  email?: string;
  body: string;
  fecha?: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private url = 'https://jsonplaceholder.typicode.com/comments';

  constructor(private http: HttpClient) {}

  getComentarios(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.url);
  }

  postComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(this.url, comentario);
  }
}