import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChwComponent } from './chw/chw.component';
import { FormComponent } from './chw/form/form.component';
import { SelectedChwComponent } from './chw/selected-chw/selected-chw.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'login', component: LoginComponent },
  {path: 'chw', component: ChwComponent },
    { path: 'chw/form', component: FormComponent},
    { path: 'chw/form/:id', component: FormComponent},
    { path: 'chw/:id', component: SelectedChwComponent},
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
