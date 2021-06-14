import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  formA = this.fb.group({
    username: ['', Validators.email],
    password: ['', Validators.required]
  });

  ngOnInit(){}

  onSubmit(){

    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    this.formSubmitAttempt = true;
    this.router.navigateByUrl('/home');
    }
  
}