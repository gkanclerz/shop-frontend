import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { startWith, switchMap } from 'rxjs';
import { AdminConfirmDialogService } from '../common/service/admin-confirm-dialog.service';
import { AdminReviewService } from './admin-review.service';
import { AdminReview } from './model/adminReview';

@Component({
  selector: 'app-admin-review',
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.scss']
})
export class AdminReviewComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>; 
  displayedColumns : string [] = ["id","authorName","content","moderated","actions"];
  totalElements : number = 0;

  data: AdminReview[] = [];

  constructor(
    private adminReviewService : AdminReviewService,
    private adminConfirmDialogService : AdminConfirmDialogService
    ) { }


  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.adminReviewService.getReviews(this.paginator.pageIndex, this.paginator.pageSize);
      }),
    ).subscribe(data => {
      this.totalElements = data.totalElements;
      this.data = data.content;
    })
  }

  confirmDelete(element : AdminReview){
    this.adminConfirmDialogService.openConfirmDialog("Czy na pewno chcesz usunąć tą opinię?")
    .afterClosed()
    .subscribe(result => {
      if(result){
        this.adminReviewService.deleteReview(element.id)
        .subscribe(() => {
          this.data.forEach((value, index) =>{
            if(element == value){
              this.data.splice(index,1);
              this.table.renderRows();
            }
          })
        })
      }
    });
  }

  acceptReview(element : AdminReview){
    this.adminConfirmDialogService.openConfirmDialog("Czy na pewno chcesz zaakceptować tą opinię?")
    .afterClosed()
    .subscribe(result => {
      if(result){
        this.adminReviewService.moderateReview(element.id)
        .subscribe(() => {
          this.data.forEach((value, index) =>{
            if(element == value){
              element.moderated = true;
            }
          })
        })
      }
    });
  }

}

