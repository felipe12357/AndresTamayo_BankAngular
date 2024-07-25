import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private showModalSubject:BehaviorSubject<boolean> = new BehaviorSubject(false);
  showModal$ = this.showModalSubject.asObservable();

  private messageModalSubject:BehaviorSubject<string> = new BehaviorSubject('');
  messageModal$ = this.messageModalSubject.asObservable();

  private confirmationModalSubject:BehaviorSubject<boolean> = new BehaviorSubject(false);
  confirmationModal$ = this.confirmationModalSubject.asObservable();

  constructor() { 

  }

  updateModalState(value:boolean,message:string){
    this.messageModalSubject.next(message);
    this.showModalSubject.next(value);
  }

  updateModalConfirmation(value:boolean){
    this.confirmationModalSubject.next(value)
  }

}
