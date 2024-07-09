import { ChangeDetectorRef, Component, inject, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { CategoriesService } from './categories.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResponseCategories } from './categories.model';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { MatTabsModule } from '@angular/material/tabs'


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,ModalComponent,MatTabsModule,ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  providers: [CategoriesService]
  

})
export class CategoriesComponent {
  formCategory: FormGroup;
  selectedCategory: ResponseCategories | null; 
  categories: ResponseCategories[] = [];

  @ViewChild('modalUpdate') modal:ModalComponent;
  @ViewChild('modalAdd') modalAdd:ModalComponent;
  @ViewChild('modalDelete') modalDelete:ModalComponent;

  


  constructor(
    private cdr: ChangeDetectorRef,
    private categoriesService: CategoriesService,
    private fb: FormBuilder
  ){
    this.formCategory = this.fb.group({
      name: [null, [Validators.required]],
    });
  this.getAllCategories();


  }
  open(){
    this.modal.openModal('Category');
  }
  closeModal(){
    this.modal.closeModal();
  }
  openAdd(){
    this.modalAdd.openModal('Category Add')
  }
  closeAddModal(){
    this.modalAdd.closeModal();
    this.formCategory.reset();
  }
  openDelete(id:string){
    this.Edit(id);
    this.modalDelete.openModal('Are you sure you want to delete the Category named '+this.selectedCategory?.name+'?')
  }
  closeDelete(){
    this.modalDelete.closeModal();
  }

  Edit(selectedid?: string) {
    this.selectedCategory = this.categories.filter(
      (item) => item.id === selectedid
    )[0];
    this.formCategory.get('id')?.setValue(this.selectedCategory?.id);
    this.formCategory.get('name')?.setValue(this.selectedCategory?.name);
  }
  EditWithOpen(selectedid?: string) {
    this.selectedCategory = this.categories.filter(
      (item) => item.id === selectedid
    )[0];
    this.formCategory.get('id')?.setValue(this.selectedCategory?.id);
    this.formCategory.get('name')?.setValue(this.selectedCategory?.name);
    this.open();
  }
  
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
  add(){
    if(this.formCategory.valid){
      const categoryName = this.formCategory.get('name')?.value;
      this.categoriesService.CategoryAdd(categoryName).subscribe(
        (response) => {
          console.log('Category added successfully', response);
          this.getAllCategories();
          this.closeAddModal();
          this.formCategory.reset();
        },
        (error) => {
          console.error('Error adding category', error);
          this.getAllCategories();
          this.closeAddModal();
          this.formCategory.reset();
        }
      );
    }
    else{
      window.alert('Zorunlu Alanları Giriniz.');
    }
  }

  update(){
    if(this.formCategory.valid){
      const categoryName = this.formCategory.get('name')?.value;
      const Id = this.selectedCategory!.id;
      this.categoriesService.CategoryUpdate(categoryName,Id).subscribe(
        (response) => {
          console.log('Category added successfully', response);
          this.getAllCategories();
          this.closeModal();
          this.formCategory.reset();
        },
        (error) => {
          console.error('Error adding category', error);
          this.getAllCategories();
          this.closeModal();
          this.formCategory.reset();
        }
      );
    }
    else{
      window.alert('Zorunlu Alanları Giriniz.');
    }
  }


  deleteCategoryById(): void {
    this.categoriesService.deleteCategory(this.selectedCategory!.id).subscribe(
      () => {
        console.log('Category deleted successfully');
        this.closeDelete();
        this.getAllCategories();
      },
      (error) => {
        this.getAllCategories();
        this.closeDelete();
      }
    );
  }
 

}
