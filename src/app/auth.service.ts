import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { UserData } from "./user.model";
import { UserCredentials } from "./userCredentials.model";
import { Router } from "@angular/router";
@Injectable()


export class AuthService{
    isLoggedInEmitter=new EventEmitter<boolean>();
    isLoggedIn: boolean=false;
    x:boolean;
    constructor(private http: HttpClient, private router: Router){}
    signUp(x:UserData){
        this.http.get<any>("http://localhost:3000/users").subscribe(res=>{
            const user=res.find((a:any)=>{
                return a.email === x.email
            });
            this.x=user
            if(user){
                alert("email already exists!!")
                
            }
            else{
                this.http.post("http://localhost:3000/users",x)
                .subscribe(
                    response=>{
                        console.log(response);
                    }
                );
                alert("user created!!")

                this.router.navigate(['/login'])


            }
        })
        
        return this.x
    }

    logIn(y:UserCredentials){
        const userCred=y;
        console.log(userCred)
        return this.http.get<any>("http://localhost:3000/users")
    }

    logOut(){

    }
}