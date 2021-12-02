import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { UserCredentials } from "../userCredentials.model";

@Component({
    selector:'app-login',
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css']
})

export class loginComponent{
    @ViewChild('e') loginForm: NgForm;
    userCredentials: UserCredentials;
    constructor(private router : Router, private authService: AuthService){}

    onLogIn(){
        this.userCredentials=new UserCredentials(this.loginForm.value.email,this.loginForm.value.password)
        this.authService.logIn(this.userCredentials)
        .subscribe(res=>{
            const user=res.find((a:any)=>{
                return a.email === this.loginForm.value.email && a.password=== this.loginForm.value.password
            });
            if(user){
                this.authService.isLoggedIn=true
                this.authService.isLoggedInEmitter.emit(this.authService.isLoggedIn)
                this.router.navigate(['/products'])
            }
            else{
                window.alert("enter valid credentials")
                this.loginForm.reset()
            }
        })
    }
    toSignUp(){
        this.router.navigate(['/signup'])

    }
}