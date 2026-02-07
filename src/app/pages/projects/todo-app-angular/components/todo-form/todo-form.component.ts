import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css',
})
export class TodoFormComponent {
  titulo: string = '';

  @Output() crearTodo = new EventEmitter<string>();

  enviar() {
    if (!this.titulo.trim()) return;

    this.crearTodo.emit(this.titulo);
    this.titulo = '';
  }
}
