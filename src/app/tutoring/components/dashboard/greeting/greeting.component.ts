import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EditTutoringDialogComponent} from "../../edit-tutoring-dialog/edit-tutoring-dialog.component";

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.css'
})
export class GreetingComponent {
  currentUser: any;

  constructor(private dialog: MatDialog) {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  openEditTutoringDialog(): void {
    const dialogRef = this.dialog.open(EditTutoringDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Result of the dialogue:', result);
      }
    });
  }
}
