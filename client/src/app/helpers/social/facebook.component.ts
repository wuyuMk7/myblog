import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

import {
  faFacebookF,
  faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons';

let windowParams = "width=500,height=500,resizable,scrollbar=yes,status=1";

@Component({
  selector: 'app-social-button-facebook-follow',
  template: `
    <div class="social-button-facebook-follow social-button">
      <a id="social-button-facebook-follow" [matTooltip]="tooltip">
        <fa-icon [icon]="faFacebookF"></fa-icon>
      </a>
    </div>
`,
  styleUrls: ['./social-button.module.css']
})

export class FollowButtonComponent {
  @Input('data-params') buttonParams: any;

  faFacebookF = faFacebookF;
  tooltip = "";

  ngOnInit() {
    let button = this;
    this.tooltip = `Follow @${this.buttonParams.name}`;
    document
      .getElementById('social-button-facebook-follow')
      .addEventListener('click', function(ev) {
        window.open(
          `https://facebook.com/${button.buttonParams.screen_name}`,
          "",
          windowParams
        );
      });
  }
}


@Component({
  selector: 'app-social-button-facebook-share',
  template: `
    <div class="social-button-facebook-share social-button">
      <a id="social-button-facebook-share" [matTooltip]="tooltip">
        <fa-icon [icon]="faFacebookSquare"></fa-icon>
      </a>
    </div>
`,
  styleUrls: ['./social-button.module.css']
})

export class ShareButtonComponent {
  @Input('data-params') buttonParams: any;

  faFacebookSquare = faFacebookSquare;
  tooltip = "";

  ngOnInit() {
    let url = escape(this.buttonParams.url);
    let urlParams = `?u=${url}&t=${this.buttonParams.text}`
    document
      .getElementById('social-button-facebook-share')
      .addEventListener('click', function(ev) {
        window.open(
          `https://www.facebook.com/sharer/sharer.php${urlParams}`,
          "",
          windowParams
        );
      });
  }
}
