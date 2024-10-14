import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  user:any=null ;
  isSidenavOpen =false
  constructor(private services:AuthService){}
  ngOnInit(): void {
    this.services.user.subscribe((res:any)=>{
      this.user=res;
    })
  }
  logout(){
    const model=({})
    this.services.userLogin(model).subscribe((res:any)=>{
      this.user=res
    })
  }
  sidenav(){
    this.isSidenavOpen = !this.isSidenavOpen
  }
}
