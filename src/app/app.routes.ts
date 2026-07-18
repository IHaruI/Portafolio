import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { AppTasksComponent } from './pages/app-tasks/app-tasks.component';

import { TodoAppAngularComponent } from './pages/projects/todo-app-angular/todo-app-angular.component';
import { DashboardApiComponent } from './pages/projects/dashboard-api/dashboard-api.component';
import { LandingUiComponent } from './pages/projects/landing-ui/landing-ui.component';
import { MiniJsAppComponent } from './pages/projects/mini-js-app/mini-js-app.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'projects',
    component: ProjectsComponent,
    children: [
      { path: 'todo-app', component: TodoAppAngularComponent },
      { path: 'dashboard', component: DashboardApiComponent },
      { path: 'landing', component: LandingUiComponent },
      { path: 'mini-js', component: MiniJsAppComponent },
    ],
  },
  { path: 'app-tasks', component: AppTasksComponent },
];
