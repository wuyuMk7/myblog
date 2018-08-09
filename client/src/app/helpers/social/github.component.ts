import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

import {
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

let windowParams = "width=500,height=500,resizable,scrollbar=yes,status=1";

@Component({
  selector: 'app-social-button-github-follow',
  template: `
    <div class="social-button-github-follow social-button">
      <a id="social-button-github-follow" [matTooltip]="tooltip">
        <fa-icon [icon]="faGithub"></fa-icon>
      </a>
    </div>
`,
  styleUrls: ['./social-button.module.css']
})

export class FollowButtonComponent {
  @Input('data-params') buttonParams: any;

  faGithub = faGithub;
  tooltip = "";

  ngOnInit() {
    let button = this;
    this.tooltip = `Follow @${this.buttonParams.name}`;
    document
      .getElementById('social-button-github-follow')
      .addEventListener('click', function(ev) {
        window.open(
          `https://github.com/${button.buttonParams.screen_name}`,
          "",
          windowParams
        );
      });
  }
}
