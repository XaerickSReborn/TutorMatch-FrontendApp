import {Component, EventEmitter, Output} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TutoringService } from '../../../services/tutoring.service';


@Component({
  selector: 'app-add-tutoring-dialog',
  templateUrl: './add-tutoring-dialog.component.html',
  styleUrls: ['./add-tutoring-dialog.component.css']
})
export class AddTutoringDialogComponent {
  @Output() addTutoring = new EventEmitter<any>();
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
    public dialogRef: MatDialogRef<AddTutoringDialogComponent>,
    private tutoringService: TutoringService
  ) {
    this.initializeTimeSlots();
    this.loadCurrentUser();

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
    const selectedSemesterObj = this.allSemesters.find(sem => sem.name === this.selectedSemester);
    this.availableCourses = selectedSemesterObj ? selectedSemesterObj.courses : [];
    this.checkFormValidity();
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

  onConfirmAddTutoring(): void {
    if (this.isFormValid() && this.price > 0) {
      const selectedTimes = this.getSelectedTimes();
      const newTutoring = {
        id: 0,
        title: this.selectedCourse ? `${this.selectedCourse} (${this.selectedSemester})` : 'Untitled Tutoring',
        description: this.description || 'No description provided',
        price: this.price || 0,
        times: selectedTimes,
        image: this.courseImage || '',
        whatTheyWillLearn: this.whatTheyWillLearn,
        tutorId: this.currentUser?.tutorId || 1,
        courseId: this.availableCourses.find(course => course.name === this.selectedCourse)?.id || 1
      };
      this.createTutoring(newTutoring);
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

  createTutoring(tutoring: any): void {
    this.tutoringService.createTutoring(tutoring).subscribe({
      next: (response) => {
        this.addTutoring.emit(response);
        this.dialogRef.close(response);
      },
    });
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

