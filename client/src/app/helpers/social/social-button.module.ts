import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  FollowButtonComponent as TwitterFollowButtonComponent,
  ShareButtonComponent as TwitterShareButtonComponent
} from './twitter.component';
import {
  FollowButtonComponent as GithubFollowButtonComponent
} from './github.component';
import {
  FollowButtonComponent as FacebookFollowButtonComponent,
  ShareButtonComponent as FacebookShareButtonComponent
} from './facebook.component';

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    FontAwesomeModule,
  ],
  declarations: [
    TwitterFollowButtonComponent,
    TwitterShareButtonComponent,
    GithubFollowButtonComponent,
    FacebookFollowButtonComponent,
    FacebookShareButtonComponent,
  ],
  exports: [
    TwitterFollowButtonComponent,
    TwitterShareButtonComponent,
    GithubFollowButtonComponent,
    FacebookFollowButtonComponent,
    FacebookShareButtonComponent,
  ],
})

export class SocialButtonModule {}
