import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  messageModal$ = this.modalService.messageModal$;

  constructor(private modalService:ModalService) { }

  ngOnInit(): void {
  }

  cancel(){
    this.modalService.updateModalState(false,'');
    this.modalService.updateModalConfirmation(false);
  }

  continue(){
    this.modalService.updateModalState(false,'');
    this.modalService.updateModalConfirmation(true);
  }
}
