import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  template: `
    <div class="breadcrumb" fxLayout="row">
      <div *ngFor="let item of items; let last = last" [ngClass]="{ last: last }">
        <a *ngIf="item?.link; else elseBlock" [routerLink]="item?.link">{{ item?.content }}</a>
        <ng-template #elseBlock>
          <a>{{ item?.content }}</a>
        </ng-template>
        <span class="delimiter">&#47;</span>
      </div>
    </div>
  `,
  styleUrls: ['./breadcrumb-list.css']
})

export class BreadcrumbComponent {
  @Input() items: any;
}

