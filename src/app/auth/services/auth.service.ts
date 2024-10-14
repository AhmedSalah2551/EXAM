import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http :HttpClient) { }
  user= new Subject();
  createStudent(model:any){
    return this.http.post(environment.baseApi +'students', model)
  }
  getUser(param:string){
    return this.http.get(environment.baseApi + param)
  }
  userLogin(model:any){
    return this.http.put(environment.baseApi+"login/1", model)
  }
  getRole(){
    return this.http.get(environment.baseApi+"login/1")
  }
  getStudentByID(id:number){
    return this.http.get(environment.baseApi +'students/'+id)
  }
  getAllStudents(){
    return this.http.get(environment.baseApi +'students')
  }
  updateStudent(id:number,model:any){
    return this.http.put(environment.baseApi +'students/'+id , model)
  }
}
