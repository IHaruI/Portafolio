import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Usuario } from '../models/usuario.model';
import { Publicacion } from '../models/publicacion.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private URL_USUARIOS = 'https://jsonplaceholder.typicode.com/users';
  private URL_PUBLICACIONES = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<any[]>(this.URL_USUARIOS).pipe(
      map((usuarios) =>
        usuarios.map((u) => ({
          id: u.id,
          nombre: u.name,
          email: u.email,
          ciudad: u.address.city,
        })),
      ),

      //   map((usuarios) => {
      //     const resultado = [];

      //     for (let u of usuarios) {
      //       resultado.push({
      //         id: u.id,
      //         nombre: u.name,
      //         email: u.email,
      //         ciudad: u.address.city,
      //       });
      //     }

      //     return resultado;
      //   }),
    );
  }

  obtenerPublicaciones(): Observable<Publicacion[]> {
    return this.http.get<any[]>(this.URL_PUBLICACIONES).pipe(
      map((publicaciones) =>
        publicaciones.map((p) => ({
          id: p.id,
          userId: p.userId,
          titulo: p.title,
          contenido: p.body,
        })),
      ),
    );
  }
}
