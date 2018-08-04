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
  MatSidenavModule,
  MatInputModule,
  MatProgressSpinnerModule,
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
    MatSidenavModule,
    MatInputModule,
    MatProgressSpinnerModule,
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
    MatSidenavModule,
    MatInputModule,
  ]
})

export class MaterialModule {}
