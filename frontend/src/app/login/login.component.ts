import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private http: HttpService,
    private authService: AuthService,
    private router: Router
  ) {}

  login(form: any, event: Event) {
    event.preventDefault();

    if (
      form.email.value === null ||
      form.email.value.trim() === '' ||
      form.password.value === null ||
      form.password.value.trim() === ''
    ) {
      alert('Fill the FORM');
      return;
    }

    this.http.login(form.email.value, form.password.value).subscribe(
      (data: any) => {
        // console.log('Login successful:', data);
        alert('success 👍');
        

        this.authService.login(data.Token);
        this.http.setHeaders()
        form.reset();
        this.router.navigate(['/dashboard']);
      },
      (error: any) => {
        alert('Login Failed !⚠');
        form.reset();
      }
    );
  }
}
