import { Component, Input } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashborad-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashborad-usuarios.component.html',
  styleUrl: './dashborad-usuarios.component.css',
})
export class DashboradUsuariosComponent {
  @Input() usuarios: Usuario[] = [];
}
