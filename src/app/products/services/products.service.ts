import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, retry, throwError } from "rxjs";
import { Product} from "../model/product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // Students Endpoint
  basePath = 'http://localhost:5000/api/products';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default Error Handling
      console.log(`An error occurred ${error.status}, body was: ${error.error}`);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // Return Observable with Error Message to Client
    return throwError(() => new Error('Something happened with request, please try again later.'));
  }

  // Create Product
  create(item: any): Observable<Product> {
    return this.http.post<Product>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }


downloadFile(){
  return this.http.get(`${this.basePath}/download`,
    { responseType: "blob" });
}


  // Get Product by id
  getById(id: any): Observable<Product> {
    return this.http.get<Product>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Get all products
  getAll(): Observable<Product> {
    return this.http.get<Product>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  update(id: any, item: any): Observable<Product> {
    return this.http.put<Product>(`${this.basePath}/${id}`, JSON.stringify(item),this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Delete student
  delete(id: any): Observable<Product> {
    return this.http.delete<Product>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }


}
