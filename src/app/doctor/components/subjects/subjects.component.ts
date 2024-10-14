import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit{
  users:any
  subjects:any[]=[]
  constructor(private services:DoctorService,
              private auth:AuthService,
              private route:ActivatedRoute,
              private toaster:ToastrService){}
  ngOnInit(): void {
    this.getSubjects()
    this.getUsers()
  }
  getUsers(){
    this.auth.getRole().subscribe((res:any)=>{
      this.users=res;
    })
  }
  getSubjects(){
    this.services.getSubjects().subscribe((res:any)=>{
      this.subjects=res
    })
  }
  delete(index:number) {
    let id  = this.subjects[index].id
    this.subjects.splice(index , 1)
    this.services.deleteSubject(id).subscribe(res => {
      this.toaster.success("تم حذف المادة بنجاح")
    })
  }
}
