import { Component, Input, OnInit } from '@angular/core';

import {
  faWeibo
} from '@fortawesome/free-brands-svg-icons';

let windowParams = "width=500,height=500,resizable,scrollbar=yes,status=1";

@Component({
  selector: 'app-social-button-weibo-share',
  template: `
    <div class="social-button-weibo-share social-button">
      <a id="social-button-weibo-share" [matTooltip]="tooltip">
        <fa-icon [icon]="faWeibo"></fa-icon>
      </a>
    </div>
`,
  styleUrls: ['./social-button.module.css']
})

export class ShareButtonComponent {
  @Input('data-params') buttonParams: any;

  faWeibo = faWeibo;
  tooltip = "";

  ngOnInit() {
    let url = escape(this.buttonParams.url);
    let urlParams = `?url=${url}&title=${this.buttonParams.text}`;
    console.log(urlParams);
    document
      .getElementById('social-button-weibo-share')
      .addEventListener('click', function(ev) {
        window.open(
          `https://service.weibo.com/share/share.php${urlParams}`,
          "",
          windowParams
        );
      });
  }
}
