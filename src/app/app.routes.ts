import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { AppTasksComponent } from './pages/app-tasks/app-tasks.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'projects',
    component: ProjectsComponent,
  },
  { path: 'app-tasks', component: AppTasksComponent },
];
