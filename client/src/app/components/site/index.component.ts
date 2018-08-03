import { Component } from '@angular/core'

@Component({
  selector: 'app-site',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})

export class IndexComponent {
  site : any = {
    title: "Wuyu's space...",
    sub: "-- blog",
    author : {
      avatar: "//s.gravatar.com/avatar/49677927211dcb1083a81bc66cf9152a?s=80",
      name: "YANG HE",
    }
  };

  constructor() {}
}
