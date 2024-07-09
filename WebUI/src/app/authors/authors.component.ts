import { ChangeDetectorRef, Component, inject, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { MatTabsModule } from '@angular/material/tabs'
import { AuthorsService } from './authors.service';
import { ResponseAuthors } from './authors.model';
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
    console.log('metotda')
    this.authorsService.getAll()
      .subscribe(
        (data) => {
          this.Authors = data;
          console.log('Authors:', this.Authors);
        },
        (error) => {
          console.error('Error fetching Authors:', error);
        }
      );
  }
  add(){
    if(this.formAuthor.valid){
      const AuthorName = this.formAuthor.get('name')?.value;
      const AuthorSurName = this.formAuthor.get('surname')?.value;
      this.authorsService.AuthorAdd(AuthorName,AuthorSurName).subscribe(
        (response) => {
          console.log('Author added successfully', response);
          this.getAllAuthors();
          this.closeAddModal();
          this.formAuthor.reset();
        },
        (error) => {
          console.error('Error adding Author', error);
          this.getAllAuthors();
          this.closeAddModal();
          this.formAuthor.reset();
        }
      );
    }
    else{
      window.alert('Zorunlu Alanları Giriniz.');
    }
  }
  update(){
    if(this.formAuthor.valid){
      const AuthorName = this.formAuthor.get('name')?.value;
      const AuthorSurName = this.formAuthor.get('surname')?.value;
      const Id = this.selectedAuthor!.id;

      this.authorsService.AuthorUpdate(AuthorName,AuthorSurName,Id).subscribe(
        (response) => {
          console.log('Author added successfully', response);
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
    else{
      window.alert('Zorunlu Alanları Giriniz.');
    }
  }
  
  deleteAuthorById(): void {
    this.authorsService.deleteAuthor(this.selectedAuthor!.id).subscribe(
      () => {
        console.log('Author deleted successfully');
        this.closeDelete();
        this.getAllAuthors();
      },
      (error) => {
        this.getAllAuthors();
        this.closeDelete();
      }
    );
  }
}
