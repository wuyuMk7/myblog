import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatToolbarModule,
} from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
  ]
})

export class MaterialModule {}
