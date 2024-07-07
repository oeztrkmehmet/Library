import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { AuthorsComponent } from './authors/authors.component';
import { LoginComponent } from './login/login.component';
import { AuthorizeGuard } from './login/_guards/auth/auth.guard';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent,
      canActivate: [AuthorizeGuard] },
    { path: 'category', component: CategoriesComponent,
      canActivate: [AuthorizeGuard] },
    { path: 'authors', component: AuthorsComponent,
      canActivate: [AuthorizeGuard] },
    { path: 'books', component: BooksComponent,
      canActivate: [AuthorizeGuard] },
    { path: 'login', component: LoginComponent }
  ];
