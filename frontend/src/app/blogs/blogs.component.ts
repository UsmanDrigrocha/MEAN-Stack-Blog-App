import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent {
  blogs: any[] = [];

  constructor(private http: HttpService, private router: Router) {}

  ngOnInit() {
    this.getBlogs();
  }

  deleteBlog(blog: any) {
    console.log(blog);
    const accessToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
    this.http.deleteBlog(blog ).subscribe(
      (data: any) => {
        alert('Deleted');
        this.getBlogs();
      },
      (error: any) => {
        if (error.error.status === 404) {
          alert('Only Author Can Delete!');
        } else {
          alert('Error Deleting Blog!');
        }
      }
    );
  }

  openBlog(blogId: string) {
    // Navigate to the blog detail page with the blog id
    this.router.navigate(['/blog', blogId]);
  }

  editBlog(id: any) {
    this.router.navigate(['/update-blog', id]);
  }

  getBlogs() {
    const accessToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });

    console.log(accessToken);
    this.http.getAllBlogs()
      .subscribe((data: any) => {
        this.blogs = data.Blogs;
      });
  }
}
