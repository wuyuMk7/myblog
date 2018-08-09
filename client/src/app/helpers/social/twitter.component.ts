import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

import {
  faTwitter,
  faTwitterSquare,
  faGithub,
  faGithubSquare,
} from '@fortawesome/free-brands-svg-icons';

let windowParams = "width=500,height=500,resizable,scrollbar=yes,status=1";

@Component({
  selector: 'app-social-button-twitter-follow',
  template: `
    <div class="social-button-twitter-follow social-button">
      <a id="social-button-twitter-follow" [matTooltip]="tooltip">
        <fa-icon [icon]="faTwitter"></fa-icon>
      </a>
    </div>
`,
  styleUrls: ['./social-button.module.css']
})

export class FollowButtonComponent {
  @Input('data-params') buttonParams: any;

  faTwitter = faTwitter;
  tooltip = ""

  ngOnInit() {
    let button = this;
    this.tooltip = `Follow @${this.buttonParams.screen_name}`;
    document
      .getElementById('social-button-twitter-follow')
      .addEventListener('click', function(ev) {
        window.open(
          `https://twitter.com/intent/follow?screen_name=${button.buttonParams.screen_name}`,
          "",
          windowParams
        );
      });

      /*
      window['twttr'].widgets.createFollowButton(
        this.buttonParams.screen_name,
        document.getElementById('social-button-twitter-follow'),
        {
          size: this.buttonParams.size || 'large',
        }
      );
      */

  }
}

@Component({
  selector: 'app-social-button-twitter-share',
  template: `
    <div class="social-button-twitter-share social-button">
      <a id="social-button-twitter-share">
        <fa-icon [icon]="faTwitterSquare"></fa-icon>
      </a>
    </div>
`,
  styleUrls: ['./social-button.module.css']
})

export class ShareButtonComponent {
  @Input('data-params') buttonParams: any;

  faTwitterSquare = faTwitterSquare;

  ngOnInit() {
    let url = escape(this.buttonParams.url);
    let urlParams = `?url=${url}&text=${this.buttonParams.text}&via=${this.buttonParams.twitter.via}&hastags=${this.buttonParams.hashtags}`;
    document
      .getElementById('social-button-twitter-share')
      .addEventListener('click', function(ev) {
        window.open(
          `https://twitter.com/intent/tweet${urlParams}`,
          "",
          windowParams
        );
      });
  }
}
