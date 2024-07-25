import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update messageModalSubject and showModalSubject values',()=>{
    service.updateModalState(true,'mundo!');
    expect(service['showModalSubject'].getValue()).toBeTrue();
    expect(service['messageModalSubject'].getValue()).toBe('mundo!');
  })

  it('should update ModalConfirmation',()=>{
    service.updateModalConfirmation(true);
    expect(service['confirmationModalSubject'].getValue()).toBeTrue();
  })
});
