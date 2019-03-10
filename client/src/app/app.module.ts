import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MaterialModule } from './material.module';
import { SocialButtonModule } from './helpers/social/social-button.module';

import { AppComponent } from './app.component';
import { IndexComponent as SiteComponent } from './components/site/index.component';
import { HomeComponent as SiteHomeComponent } from './components/site/home.component';
import { AboutComponent as SiteAboutComponent } from './components/site/about.component';
import { DetailComponent as PostDetailComponent } from './components/posts/detail.component';
import { PostListComponent } from './components/posts/list.component';
import { PostComponent } from './components/posts/post.component';
import { ListComponent as CommentListComponent } from './components/comments/list.component';
import { FormComponent as CommentFormComponent } from './components/comments/form.component';
import { CommentComponent } from './components/comments/comment.component';

import { BreadcrumbComponent } from './helpers/breadcrumb/breadcrumb-list';

import { SafeHtmlPipe } from './helpers/safeHtml/safe-html.pipe';

const directives: any[] = [
  AppComponent,
  SiteComponent,
  SiteHomeComponent,
  SiteAboutComponent,
  PostDetailComponent,
  PostListComponent,
  PostComponent,
  CommentListComponent,
  CommentFormComponent,
  CommentComponent,
  BreadcrumbComponent,
  SafeHtmlPipe,

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
    ReactiveFormsModule,
    FontAwesomeModule,
    SocialButtonModule,
  ],
  declarations: directives,
  bootstrap: [ AppComponent ]
})

export class AppModule { }
