import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PanelComponent } from './panel/panel.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './modal/modal.component';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PanelComponent,HomeComponent,LoginComponent,HttpClientModule,ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WebUI';
  @ViewChild(ModalComponent) modal:ModalComponent;

  open(){
    this.modal.openModal('Task Title','Task has benn completed succesfully');
  }
}
