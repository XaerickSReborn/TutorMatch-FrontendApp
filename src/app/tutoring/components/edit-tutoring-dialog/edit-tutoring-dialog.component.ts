import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import { TutoringService } from '../../services/tutoring.service';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {TranslateModule} from "@ngx-translate/core";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatOption} from "@angular/material/core";
import {MatFormField, MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-edit-tutoring-dialog',
  templateUrl: 'edit-tutoring-dialog.component.html',
  standalone: true,
  imports: [
    TranslateModule,
    FormsModule,
    MatButton,
    MatOption,
    MatSelect,
    MatFormField,
    MatDialogContent,
    MatIcon,
    MatIconButton,
    MatDialogTitle,
    MatInput,
    NgClass,
    MatDialogActions,
    NgForOf,
    NgIf
  ],
  styleUrls: ['edit-tutoring-dialog.component.css']
})
export class EditTutoringDialogComponent implements OnInit {
  @Input() tutoring: any;
  @Output() updateTutoring = new EventEmitter<any>();
  semesters = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth'];
  selectedSemester = '';
  availableCourses: any[] = [];
  selectedCourse = '';
  description = '';
  price: number = 0;
  whatTheyWillLearn = '';
  daysOfWeek = [0, 1, 2, 3, 4, 5, 6];
  timeSlots = ['10-11', '11-12', '15-16', '17-18', '20-21'];
  currentUser: any;
  availableTimes: { [day: number]: { [timeSlot: string]: boolean } } = {};
  courseImage: string | undefined;
  imageUploaded: boolean = false;
  errorMessage: string = '';
  isFormValidFlag: boolean = false;
  tutoringForm: FormGroup;

  allSemesters = [
    {
      name: 'First',
      courses: [
        { id: 1, name: 'Introducción a los Algoritmos' }
      ]
    },
    {
      name: 'Second',
      courses: [
        { id: 2, name: 'Algoritmos' }
      ]
    },
    {
      name: 'Third',
      courses: [
        { id: 3, name: 'Algoritmos y Estructuras de Datos' },
        { id: 4, name: 'Diseño y Patrones de Software' }
      ]
    },
    {
      name: 'Fourth',
      courses: [
        { id: 5, name: 'Diseño de Base de Datos' },
        { id: 6, name: 'IHC y Tecnologías Móviles' }
      ]
    },
    {
      name: 'Fifth',
      courses: [
        { id: 7, name: 'Aplicaciones Web' },
        { id: 8, name: 'Desarrollo de Aplicaciones Open Source' }
      ]
    },
    {
      name: 'Sixth',
      courses: [
        { id: 9, name: 'Aplicaciones para Dispositivos Móviles' },
        { id: 10, name: 'Complejidad Algorítmica' }
      ]
    },
    {
      name: 'Seventh',
      courses: [
        { id: 11, name: 'Diseño de Experimentos de Ingeniería de Software' },
        { id: 12, name: 'Fundamentos de Arquitectura de Software' }
      ]
    },
    {
      name: 'Eighth',
      courses: [
        { id: 13, name: 'Arquitecturas de Software Emergentes' },
        { id: 14, name: 'Gerencia de Proyectos en Computación' }
      ]
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<EditTutoringDialogComponent>,
    private tutoringService: TutoringService,
    private fb: FormBuilder
  ) {
    this.tutoringForm = this.fb.group({
      selectedSemester: ['', Validators.required],
      selectedCourse: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      whatTheyWillLearn: ['', Validators.required],
      courseImage: ['']
    });
    this.initializeTimeSlots();
    this.loadCurrentUser();
  }

  ngOnInit(): void {
    if (this.tutoring) {
      this.tutoringForm.patchValue({
        selectedSemester: this.tutoring.semester,
        selectedCourse: this.tutoring.course,
        description: this.tutoring.description,
        price: this.tutoring.price,
        whatTheyWillLearn: this.tutoring.whatTheyWillLearn,
        courseImage: this.tutoring.image
      });
      this.availableTimes = this.tutoring.times || {};
      this.imageUploaded = !!this.tutoringForm.get('courseImage')?.value;
      this.onSemesterSelected();
    }
  }

  loadCurrentUser(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  initializeTimeSlots(): void {
    for (let day of this.daysOfWeek) {
      this.availableTimes[day] = {};
      for (let timeSlot of this.timeSlots) {
        this.availableTimes[day][timeSlot] = false;
      }
    }
  }

  onSemesterSelected(): void {
    const selectedSemesterObj = this.allSemesters.find(sem => sem.name === this.tutoringForm.get('selectedSemester')?.value);
    if (selectedSemesterObj) {
      this.tutoringForm.get('selectedCourse')?.setValue('');
    }
  }

  toggleTimeSlot(day: number, timeSlot: string): void {
    this.availableTimes[day][timeSlot] = !this.availableTimes[day][timeSlot];
    this.checkFormValidity();
  }

  isSelected(day: number, timeSlot: string): boolean {
    return this.availableTimes[day][timeSlot];
  }

  isFormValid(): boolean {
    return this.selectedSemester !== '' &&
           this.selectedCourse !== '' &&
           this.description !== '' &&
           this.price > 0 &&
           this.whatTheyWillLearn !== '' &&
           this.courseImage !== undefined &&
           this.areTimeSlotsSelected();
  }

  areTimeSlotsSelected(): boolean {
    for (let day of this.daysOfWeek) {
      for (let timeSlot of this.timeSlots) {
        if (this.availableTimes[day][timeSlot]) {
          return true;
        }
      }
    }
    return false;
  }

  checkFormValidity(): void {
    this.isFormValidFlag = this.isFormValid();
  }

  onConfirmEditTutoring(): void {
    if (this.tutoringForm.valid) {
      const updatedTutoring = {
        ...this.tutoring,
        ...this.tutoringForm.value,
        times: this.getSelectedTimes(),
        tutorId: this.currentUser?.tutorId || 1
      };
      this.tutoringService.editTutoring(this.tutoring.id, updatedTutoring).subscribe(
        response => {
          this.updateTutoring.emit(response);
          this.dialogRef.close(response);
        },
        error => {
          this.errorMessage = 'Error updating tutoring session. Please try again.';
        }
      );
    }
  }

  getSelectedTimes(): { [day: number]: string[] } {
    let selectedTimes: { [day: number]: string[] } = {};
    for (let day of this.daysOfWeek) {
      selectedTimes[day] = [];
      for (let timeSlot of this.timeSlots) {
        if (this.availableTimes[day][timeSlot]) {
          selectedTimes[day].push(timeSlot);
        }
      }
    }
    return selectedTimes;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.courseImage = e.target.result;
          this.imageUploaded = true;
          this.errorMessage = '';
          this.checkFormValidity();
        };
        reader.readAsDataURL(file);
      } else {
        this.errorMessage = 'Invalid file type. Please select a PNG or JPEG file.';
        this.imageUploaded = false;
        this.checkFormValidity();
      }
    }
  }
}
