import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel/panel.component';
import { ChildComponent } from './child/child.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PanelComponent,
    ChildComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PanelComponent
  ]
})
export class PlaygroundModule { }
