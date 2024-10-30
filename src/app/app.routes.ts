import { Routes } from '@angular/router';
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";
import {DashboardComponent} from "./tutoring/components/dashboard/dashboard.component";
import {RegisterComponent} from "./public/pages/register/register.component";
import {LoginComponent} from "./public/pages/login/login.component";
import {SettingsComponent} from "./public/pages/settings/settings.component";
import {ProfileComponent} from "./public/pages/profile/profile.component";
import {PlansComponent} from "./tutoring/components/plans/plans.component";
import {CourseDetailComponent} from "./tutoring/components/course-detail/course-detail.component";
import {CourseListComponent} from "./tutoring/components/dashboard/course-list/course-list.component";

export const routes: Routes = [
  {path:'Dashboard',                component:DashboardComponent},
  {path:'LogIn',                    component:LoginComponent},
  {path:'Register',                 component:RegisterComponent},
  {path:'Plans',                    component:PlansComponent},
  { path: 'Settings',               component: SettingsComponent },
  {path:'Profile',                  component:ProfileComponent},
  { path: 'courses/:cycle', component: CourseListComponent },
  { path: 'tutorings/:id', component: CourseDetailComponent },
  { path: '',                       redirectTo: 'LogIn', pathMatch: 'full' },
  { path: '**',                     component: PageNotFoundComponent }
];

