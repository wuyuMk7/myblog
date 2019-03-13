import * as moment from 'moment';
import * as marked from 'marked';
import * as katex from 'katex';

import { Comment } from './comment';

export class Post {
  id: string;
  title: string;
  url: string;
  tags: string[];
  desc: string;
  content: string;
  comments: Comment[];
  createdAt: string;
  period?: string;
  viewCount: number;
  commentCount: number;
  like: number;

  constructor(postInfo:any) {
    this.id = postInfo.id;
    this.title = postInfo.title;
    this.url = postInfo.url;
    this.tags = postInfo.tags;
    this.desc = postInfo.desc;
    this.content = postInfo.content;
    this.comments = postInfo.comments;
    this.createdAt = postInfo.createdAt;
    this.viewCount = postInfo.viewCount;
    this.commentCount = postInfo.commentCount;
    this.like = postInfo.like;
  }

  renderContent(): string {
    let content:string;

    let formulaIndicatorLength = 9;
    let leftFormulaIndicator = "<$formula";
    let rightFormulaIndicator = "formula$>";

    content = this.content;

    let index = 0;
    let contentLength = content.length;
    while(index + formulaIndicatorLength * 2<= contentLength) {
      let leftIndex = content.indexOf(leftFormulaIndicator, index);
      if (leftIndex == -1) break;

      let rightIndex = content.indexOf(rightFormulaIndicator, leftIndex + formulaIndicatorLength);
      if (rightIndex == -1) break;

      let formula = content.slice(leftIndex + formulaIndicatorLength, rightIndex);
      if (formula.length != 0)
        formula = "<div class=\"in-post-formula\">" + katex.renderToString(formula) + "</div>";

      content = content.substr(0, leftIndex) + formula + content.substr(rightIndex + formulaIndicatorLength);

      index = leftIndex + formula.length;
    }

    content = content.replace(/\\n/g, '\n');
    content = marked(content);
    return content;
  }
}
