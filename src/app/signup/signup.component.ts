import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { UserData } from "../user.model";

@Component({
    selector:'app-signup',
    templateUrl:'./signup.component.html',
    styleUrls:['./signup.component.css']
})

export class signupComponent{
    @ViewChild('e') signupForm: NgForm;
    user: UserData;
    constructor(private router: Router, private authService: AuthService){}
    onSignUp(){

        this.user= new UserData(this.signupForm.value.name,this.signupForm.value.email,this.signupForm.value.password)
        const x=this.authService.signUp(this.user)
            this.signupForm.reset()
    }
    toLogIn(){
        this.router.navigate(['/login'])
    }
}