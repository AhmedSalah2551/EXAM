import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  user:any=null ;
  title = 'MCQ-EXAM';
  showFiller = false;
  constructor(private services:AuthService){
    this.getUserData();
  }
  ngOnInit(): void {
    this.services.user.subscribe((res:any)=>{
      this.user=res;
    })
  }
  getUserData(){
    this.services.getRole().subscribe((res:any)=>{
      this.services.user.next(res)
      this.user = res;
    })
  }
  logout(){
    const model=({})
    this.services.userLogin(model).subscribe((res:any)=>{
      this.user=res
    })
  }
}
