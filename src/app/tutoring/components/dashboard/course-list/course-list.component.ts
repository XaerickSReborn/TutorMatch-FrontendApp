import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TutoringService } from '../../../services/tutoring.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  semesterName: string = '';
  semesterCourses: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private tutoringService: TutoringService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    const cycle = Number(this.route.snapshot.paramMap.get('cycle'));

    this.tutoringService.getCoursesBySemester(cycle).subscribe((courses: any[]) => {
      courses.forEach(course => {
        this.tutoringService.getTutoringByCourseId(course.id).subscribe((tutorings: any[]) => {
          tutorings.forEach(tutoring => {
            this.tutoringService.getTutorById(tutoring.tutorId).subscribe((tutor: any) => {
              if (tutor) {
                const newTutoring = {
                  id: tutoring.id,
                  courseName: course.name,
                  tutorName: `${tutor.name} ${tutor.lastName}`,
                  price: tutoring.price,
                  image: tutoring.image,
                  title: tutoring.title
                };
                console.log('Tutoring data:', newTutoring);
                this.semesterCourses.push(newTutoring);
              }
            });
          });
        });
      });
      this.updateSemesterName(cycle);
    });

    this.translate.onLangChange.subscribe(() => {
      const cycle = Number(this.route.snapshot.paramMap.get('cycle'));
      this.updateSemesterName(cycle);
    });
  }

  updateSemesterName(cycle: number): void {
    this.translate.get('footer.semester').subscribe((res: string) => {
      this.semesterName = `${res} ${cycle}`;
    });
  }
}
