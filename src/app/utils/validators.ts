import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map, catchError, switchMap, first } from 'rxjs/operators';


export interface ValidatationServiceI {
  checkId:(value:string)=>Observable<boolean>
} 


export function uniqueIdValidator(productsService: ValidatationServiceI): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null); 
    }

    return control.valueChanges.pipe(
      debounceTime(300), 
      switchMap(value => productsService.checkId(value)),
      map(response => {
        return (response)?{ unique: true }:null;
      }),
      catchError(() => of(null)),
      first()
    );
  };
}