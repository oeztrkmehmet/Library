import { ChangeDetectorRef, Component, inject, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { MatTabsModule } from '@angular/material/tabs'
import { AuthorsService } from './authors.service';
import { ResponseAuthors, ResponseBooks } from './authors.model';
declare var alertify:any;

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [CommonModule,ModalComponent,MatTabsModule,ReactiveFormsModule],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css',
  providers: [AuthorsService]
})
export class AuthorsComponent {
  formAuthor: FormGroup;
  selectedAuthor: ResponseAuthors | null; 
  Authors: ResponseAuthors[] = [];
  Books: ResponseBooks[] = [];

  @ViewChild('modalUpdate') modal:ModalComponent;
  @ViewChild('modalAdd') modalAdd:ModalComponent;
  @ViewChild('modalDelete') modalDelete:ModalComponent;

  constructor(
    private cdr: ChangeDetectorRef,
    private authorsService: AuthorsService,
    private fb: FormBuilder
  ){
    this.formAuthor = this.fb.group({
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
    });
  this.getAllAuthors();
  alertify.set('notifier', 'position', 'top-right');
  this.getAllBook();
  }
  open(){
    this.modal.openModal('Author');
  }
  closeModal(){
    this.modal.closeModal();
  }
  openAdd(){
    this.formAuthor.reset();
    this.modalAdd.openModal('Author Add')
  }
  closeAddModal(){
    this.modalAdd.closeModal();
    this.formAuthor.reset();
  }
  openDelete(id:string){
    this.Edit(id);
    this.modalDelete.openModal('Are you sure you want to delete the Author named '+this.selectedAuthor?.name+' '+this.selectedAuthor?.name+'?')
  }
  closeDelete(){
    this.modalDelete.closeModal();
  }

  Edit(selectedid?: string) {
    this.selectedAuthor = this.Authors.filter(
      (item) => item.id === selectedid
    )[0];
    this.formAuthor.get('id')?.setValue(this.selectedAuthor?.id);
    this.formAuthor.get('name')?.setValue(this.selectedAuthor?.name);
    this.formAuthor.get('surname')?.setValue(this.selectedAuthor?.surname);
  }
  EditWithOpen(selectedid?: string) {
    this.selectedAuthor = this.Authors.filter(
      (item) => item.id === selectedid
    )[0];
    this.formAuthor.get('id')?.setValue(this.selectedAuthor?.id);
    this.formAuthor.get('name')?.setValue(this.selectedAuthor?.name);
    this.formAuthor.get('surname')?.setValue(this.selectedAuthor?.surname);
    this.open();
  }
  getAllAuthors(): void {
    this.authorsService.getAll()
      .subscribe(
        (data) => {
          this.Authors = data;
        },
        (error) => {
          console.error('Error fetching Authors:', error);
        }
      );
  }
  add(){
    if(this.formAuthor.valid){
      const filteredAuthor=this.Authors.filter((item)=>item.name==this.formAuthor.value.name&&item.surname==this.formAuthor.value.surname)
      if(filteredAuthor.length>0){
        alertify.error('It\'s from the same author')

      }
     else{
      const AuthorName = this.formAuthor.get('name')?.value;
      const AuthorSurName = this.formAuthor.get('surname')?.value;
      this.authorsService.AuthorAdd(AuthorName,AuthorSurName).subscribe(
        (response) => {
          alertify.success('Author Added')
          this.getAllAuthors();
          this.closeAddModal();
          this.formAuthor.reset();
        },
        (error) => {
          alertify.error('Author could not be added')
          this.getAllAuthors();
          this.closeAddModal();
          this.formAuthor.reset();
        }
      );
    }
    }
    else{
      window.alert('Zorunlu Alanları Giriniz.');
    }
  }
  update(){
    if(this.formAuthor.valid){
      const filteredAuthor=this.Authors.filter((item)=>item.name==this.formAuthor.value.name&&item.surname==this.formAuthor.value.surname)
    
      if((this.selectedAuthor?.name!=this.formAuthor.value.name.toString()||this.selectedAuthor?.surname!=this.formAuthor.value.surname.toString())&&filteredAuthor.length>0)
      {
        alertify.error('It\'s from the same author')

    }
    else{
      const AuthorName = this.formAuthor.get('name')?.value;
      const AuthorSurName = this.formAuthor.get('surname')?.value;
      const Id = this.selectedAuthor!.id;

      this.authorsService.AuthorUpdate(AuthorName,AuthorSurName,Id).subscribe(
        (response) => {
          this.getAllAuthors();
          this.closeModal();
          this.formAuthor.reset();
        },
        (error) => {
          console.error('Error adding Author', error);
          this.getAllAuthors();
          this.closeModal();
          this.formAuthor.reset();
        }
      );
    }
  }
    else{
      window.alert('Zorunlu Alanları Giriniz.');
    }
  }
  
  deleteAuthorById(): void {
    const filteredBook=this.Books.filter((item)=>item.authorID==this.selectedAuthor?.id)
    if(filteredBook.length>0){alertify.error('There are books in this category that use')}
    else{
    this.authorsService.deleteAuthor(this.selectedAuthor!.id).subscribe(
      () => {
        alertify.error('Author Deleted')
        this.closeDelete();
        this.getAllAuthors();
      },
      (error) => {
        alertify.error('Author Deleted')
        this.getAllAuthors();
        this.closeDelete();
      }
    );
   }
  }
  getAllBook(): void {
    this.authorsService.getAllBook()
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
