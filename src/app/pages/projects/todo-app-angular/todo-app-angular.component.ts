import { Component } from '@angular/core';
import { Todo } from './models/todo.model';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@Component({
  selector: 'app-todo-app-angular',
  imports: [TodoFormComponent, TodoListComponent],
  templateUrl: './todo-app-angular.component.html',
  styleUrl: './todo-app-angular.component.css',
})
export class TodoAppAngularComponent {
  todos: Todo[] = [];

  agregarTodo(titulo: string) {
    this.todos.push({
      id: Date.now(),
      titulo,
      completado: false,
    });
  }

  alternarTodo(id: number) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) todo.completado = !todo.completado;
  }

  eliminarTodo(id: number) {
    this.todos = this.todos.filter((t) => t.id !== id);
  }

  get conteoPendiente() {
    // let pendientes = [];

    // for (let t of this.todos) {
    //   if (t.completado === false) {
    //     pendientes.push(t);
    //   }
    // }

    // return pendientes.length;

    return this.todos.filter((t) => !t.completado).length;
  }
}
