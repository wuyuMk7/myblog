import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-social-button',
  template: `
<div [ngSwitch]="buttonType">
  <div *ngSwitchCase="'twitter_follow'" class="social-button-twitter-follow">
    <a class="twitter-follow-button"
      [href]="buttonParams?.url"
      data-show-count="true"
      data-size="large">
    </a>
  </div>
  <div *ngSwitchCase="'twitter_share'" class="social-button-twitter-share">
    <a class="twitter-share-button"
      href="https://twitter.com/share"
      data-size="large"
      [attr.data-text]="buttonParams?.text || 'Share'"
      [attr.data-via]="buttonParams?.via || ''">
    </a>
  </div>
  <div *ngSwitchCase="'github_follow'" class="social-button-github-follow">
    <a class="github-button"
      [href]="buttonParams?.url"
      data-size="large"
      data-show-count="true"
      [attr.aria-label]="buttonParams?.label">
      {{ buttonParams?.content }}
    </a>
  </div>
  <div *ngSwitchDefault>
  </div>
</div>
  `,
})

export class SocialButtonComponent {
  @Input('data-button-type') buttonType: string;
  @Input('data-params') buttonParams: any;

  constructor() {}

  ngOnInit() {
    switch (this.buttonType) {
      case "twitter_follow": {
        this.buttonParams.url = `https://twitter.com/intent/follow?screen_name=${this.buttonParams.screen_name}`;
        console.log(this.buttonType);
        console.log(this.buttonParams);
        break;
      }
      case "twitter_share": {
        break;
      }
      case "github_follow": {
        this.buttonParams.url = `https://github.com/${this.buttonParams.name}`;
        this.buttonParams.label = `Follow @${this.buttonParams.name}`;
        this.buttonParams.content = this.buttonParams.label;
        break;
      }
    }
  }

  ngAfterViewInit() : void {
    window['twttr'] && window['twttr'].widgets.load();
  }
}
