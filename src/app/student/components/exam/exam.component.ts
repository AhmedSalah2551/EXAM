import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DoctorService } from 'src/app/doctor/services/doctor.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit{
  user:any
  subjects:any
  id:any
  showResult:boolean=false
  total:number=0
  student:any
  subject:any
  tested:boolean=true
  degree:number=0
  constructor(private auth:AuthService,
              private services:DoctorService,
              private route:ActivatedRoute,
              private toaster:ToastrService){}
  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get("id")
    this.getSubject()
    this.getUsers()
  }
  getUsers(){
    this.auth.getRole().subscribe((res:any)=>{
      this.user=res;
      this.getStudentInfo()
    })
  }
  getSubject(){
    this.services.getSubjectsByID(this.id).subscribe((res:any)=>{
      this.subjects=res
    })
  }
  getStudentInfo(){
    this.auth.getStudentByID(this.user.userId).subscribe((res:any)=>{
      this.student=res
      this.subject=res?.subjects ? res?.subjects : []
      this.check()
    })
  }
  getAnswer(event:any){
    let answer=event.value
    let ind=event.source.name
    this.subjects.questions[ind].studentAnswer=answer;
  }
  getResult(){
    for(let x in this.subjects.questions){
      if(this.subjects.questions[x].studentAnswer == this.subjects.questions[x].rightAnswer        ){
        this.total++
      }
    }
    this.degree=this.total;
    this.showResult=true
    this.subject.push({
      name:this.subjects.name,
      id:this.subjects.id,
      degree:this.total
    })
    const model=({
      username:this.student.username,
      email:this.student.email,
      password:this.student.password,
      id:this.student.id,
      subjects:this.subject
    })
    this.auth.updateStudent(this.user.userId,model).subscribe(res=>{
      window.location.reload()
    })
    this.toaster.success("تم اكمال الامتحان بنجاح" , "" , {
      disableTimeOut: false,
      titleClass: "toastr_title",
      messageClass: "toastr_message",
      timeOut:5000,
      closeButton: true,
    })
  }
  check(){
    for(let x in this.subject)
    if(this.subject[x].id == this.id){
      this.tested=false
      this.degree=this.subject[x].degree;
    }
  }
  delete(index:number){
    this.subjects.questions.splice(index,1)
    const model=({
      name:this.subjects.name,
      questions:this.subjects.questions
    })
    this.services.deleteQuestion(model,this.id).subscribe(res=>{
      this.toaster.success("تم حذف السؤال بنجاح" , "" , {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut:5000,
        closeButton: true,
      })
    })
  }
}
