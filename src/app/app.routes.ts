import { Routes } from '@angular/router';
import { TaskViewComponent } from './components/task-view/task-view.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { TaskAddComponent } from './components/task-add/task-add.component';

export const routes: Routes = [
    { path: '', component: TaskViewComponent },
    { path: 'tasks', component: TaskViewComponent },
  { path: 'edit/:id', component: TaskEditComponent } ,
  { path: 'add', component: TaskAddComponent }  
];
