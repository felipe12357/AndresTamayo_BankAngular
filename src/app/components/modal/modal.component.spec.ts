import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';


describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ModalService', ['updateModalState', 'updateModalConfirmation']);

    await TestBed.configureTestingModule({
      declarations: [ ModalComponent ],
      providers:[
        { provide: ModalService, useValue: spy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    modalServiceSpy = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    
    expect(component).toBeTruthy();
  });

  it('should call updateModalState  and updateModalConfirmation with the paramertes,continue method',()=>{
    component.continue(),
    expect(modalServiceSpy.updateModalConfirmation).toHaveBeenCalledWith(true);
    expect(modalServiceSpy.updateModalState).toHaveBeenCalledWith(false,'');

  })

  it('should call updateModalState  and updateModalConfirmation with the paramertes,cancel method',()=>{
    component.cancel(),
    expect(modalServiceSpy.updateModalConfirmation).toHaveBeenCalledWith(false);
    expect(modalServiceSpy.updateModalState).toHaveBeenCalledWith(false,'');

  })
});
