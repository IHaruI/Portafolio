import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];

  @Output() alternar = new EventEmitter<number>();
  @Output() eliminar = new EventEmitter<number>();
}
