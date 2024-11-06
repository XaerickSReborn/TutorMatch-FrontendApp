import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TutoringService } from '../../services/tutoring.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course: any;
  times: any = {};
  tutorName: string | undefined;
  tutorEmail: string | undefined;
  tutorAvatar: string | undefined;
  courseImage: string | undefined;
  coursePrice: number | undefined;
  courseWhatTheyWillLearn: string | undefined;
  semesterName: string | undefined;
  courseNotFound: boolean = false;
  timeSlots: string[] = ['10-11', '11-12', '15-16', '17-18', '20-21'];

  constructor(
    private route: ActivatedRoute,
    private tutoringService: TutoringService
  ) {}

  /**
   * @method ngOnInit
   * @description Lifecycle hook that is called after the component's constructor.
   */
  ngOnInit(): void {
    const tutoringId = Number(this.route.snapshot.paramMap.get('id') ?? 0);
    if (tutoringId !== 0) {
      this.getCourseDetails(tutoringId);
    }
  }

  /**
   * @method getCourseDetails
   * @param tutoringId {number} - The ID of the tutoring course.
   * @description Fetches the details of the tutoring course.
   */
  getCourseDetails(tutoringId: number) {
    this.tutoringService.getTutoringById(tutoringId).subscribe({
      next: (tutoring: any) => {
        if (tutoring) {
          this.course = tutoring;
          this.courseImage = tutoring.image;
          this.coursePrice = tutoring.price;
          this.courseWhatTheyWillLearn = tutoring.whatTheyWillLearn;
          this.times = tutoring.times || {};

          this.getTutorDetails(tutoring.tutorId);
          this.getSemesterName(tutoring.courseId);
          this.courseNotFound = false;
        } else {
          this.courseNotFound = true;
        }
      },
      error: (error) => {
        console.error("Error fetching course details", error);
        this.courseNotFound = true;
      }
    });
  }

  /**
   * @method getTutorDetails
   * @param tutorId {number} - The ID of the tutor.
   * @description Fetches the details of the tutor.
   */
  getTutorDetails(tutorId: number) {
    this.tutoringService.getTutorById(tutorId).subscribe({
      next: (tutor: any) => {
        if (tutor) {
          this.tutorName = `${tutor.name} ${tutor.lastName}`;
          this.tutorAvatar = tutor.avatar;
          this.tutorEmail = tutor.email
        } else {
          this.tutorName = 'Teacher not available';
          this.tutorAvatar = undefined;
        }
      },
      error: (error) => {
        console.error("Error fetching tutor details", error);
        this.tutorName = 'Teacher not available';
      }
    });
  }

  /**
   * @method getSemesterName
   * @param courseId {number} - The ID of the course.
   * @description Fetches the name of the semester for the course.
   */
  getSemesterName(courseId: number) {
    this.tutoringService.getCourses().subscribe({
      next: (courses: any[]) => {
        const selectedCourse = courses.find(course => course.id === courseId);
        if (selectedCourse) {
          this.semesterName = `Semester ${selectedCourse.cycle}`;
        }
      },
      error: (error) => {
        console.error("Error fetching semester name", error);
        this.semesterName = 'Semester not available';
      }
    });
  }

  /**
   * @method goBack
   * @param event {Event} - The event object.
   * @description Navigates back to the previous page.
   */
  goBack(event: Event): void {
    event.preventDefault();
    window.history.back();
  }

  /**
   * @method isTimeSlotValidated
   * @param day {number} - The day of the week.
   * @param timeSlot {string} - The time slot.
   * @description Checks if the time slot is validated.
   */

  isTimeSlotValidated(day: number, timeSlot: string): boolean {
    return this.times[day]?.includes(timeSlot);
  }

}
