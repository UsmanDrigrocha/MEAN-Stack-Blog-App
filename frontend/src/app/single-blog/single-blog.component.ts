import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css'],
})
export class SingleBlogComponent {
  blogId: string = '';
  blog: any = '';
  comments: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private router: Router // private location: Locationtion
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.blogId = params['id'];
      console.log(this.blogId);
      this.fetchBlogDetails();
    });
  }

  fetchBlogDetails() {
    this.http.getSingleBlog(this.blogId).subscribe(
      (data: any) => {
        this.blog = data;
        this.comments = data.comments;
      },
      (error: any) => {
        alert(`Error fetching blog details:`);
        console.error('Error fetching blog details:', error);
      }
    );
  }

  comment = ' ';

  addComment() {
    // const commentElement = document.querySelector(
    //   '#comment'
    // ) as HTMLTextAreaElement | null;
    // const commentValue = commentElement?.value;

    const accessToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });

    // Creating User
    this.http.createComment(this.blogId, this.comment).subscribe(
      (response) => {
        alert('Comment Created Successfully !');
        this.comment = '';
        this.fetchBlogDetails();
      },
      (error) => {
        console.error('Error occurred while uploading: ', error);
      }
    );
  }
}
