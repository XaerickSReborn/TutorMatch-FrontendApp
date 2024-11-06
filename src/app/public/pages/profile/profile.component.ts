import {Component, inject, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatList, MatListItem} from "@angular/material/list";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {MatIcon} from "@angular/material/icon";
import {DashboardModule} from "../../../tutoring/components/dashboard/dashboard.module";
import {FooterContentComponent} from "../../components/footer-content/footer-content.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatList,
    MatListItem,
    MatButton,
    TranslateModule,
    MatCardActions,
    MatIcon,
    NgOptimizedImage,
    DashboardModule,
    FooterContentComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  constructor(private router: Router) {
  }
  /**
   * @property currentUser {any}
   * @description Holds the current user's data.
   */
  currentUser: any;

  /**
   * @method ngOnInit
   * @description Lifecycle hook that is called after the component's constructor.
   */
  ngOnInit() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  /**
   * @method goBack
   * @param event
   * @description Navigates back to the previous page.
   */
  goBack(event: Event): void {
    event.preventDefault();
    window.history.back();
  }

  navigateToSettings() {
    this.router.navigate(['/Settings']).then();
  }


}

