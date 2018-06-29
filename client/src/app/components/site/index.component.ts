import { Component } from '@angular/core'

@Component({
  selector: 'app-site',
  template: `
<div>
<mat-toolbar color="primary">
<mat-toolbar-row>
<span>Toolbar</span>
</mat-toolbar-row>
</mat-toolbar>
</div>
<router-outlet></router-outlet>
`,
})

export class IndexComponent {
  constructor() {}
}
