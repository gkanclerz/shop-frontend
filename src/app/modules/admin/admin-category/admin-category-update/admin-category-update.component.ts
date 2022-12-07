import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminMessageService } from '../../admin-message.service';
import { AdminCategoryService } from '../admin-category.service';
import { AdminCategory } from '../model/adminCategory';

@Component({
  selector: 'app-admin-category-update',
  templateUrl: './admin-category-update.component.html',
  styleUrls: ['./admin-category-update.component.scss']
})
export class AdminCategoryUpdateComponent implements OnInit {

  categoryForm! : FormGroup;
  constructor(
    private formBuilder : FormBuilder,
    private adminCategoryService : AdminCategoryService,
    private adminMessageService : AdminMessageService,
    private snackBar : MatSnackBar,
    private route : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name : ["",[Validators.required, Validators.minLength(4)]],
      description : [""],
      slug : ["",[Validators.required, Validators.minLength(4)]]
    })
    this.getCategory();
  }

  getCategory(){
    this.adminCategoryService.getCategory(Number(this.route.snapshot.params['id']))
    .subscribe(category => this.mapToFromValues(category));
  }
  
  submit(){
    this.adminCategoryService.saveCategory(Number(this.route.snapshot.params['id']), this.categoryForm.value)
    .subscribe({
      next: category => {
        this.mapToFromValues(category);
        this.snackBar.open("Kategoria została zapisana", "", {duration:3000})
      },
      error: err => {
        this.adminMessageService.addSpringErrors(err.error);
      }
    })
  }

  private mapToFromValues(category: AdminCategory) {
    this.categoryForm.setValue({
      name : category.name,
      description : category.description,
      slug : category.slug
    });
  }

}
