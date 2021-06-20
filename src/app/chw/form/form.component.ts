import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ChwService } from 'src/app/_service/chw.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  ChwData: { first_name: any; middle_name: any; last_name: any; email: any; roles: any; password: any; }
  ChwProfileData: { user: any; tel: any; status: any; position: any;}
  ChwID: any
  isAddMode: boolean;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder, 
    private router: Router, 
    private chwService: ChwService) { }

  ngOnInit(): void {
    this.ChwID = this.route.snapshot.params['id'];
    this.isAddMode = !this.ChwID;

    // Check if it is Create Or Update
    if  (!this.isAddMode) {
      this.chwService.findChw(this.ChwID).pipe(first())
        .subscribe(x =>{
          console.log(x) 
          this.registrationForm.patchValue(Object.assign({}, ...x)) 
        }       
        )
    }

    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
        passwordValidators.push(Validators.required);
    }
   
  }

  // only fill the fields with no default value
  registrationForm = this.fb.group({
    first_name:  ['',[Validators.required]],
    middle_name: ['',[Validators.required]],
    last_name: ['',[Validators.required]],
    email: ['',[Validators.required,Validators.email,]],
    position: ['',[Validators.required]],
    status: ['',[Validators.required]],
    tel: ['',[Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6),this.isAddMode ? Validators.required : Validators.nullValidator]],
    confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator],
  }) 

  getErrorMessage() {
    if (this.registrationForm.get('email').hasError('required')) {
      return 'You must enter a value for email';
    }
    return this.registrationForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit(){
    if (this.isAddMode) {
      this.createChw()
    } else {
      this.updateChw();
    }

  }

  private createChw(){
        //Data to create a member
        this.ChwData= {
          "first_name":this.registrationForm.value.first_name,
          "middle_name":this.registrationForm.value.middle_name,
          "last_name":this.registrationForm.value.last_name,
          "email":this.registrationForm.value.email,
          "roles": 2,
          "password": this.registrationForm.value.password  
        }
    
    this.chwService.createChw(this.ChwData).subscribe(result => {
      this.ChwID = result.id,
    
        //Data to create a member Profile inside the subscribe funx of create member
        this.ChwProfileData= {
          "user": this.ChwID,
          "tel":this.registrationForm.value.tel,
          "status":this.registrationForm.value.status,
          "position":this.registrationForm.value.position, 
        }
      this.chwService.createChwProfile(this.ChwProfileData).
            subscribe(result => console.log('succeesful created Profile', result))
            this.router.navigateByUrl('/chw');
      }
    );
    
  }

  private updateChw(){
   //Data to create a member
   this.ChwData= {
    "first_name":this.registrationForm.value.first_name,
    "middle_name":this.registrationForm.value.middle_name,
    "last_name":this.registrationForm.value.last_name,
    "email":this.registrationForm.value.email,   
    "roles": 2,
    "password":this.registrationForm.value.password
   }


  this.chwService.updateChw(this.ChwID, this.ChwData)
  .pipe(first())
  .subscribe({
      next: result => {
          // this.alertService.success('User updated', { keepAfterRouteChange: true });
          // this.router.navigate(['../../'], { relativeTo: this.route });
          this.ChwID = result.id,
  
          //Data to create a member Profile inside the subscribe funx of create member
          this.ChwProfileData= {
            "user": this.ChwID,
            "tel":this.registrationForm.value.tel,
            "status":this.registrationForm.value.status,
            "position":this.registrationForm.value.position 
          }
        this.chwService.updateChwProfile(this.ChwID,this.ChwProfileData)
            .pipe(first())
            .subscribe(result => console.log('succeesful created Profile', result)),
            this.router.navigateByUrl('/chw');
          
      },
      error: error => {
          // this.alertService.error(error);
          // this.loading = false;
      }
  });
 
  }

}
