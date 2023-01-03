import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminMessageService } from '../admin/common/service/admin-message.service';
import { PasswordLostService } from './password-lost.service';

@Component({
  selector: 'app-password-lost',
  templateUrl: './password-lost.component.html',
  styleUrls: ['./password-lost.component.scss']
})
export class PasswordLostComponent implements OnInit {

  passwordLostForm!: FormGroup;
  valid = false;
  errorMessage = "";


  constructor(
    private formBuilder: FormBuilder,
    private passwordLostService: PasswordLostService
  ) { }

  ngOnInit(): void {
    this.passwordLostForm = this.formBuilder.group({
      username:['', [Validators.required,Validators.email]]
    })
  }

  submit(){
    if(this.passwordLostForm.valid){
      this.passwordLostService.submit(this.passwordLostForm.value)
        .subscribe({
          next: () => {
            this.valid = true
          },
          error: err => {
            this.valid = false;
            this.errorMessage = err.error.message
          }
        });
    }
  }

}
