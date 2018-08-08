import { Component, Input, OnInit } from '@angular/core';

import {
  faGooglePlusSquare,
} from '@fortawesome/free-brands-svg-icons';

let windowParams = "width=500,height=500,resizable,scrollbar=yes,status=1";

@Component({
  selector: 'app-social-button-google-share',
  template: `
    <div class="social-button-google-share social-button">
      <a id="social-button-google-share" [matTooltip]="tooltip">
        <fa-icon [icon]="faGooglePlusSquare"></fa-icon>
      </a>
    </div>
`,
  styleUrls: ['./social-button.module.css']
})

export class ShareButtonComponent {
  @Input('data-params') buttonParams: any;

  faGooglePlusSquare = faGooglePlusSquare;
  tooltip = "";

  ngOnInit() {
    let url = escape(this.buttonParams.url);
    let urlParams = `?url=${url}`
    document
      .getElementById('social-button-google-share')
      .addEventListener('click', function(ev) {
        window.open(
          `https://plus.google.com/share${urlParams}`,
          "",
          windowParams
        );
      });
  }
}
