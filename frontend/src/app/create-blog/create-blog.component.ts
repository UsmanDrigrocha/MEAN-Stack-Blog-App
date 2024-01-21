import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
})
export class CreateBlogComponent {
  blog = {
    title: '',
    content: '',
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.blogId = params['id'];
      console.log(this.blogId);
    });
  }

  blogId = '';

  create(form: any, e: Event) {
    this.blog.title = form.title.value;
    this.blog.content = form.content.value;

    if (this.validateForm()) {
      console.log('Submitted Blog:', this.blog);

      // Creating User
      this.http.createBlog(this.blog.title, this.blog.content).subscribe(
        (response) => {
          alert('Blog Created Successfully !');
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
}
