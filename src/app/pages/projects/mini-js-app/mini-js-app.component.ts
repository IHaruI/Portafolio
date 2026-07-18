import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Tecnologia {
  nombre: string;
  categoria: 'Frontend' | 'Backend' | 'Herramientas';
  descripcion: string;
}

@Component({
  selector: 'app-mini-js-app',
  imports: [CommonModule, FormsModule],
  templateUrl: './mini-js-app.component.html',
  styleUrl: './mini-js-app.component.css',
})
export class MiniJsAppComponent implements OnInit {
  tecnologias: Tecnologia[] = [
    {
      nombre: 'Angular',
      categoria: 'Frontend',
      descripcion: 'Framework frontend para aplicaciones escalables',
    },
    {
      nombre: 'JavaScript',
      categoria: 'Frontend',
      descripcion: 'Lenguaje base del desarrollo web',
    },
    {
      nombre: 'CSS',
      categoria: 'Frontend',
      descripcion: 'Estilos y diseño visual para la web',
    },
    {
      nombre: 'HTML',
      categoria: 'Frontend',
      descripcion: 'Lenguaje de marcado para estructurar páginas web',
    },
    {
      nombre: 'TypeScript',
      categoria: 'Frontend',
      descripcion: 'Superset de JavaScript con tipado estático',
    },
    {
      nombre: 'RxJS',
      categoria: 'Frontend',
      descripcion: 'Programación reactiva con observables',
    },
    {
      nombre: 'Node.js',
      categoria: 'Backend',
      descripcion: 'Entorno para ejecutar JavaScript en el servidor',
    },
    {
      nombre: 'Firebase',
      categoria: 'Backend',
      descripcion: 'Backend as a Service con base de datos en tiempo real',
    },
    {
      nombre: 'Git',
      categoria: 'Herramientas',
      descripcion: 'Control de versiones',
    },
    {
      nombre: 'GitHub',
      categoria: 'Herramientas',
      descripcion: 'Plataforma para alojar repositorios y colaborar',
    },
    {
      nombre: 'Visual Studio Code',
      categoria: 'Herramientas',
      descripcion: 'Editor de código ligero y extensible',
    },
    {
      nombre: 'Figma',
      categoria: 'Herramientas',
      descripcion: 'Herramienta de diseño y prototipado UI/UX',
    },
    {
      nombre: 'Postman',
      categoria: 'Herramientas',
      descripcion: 'Testing y documentación de APIs',
    },
  ];

  tecnologiasFiltradas: Tecnologia[] = [];

  textoBusqueda: string = '';
  categoriaSeleccionada: string = 'Todas';

  ngOnInit(): void {
    this.tecnologiasFiltradas = [...this.tecnologias];
  }

  filtrarTecnologias(): void {
    this.tecnologiasFiltradas = this.tecnologias.filter((tech) => {
      const coincideTexto = tech.nombre
        .toLowerCase()
        .includes(this.textoBusqueda.toLowerCase());

      const coincideCategoria =
        this.categoriaSeleccionada === 'Todas' ||
        tech.categoria === this.categoriaSeleccionada;

      return coincideTexto && coincideCategoria;
    });
  }

  seleccionarCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    this.filtrarTecnologias();
  }
}
