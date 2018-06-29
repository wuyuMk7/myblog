import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { IndexComponent as SiteComponent } from './components/site/index.component';
import { HomeComponent as SiteHomeComponent } from './components/site/home.component';
import { AboutComponent as SiteAboutComponent } from './components/site/about.component';

const appRoutes: Routes = [
  {
    path: '',
    component: SiteComponent,
    children : [
      { path: '', component: SiteHomeComponent },
      { path: 'about', component: SiteAboutComponent },
    ]
  }
]

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  declarations: [
    AppComponent,
    SiteComponent,
    SiteHomeComponent,
    SiteAboutComponent,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
