import { ChangeDetectorRef, Component, inject, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { MatTabsModule } from '@angular/material/tabs'
import { BooksService } from './books.service';
import { ResponseAuthors, ResponseBooks, ResponseCategories } from './books.model';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule,ModalComponent,MatTabsModule,ReactiveFormsModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
  providers: [BooksService]

})
export class BooksComponent {

  formBook: FormGroup;
  selectedBook: ResponseBooks | null; 
  selectedAuthors: ResponseAuthors | null; 
  selectedCategories: ResponseCategories | null; 
  Books: ResponseBooks[] = [];
  Authors: ResponseAuthors[] = [];
  Categories: ResponseCategories[] = [];

  @ViewChild('modalUpdate') modal:ModalComponent;
  @ViewChild('modalAdd') modalAdd:ModalComponent;
  @ViewChild('modalDelete') modalDelete:ModalComponent;
  constructor(
    private cdr: ChangeDetectorRef,
    private booksService: BooksService,
    private fb: FormBuilder
  ){
    this.formBook = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      authorID: [null, [Validators.required]],
      categoryID: [null, [Validators.required]],
    });
  this.getAllBooks();
  this.GetAllAuthors();
  this.GetAllCategories();
  }

  open(){
    this.modal.openModal('Book');
  }
  closeModal(){
    this.modal.closeModal();
  }
  openAdd(){
    this.formBook.reset()
    this.modalAdd.openModal('Book Add')
  }
  closeAddModal(){
    this.modalAdd.closeModal();
    this.formBook.reset();
  }
  openDelete(id:string){
    this.Edit(id);
    this.modalDelete.openModal('Are you sure you want to delete the Book named '+this.selectedBook?.title+'?')
  }
  closeDelete(){
    this.modalDelete.closeModal();
  }

  Edit(selectedid?: string) {
    this.selectedBook = this.Books.filter(
      (item) => item.id === selectedid
    )[0];
    this.formBook.get('id')?.setValue(this.selectedBook?.id);
    this.formBook.get('title')?.setValue(this.selectedBook?.title);
    this.formBook.get('description')?.setValue(this.selectedBook?.description);
    this.formBook.get('authorID')?.setValue(this.selectedBook?.authorID);
    this.formBook.get('categoryID')?.setValue(this.selectedBook?.categoryID);
  }
  EditWithOpen(selectedid?: string) {
    this.selectedBook = this.Books.filter(
      (item) => item.id === selectedid
    )[0];
    this.formBook.get('id')?.setValue(this.selectedBook?.id);
    this.formBook.get('title')?.setValue(this.selectedBook?.title);
    this.formBook.get('description')?.setValue(this.selectedBook?.description);
    this.formBook.get('authorID')?.setValue(this.selectedBook?.authorID);
    this.formBook.get('categoryID')?.setValue(this.selectedBook?.categoryID);
    this.open();
  }
  getAllBooks(): void {
    console.log('metotda')
    this.booksService.getAll()
      .subscribe(
        (data) => {
          this.Books = data;
          console.log('Books:', this.Books);
        },
        (error) => {
          console.error('Error fetching Books:', error);
        }
      );
  }

  add(){
    if(this.formBook.valid){
      const BookTitle= this.formBook.get('title')?.value;
      const BookDescription = this.formBook.get('description')?.value;
      const BookAuthorID = this.formBook.get('authorID')?.value;
      const BookCategoryID = this.formBook.get('categoryID')?.value;
      this.booksService.BookAdd(BookTitle,BookDescription,BookAuthorID,BookCategoryID).subscribe(
        (response) => {
          console.log('Book added successfully', response);
          this.getAllBooks();
          this.closeAddModal();
          this.formBook.reset();
        },
        (error) => {
          console.error('Error adding Book', error);
          this.getAllBooks();
          this.closeAddModal();
          this.formBook.reset();
        }
      );
    }
    else{
      window.alert('Zorunlu Alanları Giriniz.');
    }
  }

  update(){
    if(this.formBook.valid){
      const BookTitle= this.formBook.get('title')?.value;
      const BookDescription = this.formBook.get('description')?.value;
      const BookAuthorID = this.formBook.get('authorID')?.value;
      const BookCategoryID = this.formBook.get('categoryID')?.value;
      this.booksService.BookUpdate(this.selectedBook!.id,BookTitle,BookDescription,BookAuthorID,BookCategoryID).subscribe(
        (response) => {
          console.log('Author added successfully', response);
          this.getAllBooks();
          this.closeModal();
          this.formBook.reset();
        },
        (error) => {
          console.error('Error adding Book', error);
          this.getAllBooks();
          this.closeModal();
          this.formBook.reset();
        }
      );
    }
    else{
      window.alert('Zorunlu Alanları Giriniz.');
    }
  }
  deleteBookById(): void {
    this.booksService.deleteBook(this.selectedBook!.id).subscribe(
      () => {
        console.log('Book deleted successfully');
        this.closeDelete();
        this.getAllBooks();
      },
      (error) => {
        this.getAllBooks();
        this.closeDelete();
      }
    );
  }

  GetAllAuthors(): void {
    this.booksService.GetAllAuthors()
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
  GetAllCategories(): void {
    console.log('metotda')
    this.booksService.GetAllCategories()
      .subscribe(
        (data) => {
          this.Categories = data;
          console.log('Categories:', this.Categories);
        },
        (error) => {
          console.error('Error fetching Books:', error);
        }
      );
  }
  EditAuthor(selectedid?: string) {
    this.selectedAuthors = this.Authors.filter(
      (item) => item.id === selectedid
    )[0];
  }
  EditCategory2(selectedid?: string) {
    this.selectedCategories = this.Authors.filter(
      (item) => item.id === selectedid
    )[0];
  }
  EditCategory(selectedid?: string): string {
    const selectedCategory = this.Authors.filter(
      (item) => item.id === selectedid
    )[0];
    return selectedCategory ? selectedCategory.name : '';
}

getCategoryName(categoryID: string): string {
  const selectedCategory = this.Categories.filter(
    (item) => item.id === categoryID
  )[0];
  return selectedCategory ? selectedCategory.name : '';
}
getAuthorName(AuthorsID: string): string {
  const selectedAuthors = this.Authors.filter(
    (item) => item.id === AuthorsID
  )[0];
  return selectedAuthors ? selectedAuthors.name+' '+selectedAuthors.surname : '';
}

}
