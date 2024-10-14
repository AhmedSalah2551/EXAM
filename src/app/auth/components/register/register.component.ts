import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!:FormGroup
  students:any[]=[]
  gender:string="students"
  constructor(private services:AuthService,
              private fb:FormBuilder,
              private router:Router,
              private toaster:ToastrService){}
  ngOnInit(): void {
    this.createRegForm()
    this.getStudents()
  }
  createRegForm(){
    this.form=this.fb.group({
      username:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      repassword:['',[Validators.required]],
    })
  }
  getStudents(){
    this.services.getUser(this.gender).subscribe((res:any)=>{
      this.students=res
    })
  }
  submit(){
    const model={
      username:this.form.value.username,
      email:this.form.value.email,
      password:this.form.value.password
    }
    let index=this.students.findIndex(item=>item.email==this.form.value.email);
    if(index !== -1){
      this.toaster.error("البريد الالكتروني موجود مسبقا");
    }else{
      this.services.createStudent(model).subscribe((res:any)=>{
        this.toaster.success("تم التسجيل بنجاح");
        const model = {
          username:res.username,
          role:'students',
          userId:res.id
        }
        this.services.userLogin(model).subscribe(res => {
          this.services.user.next(res)
        })
        this.router.navigate(['/subjects'])
      })
    }
      }
    }
