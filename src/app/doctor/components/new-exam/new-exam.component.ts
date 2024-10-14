import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../../services/doctor.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {
  subjects: any[] = []
  moving: boolean = false
  examForm!: FormGroup
  correctAnswer: string = ""
  selected: number = 0
  subjName: any
  answer: any
  preview: boolean = false
  id: any
  constructor(private fb: FormBuilder,
              private services: DoctorService,
              private toaster: ToastrService) {}
  ngOnInit(): void {
    this.createExam()
  }
  createExam() {
    this.examForm = this.fb.group({
      question: ["", [Validators.required]],
      answer1: ["", [Validators.required]],
      answer2: ["", [Validators.required]],
      answer3: ["", [Validators.required]],
      answer4: ["", [Validators.required]],
      correct: [""]
    })
  }
  start(event: any) {
    this.subjName = event.value
    if (this.subjName !== "") {
      this.moving = true
      this.selected = 1
    }
  }
  finish() {
    const model = {
      name: this.subjName,
      questions: this.subjects
    }
    if (this.preview) {
      this.selected = 2
    } else {
      this.services.setSubjects(model).subscribe((res: any) => {
        this.preview = true;
        this.id = res.id
      })
    }
  }
  selectedAnswer(event: any) {
    this.answer = event.value
  }
  save() {
    if (this.answer) {
      const model = ({
        question: this.examForm.value.question,
        answer1: this.examForm.value.answer1,
        answer2: this.examForm.value.answer2,
        answer3: this.examForm.value.answer3,
        answer4: this.examForm.value.answer4,
        rightAnswer: this.examForm.value[this.answer]
      })
      this.subjects.push(model)
      console.log(this.subjects)
      this.examForm.reset()
    } else {
      this.toaster.error("يجب اختيار الاجابة الصحيحة" , "" , {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut:5000,
        closeButton: true,
      })
    }
  }
  cancel() {
    this.moving = false
    this.examForm.reset()
    this.correctAnswer = ""
    this.subjects = []
    this.selected = 0
    this.subjName = ""
  }
  delete() {
    this.examForm.reset()
  }
  deleteQuestion(index: number) {
    this.subjects.splice(index, 1)
    const model = ({
      name: this.subjName,
      questions: this.subjects
    })
    this.services.deleteQuestion(model, this.id).subscribe(res => {
      this.toaster.success("تم الحذف بنجاح" , "" , {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut:5000,
        closeButton: true,
      })
    })
  }
}
