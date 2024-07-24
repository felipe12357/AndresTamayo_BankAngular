import { Component } from '@angular/core';
import { ModalService } from './components/modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bank';
  showModal$ = this.modalService.showModal$;
  constructor(private modalService:ModalService){
    
  }
}
