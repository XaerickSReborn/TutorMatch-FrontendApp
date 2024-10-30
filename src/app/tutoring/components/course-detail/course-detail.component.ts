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
  tutorAvatar: string | undefined;
  courseImage: string | undefined;
  coursePrice: number | undefined;
  semesterName: string | undefined;
  courseNotFound: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private tutoringService: TutoringService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const tutoringId = Number(this.route.snapshot.paramMap.get('id') ?? 0);
    if (tutoringId !== 0) {
      this.getCourseDetails(tutoringId);
    }
  }

  getCourseDetails(tutoringId: number) {
    this.tutoringService.getTutoringById(tutoringId).subscribe({
      next: (tutoring: any) => {
        if (tutoring) {
          this.course = tutoring;
          this.courseImage = tutoring.image;
          this.coursePrice = tutoring.price;
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

  getTutorDetails(tutorId: number) {
    this.tutoringService.getTutorById(tutorId).subscribe({
      next: (tutor: any) => {
        if (tutor) {
          this.tutorName = `${tutor.name} ${tutor.lastName}`;
          this.tutorAvatar = tutor.avatar;
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

  navigateToSemester() {
    if (this.semesterName) {
      const cycle = Number(this.semesterName.split(' ')[1]);
      this.router.navigate(['/courses', cycle]);
    }
  }

}
