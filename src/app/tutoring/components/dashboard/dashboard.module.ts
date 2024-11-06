import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatCard, MatCardAvatar, MatCardContent, MatCardHeader, MatCardImage} from "@angular/material/card";
import { MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import { CourseRecomComponent } from './course-recom/course-recom.component';
import {MatTab, MatTabGroup, MatTabLabel} from "@angular/material/tabs";
import { SemestersComponent } from './semesters/semesters.component';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {FooterContentComponent} from "../../../public/components/footer-content/footer-content.component";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {LanguageSwitcherComponent} from "../../../public/components/language-switcher/language-switcher.component";
import {PageNotFoundComponent} from "../../../public/pages/page-not-found/page-not-found.component";
import {LoginComponent} from "../../../public/pages/login/login.component";
import {RegisterComponent} from "../../../public/pages/register/register.component";
import {GreetingComponent} from "./greeting/greeting.component";
import {TranslateModule} from "@ngx-translate/core";
import { AddTutoringDialogComponent } from './add-tutoring-dialog/add-tutoring-dialog.component';
import {CourseListComponent} from "./course-list/course-list.component";
import {CourseDetailComponent} from "../course-detail/course-detail.component";
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    DashboardComponent,
    ToolbarComponent,
    GreetingComponent,
    CourseRecomComponent,
    SemestersComponent,
    AddTutoringDialogComponent,
    CourseListComponent,
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    MatToolbar,
    MatIcon,
    MatFormField,
    MatInput,
    MatButton,
    MatCardSubtitle, MatCardTitle, LoginComponent, RegisterComponent,
    MatIconButton, MatFormFieldModule, MatInputModule, FormsModule, NgOptimizedImage, MatCard, MatCardHeader, MatAnchor, MatCardAvatar, MatTabGroup, MatTab, MatTabLabel, MatCardContent, MatCardImage, MatGridList, MatGridTile, FooterContentComponent, MatMenuTrigger, LanguageSwitcherComponent, MatMenu, PageNotFoundComponent, TranslateModule,
    MatDialogModule, MatButtonModule, MatSelectModule, MatMenuItem, RouterLink],
  exports: [DashboardComponent, ToolbarComponent]
})
export class DashboardModule { }
