import { Component, OnInit } from '@angular/core';
import { DashboardService } from './services/dashboard.service';
import { Usuario } from './models/usuario.model';
import { Publicacion } from './models/publicacion.model';
import { CommonModule } from '@angular/common';
import { DashboradUsuariosComponent } from './components/dashborad-usuarios/dashborad-usuarios.component';
import { DashboradPublicacionesComponent } from './components/dashborad-publicaciones/dashborad-publicaciones.component';

@Component({
  selector: 'app-dashboard-api',
  standalone: true,
  imports: [
    CommonModule,
    DashboradUsuariosComponent,
    DashboradPublicacionesComponent,
  ],
  templateUrl: './dashboard-api.component.html',
  styleUrl: './dashboard-api.component.css',
})
export class DashboardApiComponent implements OnInit {
  usuarios: Usuario[] = [];
  publicaciones: Publicacion[] = [];
  cargando = true;
  error = false;
  vistaActual: 'usuarios' | 'publicaciones' = 'usuarios';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.obtenerUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.cargando = false;
      },
      error: () => {
        this.error = true;
        this.cargando = false;
      },
    });
  }

  cargarPublicaciones(): void {
    if (this.publicaciones.length > 0) {
      this.vistaActual = 'publicaciones';
      return;
    }

    this.cargando = true;
    this.error = false;
    this.vistaActual = 'publicaciones';

    this.dashboardService.obtenerPublicaciones().subscribe({
      next: (publicaciones) => {
        this.publicaciones = publicaciones;
        this.cargando = false;
      },
      error: () => {
        this.error = true;
        this.cargando = false;
      },
    });
  }

  mostrarUsuarios(): void {
    this.vistaActual = 'usuarios';
  }
}
