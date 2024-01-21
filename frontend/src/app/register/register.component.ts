import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
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
      form.password.value.trim() === '' ||
      form.name.value === null ||
      form.name.value.trim() === ''
    ) {
      alert('Fill the FORM');
      return;
    }

    console.table({
      email: form.email.value,
      password: form.password.value,
      name: form.name.value,
      role: form.role.value,
    });

    this.http
      .register(
        form.email.value,
        form.password.value,
        form.name.value,
        form.role.value
      )
      .subscribe(
        (data: any) => {
          alert('Registered 👍');
          form.reset();
          this.router.navigate(['/login']);
        },
        (error: any) => {
          alert('Registeration Failed !⚠');
          form.reset();
        }
      );
  }
}
