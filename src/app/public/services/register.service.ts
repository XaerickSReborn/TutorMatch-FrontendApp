import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {catchError, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
/**
 * @class RegisterService
 * @description This service handles user registration and role management.
 * @extends BaseService<any>
 */
export class RegisterService extends BaseService<any>{

  constructor() {
    super();
    this.resourceEndPoint='/users'
  }

  /**
   * @property userRole {string}
   * @description Stores the current user's role.
   */
  private userRole: string = '';

  /**
   * @method setUserRole
   * @description Sets the current user's role.
   * @param {string} role - The user's role.
   */
  setUserRole(role: string) {
    this.userRole = role;
  }

  /**
   * @method getUserRole
   * @description Gets the current user's role.
   * @returns {string} The user's role.
   */
  getUserRole(): string {
    return this.userRole;
  }

  /**
   * @method getTutors
   * @description Retrieves all users with the role of 'teacher' (tutors).
   * @returns {Observable<any[]>} - An observable containing an array of tutor users.
   */
  getTutors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.resourcePath()}`)
      .pipe(
        map(users => users.filter(user => user.role === 'teacher' && user.tutorId != null)),
        catchError(this.handleError)
      );
  }
}
