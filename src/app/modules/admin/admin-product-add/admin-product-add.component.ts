import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { AdminMessageService } from '../admin-message.service';
import { AdminProductAddService } from './admin-product-add.service';

@Component({
  selector: 'app-admin-product-add',
  templateUrl: './admin-product-add.component.html',
  styleUrls: ['./admin-product-add.component.scss']
})
export class AdminProductAddComponent implements OnInit {

  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminProductAddService: AdminProductAddService,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminMessageService: AdminMessageService
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(4)]],
      description: ['',[Validators.required, Validators.minLength(4)]],
      category: ['',[Validators.required, Validators.minLength(4)]],
      price: ['',[Validators.required, Validators.min(0)]],
      currency: ['PLN',Validators.required],
      slug : ['',[Validators.required, Validators.minLength(4)]]
    })
  }

  submit() {
    this.adminProductAddService.saveNewProduct(this.productForm.value)
      .subscribe({
        next: product => {
          this.router.navigate(["/admin/products/update", product.id])
            .then(() => this.snackBar.open("Produkt został pomyślnie dodany")._dismissAfter(5000));
        },
        error: err => this.adminMessageService.addSpringErrors(err.error)
      })
  }

}
