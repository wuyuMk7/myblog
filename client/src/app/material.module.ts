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
  MatFormFieldModule,
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
    MatFormFieldModule,
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
    MatFormFieldModule,
  ]
})

export class MaterialModule {}
