import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup
  user:any[]=[]
  gender:string='students'
  constructor(private services:AuthService,
              private fb:FormBuilder,
              private router:Router,
              private toaster:ToastrService){}
  ngOnInit(): void {
    this.getUser()
    this.createForm()
  }
  getRole(kind:any){
    this.gender=kind.value;
    this.getUser()
  }
  createForm(){
    this.loginForm=this.fb.group({
      type:this.gender,
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }
  getUser(){
    this.services.getUser(this.gender).subscribe((res:any)=>{
      this.user=res;
    })
  }
  submit(){
    let index = this.user.findIndex(item => item.email == this.loginForm.value.email && item.password == this.loginForm.value.password  )
    if(index == -1) {
      this.toaster.error("الايميل او كلمة المرور غير صحيحة" , "" , {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut:5000,
        closeButton: true,
      })
    }else {
      const model = {
        username:this.user[index].username,
        role:this.gender,
        userId:this.user[index].id
      }
      this.services.userLogin(model).subscribe((res:any) => {
        this.services.user.next(res)
        this.toaster.success("تم تسجيل الدخول بنجاح" , "" , {
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut:5000,
          closeButton: true,
        })
        this.router.navigate(['/subjects'])
      })
    }
  }
}
