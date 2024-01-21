import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css'],
})
export class UpdateBlogComponent {
  constructor(
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.blogId = params['id'];
      console.log(this.blogId);
    });
    this.getBlogValues(this.blogId);
  }

  blogId = '';

  blog = {
    title: '',
    content: '',
  };

  update(form: any, e: Event) {
    this.blog.title = form.title.value;
    this.blog.content = form.content.value;

    if (this.validateForm()) {
      console.log('Submitted Blog:', this.blog);
      const accessToken = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      });

      // Creating User
      this.http
        .updateBlog(this.blogId, this.blog.title, this.blog.content)
        .subscribe(
          (response) => {
            alert('Blog Updated Successfully !');
            this.router.navigate(['/blogs']);
          },
          (error) => {
            console.error('Error occurred while uploading: ', error);
          }
        );
    }
  }

  validateForm(): boolean {
    if (!this.blog.title || !this.blog.content) {
      alert('Please fill in all fields');
      return false;
    }

    return true;
  }

  BlogData = {
    content: '',
    title: '',
  };

  getBlogValues(id: any) {
    const accessToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
    this.http.getSingleBlog(this.blogId).subscribe(
      (data: any) => {
        console.log(data);
        this.BlogData.title = data.title;
        this.BlogData.content = data.content;
      },
      (error) => {
        alert('Error Getting Blog !');
      }
    );
  }
}
