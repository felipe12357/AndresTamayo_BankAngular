import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faPenSquare,faTrash } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { ModalService } from 'src/app/components/modal/modal.service';
@Component({
  selector: 'app-row-menu',
  templateUrl: './row-menu.component.html',
  styleUrls: ['./row-menu.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class RowMenuComponent implements OnInit {

  faPenSquare = faPenSquare;
  faTrash = faTrash;

  @Input() url!: string;
  @Input() id!: string;
  @Input() name!:string;

  @Output() updateViewEvent = new EventEmitter();

  constructor(private router:Router,private modalService:ModalService) { }

  ngOnInit(): void {
  }

  redirect($event:MouseEvent){
    $event.stopPropagation();
    this.router.navigate([`${this.url}`,this.id])
  }

  async delete($event:MouseEvent){
    
    $event.stopPropagation();
    this.modalService.updateModalState(true,`Estas seguro de eliminar el producto: "${this.name}"?`);

    const result = await firstValueFrom( this.modalService.confirmationModal$);

    if(result)
      this.updateViewEvent.emit(this.id);
    else
      this.updateViewEvent.emit('');
  }

}
