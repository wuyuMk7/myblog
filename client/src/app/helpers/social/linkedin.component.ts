import { Component, Input, OnInit } from '@angular/core';

import {
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';

let windowParams = "width=500,height=500,resizable,scrollbar=yes,status=1";

@Component({
  selector: 'app-social-button-linkedin-share',
  template: `
    <div class="social-button-linkedin-share social-button">
      <a id="social-button-linkedin-share" [matTooltip]="tooltip">
        <fa-icon [icon]="faLinkedin"></fa-icon>
      </a>
    </div>
`,
  styleUrls: ['./social-button.module.css']
})

export class ShareButtonComponent {
  @Input('data-params') buttonParams: any;

  faLinkedin = faLinkedin;
  tooltip = "";

  ngOnInit() {
    let url = escape(this.buttonParams.url);
    let urlParams = `?mini=true&url=${url}&title=${this.buttonParams.title}&summary=${this.buttonParams.text}&source=${url}`
    document
      .getElementById('social-button-linkedin-share')
      .addEventListener('click', function(ev) {
        window.open(
          `https://www.linkedin.com/shareArticle${urlParams}`,
          "",
          windowParams
        );
      });
  }
}
