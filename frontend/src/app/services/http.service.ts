import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseURL = 'http://localhost:9000/api/user/';
  accessToken = localStorage.getItem('token');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.accessToken}`,
  });
  
  constructor(private http: HttpClient) {}


  login(email: any, password: any) {
    return this.http.post(
      this.baseURL + 'login',
      { email: email, password: password }
      // { headers: this.headers }
    );
  }

  register(name: any, email: any, password: any, role: any) {
    return this.http.post(this.baseURL + 'register', {
      name: name,
      email: email,
      password: password,
      role: role,
    });
  }

  deleteBlog(id: any) {
    return this.http.delete(this.baseURL + `deleteBlog/${id}`, {
      headers: this.headers,
    });
  }

  getAllBlogs() {
    // debugger;
    console.log(this.headers);
    return this.http.get(this.baseURL + 'getAllBlogs', {
      headers: this.headers,
    });
  }

  createBlog(title: any, content: any) {
    return this.http.post(
      this.baseURL + 'createBlog',
      {
        title: title,
        content: content,
      },
      { headers: this.headers }
    );
  }

  getSingleBlog(id: any) {
    return this.http.get(this.baseURL + `getBlog/${id}`, {
      headers: this.headers,
    });
  }

  createComment(id: any, content: any) {
    return this.http.post(
      this.baseURL + `createComment/${id}`,
      {
        content: content,
      },
      {
        headers: this.headers,
      }
    );
  }

  updateBlog(id: any, title: any, content: any) {
    return this.http.patch(
      this.baseURL + `updateBlog/${id}`,
      {
        title: title,
        content: content,
      },
      {
        headers: this.headers,
      }
    );
  }

  setHeaders() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.accessToken}`,
    });
  }
}
