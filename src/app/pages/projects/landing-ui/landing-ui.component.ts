import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-landing-ui',
  templateUrl: './landing-ui.component.html',
  styleUrls: ['./landing-ui.component.css'],
})
export class LandingUiComponent {
  @Input() temaOscuro: boolean = false;
  @Output() cambiarTema = new EventEmitter<void>();

  alternarTema(): void {
    this.temaOscuro = !this.temaOscuro;

    const landing = document.querySelector('.landing') as HTMLElement;

    if (landing) {
      landing.setAttribute('data-tema', this.temaOscuro ? 'oscuro' : 'claro');
    }

    this.cambiarTema.emit();
  }
}
