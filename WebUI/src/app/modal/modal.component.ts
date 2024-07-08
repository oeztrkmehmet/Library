import { Component, ElementRef, ViewChild, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var $: any; // jQuery'nin türünü bildiriyoruz

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @ViewChild('modal') modal?: ElementRef;
title:string ='';
content:string ='';
  openModal(title:string,content:string) {
   
    this.title=title;
    this.content=content;
      $(this.modal?.nativeElement).modal('show');
  }
  closeModal() {
    console.log('metoda geldi')
    alert(this.modal?.nativeElement)
      $(this.modal?.nativeElement).modal('hide');
  }
}
