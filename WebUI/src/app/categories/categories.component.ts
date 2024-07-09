import { ChangeDetectorRef, Component, inject, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { CategoriesService } from './categories.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResponseBooks, ResponseCategories } from './categories.model';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { MatTabsModule } from '@angular/material/tabs'
declare var alertify:any;

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
  Books: ResponseBooks[] = [];


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
  alertify.set('notifier', 'position', 'top-right');
  this.getAllBook();
  }
  open(){
    this.modal.openModal('Category');
  }
  closeModal(){
    this.modal.closeModal();
  }
  openAdd(){
    this.formCategory.reset();
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
    this.categoriesService.getAll()
      .subscribe(
        (data) => {
          this.categories = data;
        },
        (error) => {
          console.error('Error fetching categories:', error);
        }
      );
  }
  add(){
    if(this.formCategory.valid){
      const filteredAuthor=this.categories.filter((item)=>item.name==this.formCategory.value.name)
      if(filteredAuthor.length>0){
        alertify.error('It\'s from the same category')
      }
     else{
      const categoryName = this.formCategory.get('name')?.value;
      this.categoriesService.CategoryAdd(categoryName).subscribe(
        (response) => {
          alertify.success('Category Added')

          this.getAllCategories();
          this.closeAddModal();
          this.formCategory.reset();
        },
        (error) => {
          alertify.error('Category could not be added')
          this.getAllCategories();
          this.closeAddModal();
          this.formCategory.reset();
        }
      );
    }
    }
    else{
      window.alert('Zorunlu Alanları Giriniz.');
    }
  }

  update(){
    if(this.formCategory.valid){
      const filteredAuthor=this.categories.filter((item)=>item.name==this.formCategory.value.name)
     if(this.selectedCategory?.name!=this.formCategory.value.name.toString()&&filteredAuthor.length>0){
      alertify.error('It\'s from the same category')
     }
     else{
      const categoryName = this.formCategory.get('name')?.value;
      const Id = this.selectedCategory!.id;
      this.categoriesService.CategoryUpdate(categoryName,Id).subscribe(
        (response) => {
          alertify.success('Category updated')
          this.getAllCategories();
          this.closeModal();
          this.formCategory.reset();
        },
        (error) => {
          alertify.error('Category could not be updated')
          this.getAllCategories();
          this.closeModal();
          this.formCategory.reset();
        }
      );
    }
    }
    else{
      window.alert('Zorunlu Alanları Giriniz.');
    }
  }


  deleteCategoryById(): void {
    const filteredBook=this.Books.filter((item)=>item.categoryID==this.selectedCategory?.id)

    if(filteredBook.length>0){alertify.error('There are books in this category that use')}
  else{
    this.categoriesService.deleteCategory(this.selectedCategory!.id).subscribe(
      () => {
        alertify.error('Category Deleted')

        this.closeDelete();
        this.getAllCategories();
      },
      (error) => {
        alertify.error('Category Deleted')

        this.getAllCategories();
        this.closeDelete();
      }
    );
  }
  }
  getAllBook(): void {
    this.categoriesService.getAllBook()
      .subscribe(
        (data) => {
          this.Books = data;
        },
        (error) => {
          console.error('Error fetching Books:', error);
        }
      );
  }

}
