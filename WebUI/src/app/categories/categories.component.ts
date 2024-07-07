import { ChangeDetectorRef, Component, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { CategoriesService } from './categories.service';
import { FormBuilder } from '@angular/forms';
import { ResponseCategories } from './categories.model';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,ModalComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  providers: [CategoriesService]

})
export class CategoriesComponent {



  constructor(
    private cdr: ChangeDetectorRef,
    private categoriesService: CategoriesService,
    private fb: FormBuilder
  ){
  this.getAllCategories();


  }
  categories: ResponseCategories[] = [];

  getAllCategories(): void {
    console.log('metotda')
    this.categoriesService.getAll()
      .subscribe(
        (data) => {
          this.categories = data;
          console.log('Categories:', this.categories);
        },
        (error) => {
          console.error('Error fetching categories:', error);
        }
      );
  }


}
