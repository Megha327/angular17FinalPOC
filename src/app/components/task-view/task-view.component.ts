import { Component, inject } from '@angular/core';
import { TaskServiceService } from '../../services/task-service.service';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { PeriodicElement } from '../../types/TODO.type';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SearchComponent } from '../../search/search.component';


@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [MatTableModule, 
    FormsModule, 
    DatePipe,
    MatIconModule, 
    CommonModule, 
    MatButtonModule, 
    RouterLink, 
    RouterModule, 
    MatSlideToggleModule,
    ConfirmDeleteDialogComponent,
    SearchComponent
  ],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css'
})

export class TaskViewComponent {

  filteredTask: any = [];

  displayedColumns = [
    'title',
    'isCompleted',
    'description',
    'priority',
    'dueDate',
    'category',
    'action'
  ];

  
  dataSource: PeriodicElement[] = [];



  taskService = inject(TaskServiceService);
  router = inject(Router);
  dialog = inject(MatDialog)

  ngOnInit(): void{
    this.fetchData();
  }

  fetchData(): void{
    this.taskService.getTaskList().subscribe ((result: any) => {
      this.dataSource = result;
      this.filteredTask = this.dataSource;
    })
  }

  editTask(id: number) {
    this.router.navigate(['/edit', id]); 
  }

  toggleCompletion(element: PeriodicElement, newValue: boolean) {
    let updatedElement = { ...element, isCompleted: newValue };
  
    this.taskService.updateTaskById(updatedElement).subscribe((result) => {
      this.router.navigateByUrl('/');
    });
  }


  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem(id);
      }
    });
  }

  deleteItem(id: string): void {
    this.taskService.deleteItemById(id).subscribe ((response: any) => {
      this.fetchData();
    }, error => {
      console.error('Error deleting item:', error);
    });
  }


  onSearchCall(event: string){
    if(event){
      this.filteredTask = this.dataSource.filter((ele: any) => ele.title.toLowerCase().includes(event.toLowerCase()));
    }else{
      this.filteredTask = this.dataSource;
    }
  }


}
