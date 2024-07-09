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
  openModal(title:string) {
   
    this.title=title;
      $(this.modal?.nativeElement).modal('show');
  }
  closeModal() {
      $(this.modal?.nativeElement).modal('hide');
  }
}
