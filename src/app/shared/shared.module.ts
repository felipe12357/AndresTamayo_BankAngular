import { NgModule } from "@angular/core";
import { RowMenuComponent } from "./row-menu/row-menu.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";


@NgModule({
    imports: [
        FontAwesomeModule
    ],
    declarations: [
        RowMenuComponent
    ],
    exports:[
        RowMenuComponent,
        FontAwesomeModule
    ]
  })
  export class SharedModule { }