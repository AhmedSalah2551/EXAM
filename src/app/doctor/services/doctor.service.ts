import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }
  setSubjects(model:any){
    return this.http.post(environment.baseApi+'subjects', model)
  }
  deleteQuestion(model:any,id:number){
    return this.http.put(environment.baseApi+'subjects/'+id , model)
  }
  getSubjects(){
    return this.http.get(environment.baseApi+'subjects/')
  }
  getSubjectsByID(id:number){
    return this.http.get(environment.baseApi+'subjects/'+id)
  }
  deleteSubject(id:number) {
    return this.http.delete(environment.baseApi + 'subjects/'+id)
  }
}
