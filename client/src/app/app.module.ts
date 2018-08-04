import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { IndexComponent as SiteComponent } from './components/site/index.component';
import { HomeComponent as SiteHomeComponent } from './components/site/home.component';
import { AboutComponent as SiteAboutComponent } from './components/site/about.component';
import { DetailComponent as PostDetailComponent } from './components/posts/detail.component';
import { PostListComponent } from './components/posts/list.component';
import { PostComponent } from './components/posts/post.component';

import { BreadcrumbComponent } from './helpers/breadcrumb/breadcrumb-list';
import { SocialButtonComponent } from './helpers/social/social-button';

const directives: any[] = [
  AppComponent,
  SiteComponent,
  SiteHomeComponent,
  SiteAboutComponent,
  PostDetailComponent,
  PostListComponent,
  PostComponent,
  BreadcrumbComponent,
  SocialButtonComponent,
];

const appRoutes: Routes = [
  {
    path: '',
    component: SiteComponent,
    children : [
      { path: '', component: SiteHomeComponent },
      { path: 'tags', component: SiteAboutComponent },
      { path: 'about', component: SiteAboutComponent },
    ]
  },
  { path: 'post/:title', component: PostDetailComponent },
]

@NgModule({
  imports: [
    BrowserModule,
    MaterialModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    FontAwesomeModule,
  ],
  declarations: directives,
  bootstrap: [ AppComponent ]
})

export class AppModule { }
