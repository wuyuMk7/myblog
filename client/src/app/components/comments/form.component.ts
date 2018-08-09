import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {
  @Input('reply') replyContent: string;

  form = {
    author: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    content: new FormControl('', [Validators.required])
  };
}
