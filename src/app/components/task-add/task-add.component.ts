import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerInput, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PeriodicElement } from '../../types/TODO.type';
import { CommonModule, JsonPipe } from '@angular/common';
import { TaskServiceService } from '../../services/task-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-add',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatButtonModule, 
    ReactiveFormsModule,
    JsonPipe,
    CommonModule, 
    FormsModule, 
    MatInputModule, 
    MatSelectModule, 
    MatFormFieldModule, 
    MatDatepickerInput,
    MatDatepickerModule],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css'
})
export class TaskAddComponent {

  taskService = inject(TaskServiceService);
  router = inject(Router);

  priorityArray = [
    { value: 'low', viewValue: 'LOW' },
    { value: 'medium', viewValue: 'MEDIUM' },
    { value: 'high', viewValue: 'HIGH' }
  ];

  categoryArray = [
    { value: 'bug', viewValue: 'Bug' },
    { value: 'task', viewValue: 'Task' },
    { value: 'story', viewValue: 'Story' },
    { value: 'subtask', viewValue: 'Sub Task' }
  ];

  taskDetail: { title: string, isCompleted: boolean, description: string, priority: string, dueDate: any, category: string } = {
    title: '',
    isCompleted: false,
    description: '',
    priority: '',
    dueDate: '',
    category: ''
  }

  filterFutureDates = (date: Date | null): boolean => {
    if (!date) {
        return false; // or true, depending on how you want to handle null dates
    }

    const currentDate = new Date();
    // Set hours to midnight to compare dates without time
    currentDate.setHours(0, 0, 0, 0);
    return date >= currentDate;
}

  addTask(form: NgForm) {
    this.taskDetail.dueDate = form.value.dueDate
    
    this.taskService.addTask(this.taskDetail).subscribe((result) => {
      this.router.navigateByUrl('/');
    })
  }

}
