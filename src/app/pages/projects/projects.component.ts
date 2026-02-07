import { Component } from '@angular/core';
import { TodoAppAngularComponent } from './todo-app-angular/todo-app-angular.component';
import { DashboardApiComponent } from './dashboard-api/dashboard-api.component';
import { LandingUiComponent } from './landing-ui/landing-ui.component';
import { MiniJsAppComponent } from './mini-js-app/mini-js-app.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    TodoAppAngularComponent,
    DashboardApiComponent,
    LandingUiComponent,
    MiniJsAppComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  temaOscuro: boolean = false;

  alternarTema(): void {
    this.temaOscuro = !this.temaOscuro;
  }
}
