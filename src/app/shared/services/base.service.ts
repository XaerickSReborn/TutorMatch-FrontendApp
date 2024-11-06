import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {inject} from "@angular/core";

/**
 * @class BaseService
 * @description
 * This is a generic base service class that provides common functionality for making HTTP requests
 * to a RESTful API. It includes methods for handling errors, constructing resource paths,
 * and fetching data from the server.
 * @template T - The type of the resource handled by the service.
 */
export class BaseService<T> {
  /**
   * @property httpOptions
   * @description
   * HTTP headers for the requests. The content type is set to JSON.
   */
  protected httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };

  /**
   * @property http
   * @description
   * HTTP client for making requests to the server.
   */
  protected http: HttpClient = inject(HttpClient);

  /**
   * @property basePath
   * @description
   * Base path for the server. This is the URL of the server.
   */
  protected basePath: string = `${environment.serverBasePath}`;

  /**
   * @property resourceEndPoint
   * @description
   * The endpoint for the resource. This is the URL path for the resource.
   */
  protected resourceEndPoint: string = '/resources';

  /**
   * @method handleError
   * @description
   * Handles the error response from the server. It logs the error to the console and returns an observable with the error.
   * @param {HttpErrorResponse} error  - The error response from the server.
   */
  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  /**
   * @method resourcePath
   * @description
   * Build and returns the full path for the resource.
   * @returns {string} The full path for the resource.
   */
  protected resourcePath(): string {
    return `${this.basePath}${this.resourceEndPoint}`;
  }

  /**
   * @method create
   * @description
   * Creates a new resource on the server.
   * @param   {any} item - The item to be created.
   * @returns {Observable<T>} - An observable with the created item.
   */
  public create(item: any): Observable<T> {
    return this.http.post<T>(this.resourcePath(), JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  /**
   * @method delete
   * @description
   * Deletes a resource from the server.
   * @param   {any} id - The id of the resource to be deleted.
   * @returns {Observable<any>} - An observable with the response from the server.
   */
  public delete(id: any): Observable<any> {
    return this.http.delete(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  /**
   * update
   * @description
   * Updates a resource on the server.
   * @param {any} id - The id of the resource to be updated.
   * @param {any} item - The item to be updated.
   * @returns {Observable<T>} - An observable with the updated item.
   */
  public update(id: any, item: any): Observable<T> {
    return this.http.put<T>(`${this.resourcePath()}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  /**
   * @method getAll
   * @description
   * Gets all the resources from the server.
   * @returns {Observable<Array<T>>} - An observable with the array of resources.
   */
  public getAll(): Observable<Array<T>> {
    return this.http.get<Array<T>>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }


  /**
   * @method registerUser
   * @description
   * Registers a new user in the JSON Server.
   * @param {any} user - The user data to be registered.
   * @returns {Observable<any>} - An observable with the created user data.
   */
  public registerUser(user: any): Observable<any> {
    return this.http.post<any>(this.resourcePath(), JSON.stringify(user), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * @method createTutoring
   * @description
   * Creates a new tutoring session by sending the tutoring data to the JSON Server.
   * @param {any} tutoring - The tutoring session data to be created.
   * @returns {Observable<any>} - An observable with the created tutoring session data.
   */
  public createTutoring(tutoring:any): Observable<any> {
    return this.http.post<any>(this.resourcePath(), JSON.stringify(tutoring), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  /**
   * @method editTutoring
   * @description
   * Updates an existing tutoring session in the JSON Server.
   * @param {any} id - The ID of the tutoring session to be updated.
   * @param {any} item - The tutoring session data to be updated.
   * @returns {Observable<any>} - An observable with the updated tutoring session data.
   */

  public editTutoring(id: any, item: any): Observable<any> {
    return this.http.put<T>(`${this.resourcePath()}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  /**
   * @method updateUser
   * @description
   * Updates an existing user in the JSON Server.
   * @param {T} user - The user data to be updated.
   * @param {number} id - The ID of the user to be updated.
   * @returns {Observable<T>} - An observable with the updated user data.
   */
  public updateUser(user: T, id: number): Observable<T> {
    return this.http.put<T>(`${this.resourcePath()}/${id}`, JSON.stringify(user), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

}
