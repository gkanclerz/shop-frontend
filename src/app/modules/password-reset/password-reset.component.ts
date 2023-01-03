import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ActivatedRouteSnapshot, Route, Router } from '@angular/router';
import { PasswordChangeDto } from './model/passwordChangeDto';
import { PasswordResetService } from './password-reset.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  passwordResetForm!: FormGroup;
  errorMessage = "";

  constructor(
    private formBuilder: FormBuilder,
    private passwordResetService: PasswordResetService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.passwordResetForm = this.formBuilder.group({
      password:['',Validators.required],
      repeatPassword:['',Validators.required]
    })
  }

  submit(){
    let link = this.route.snapshot.params["link"]
    this.passwordResetService.changePassword({
      password: this.passwordResetForm.get('password')?.value,
      repeatPassword: this.passwordResetForm.get('repeatPassword')?.value,
      link: link
    } as PasswordChangeDto)
    .subscribe({
      next: () =>{
        this.router.navigate(["/login"]);
        this.snackBar.open('Hasło zostało zmienione', '', {
          duration: 3000, panelClass: "snack-bar-bg-color-ok" });
      },
      error: err => {
        this.errorMessage = err.error.message
      }
    })
  }



}
