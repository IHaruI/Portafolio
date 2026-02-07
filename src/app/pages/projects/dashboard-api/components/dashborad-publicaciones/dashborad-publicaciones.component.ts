import { Component, Input } from '@angular/core';
import { Publicacion } from '../../models/publicacion.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashborad-publicaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashborad-publicaciones.component.html',
  styleUrl: './dashborad-publicaciones.component.css',
})
export class DashboradPublicacionesComponent {
  @Input() publicaciones: Publicacion[] = [];
}
