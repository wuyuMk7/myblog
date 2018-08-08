import { Component, Input, OnInit } from '@angular/core';

import {
  faRedditSquare,
} from '@fortawesome/free-brands-svg-icons';

let windowParams = "width=500,height=500,resizable,scrollbar=yes,status=1";

@Component({
  selector: 'app-social-button-reddit-share',
  template: `
    <div class="social-button-reddit-share social-button">
      <a id="social-button-reddit-share" [matTooltip]="tooltip">
        <fa-icon [icon]="faRedditSquare"></fa-icon>
      </a>
    </div>
`,
  styleUrls: ['./social-button.module.css']
})

export class ShareButtonComponent {
  @Input('data-params') buttonParams: any;

  faRedditSquare = faRedditSquare;
  tooltip = "";

  ngOnInit() {
    let url = escape(this.buttonParams.url);
    let urlParams = `?url=${url}&title=${this.buttonParams.title}`
    console.log(urlParams);
    document
      .getElementById('social-button-reddit-share')
      .addEventListener('click', function(ev) {
        window.open(
          `https://www.reddit.com/submit${urlParams}`,
          "",
          windowParams
        );
      });
  }
}
