import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskServiceService } from '../../services/task-service.service';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatButtonModule, 
    FormsModule, 
    MatInputModule, 
    MatSelectModule, 
    MatFormFieldModule, 
    ReactiveFormsModule, 
    MatDatepickerModule],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent {
formBuilder = inject(FormBuilder);
taskService = inject(TaskServiceService);
activateRoute = inject(ActivatedRoute);
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


taskForm: FormGroup = this.formBuilder.group({
  id: [''],
  title: [''],
  dueDate: [''],
  priority: [''],
  description: [''],
  category: ['']
})

categoryData: string=''


  constructor(
  ) { }

  ngOnInit() {
    let taskId = this.activateRoute.snapshot.params['id'];
    this.taskService.getTaskById(taskId).subscribe((task: any) => {
      this.taskForm.patchValue(task);
      this.categoryData = task.category;
      this.taskForm.patchValue({ category: task.category });
      this.taskForm.patchValue({ priority: task.priority });
    });
  }

  editTask(){
    this.taskService.updateTaskById(this.taskForm.value).subscribe((result) => {
      this.router.navigateByUrl('/');
    })
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

}
