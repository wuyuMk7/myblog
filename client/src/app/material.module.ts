import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatToolbarModule,
  MatDividerModule,
  MatGridListModule,
  MatIconModule,
  MatChipsModule,
  MatTooltipModule,
} from '@angular/material';

@NgModule({
  imports: [
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
  ],
  exports: [
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
  ]
})

export class MaterialModule {}
