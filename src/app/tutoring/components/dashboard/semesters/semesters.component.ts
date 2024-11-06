import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../../public/services/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-semesters',
  templateUrl: './semesters.component.html',
  styleUrls: ['./semesters.component.css']
})
export class SemestersComponent implements OnInit {
  semesters = [
    { name: 'Algorithm', labelKey: 'footer.first', image: 'Algorithm.png', cycle: 1 },
    { name: 'OOP', labelKey: 'footer.second', image: 'OOP.png', cycle: 2 },
    { name: 'Data Structure', labelKey: 'footer.third', image: 'DataStructure.png', cycle: 3 },
    { name: 'Database', labelKey: 'footer.fourth', image: 'Database.png', cycle: 4 },
    { name: 'Web App', labelKey: 'footer.fifth', image: 'WebApp.png', cycle: 5 },
    { name: 'Mobile App', labelKey: 'footer.sixth', image: 'MobileApp.png', cycle: 6 },
    { name: 'Networking', labelKey: 'footer.seventh', image: 'Networking.png', cycle: 7 },
    { name: 'Final Project', labelKey: 'footer.eighth', image: 'FinalProject.png', cycle: 8 },
  ];

  constructor(
    public translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  onSemesterClick(semester: any): void {
      this.router.navigate(['/courses', semester.cycle]);
  }
}
