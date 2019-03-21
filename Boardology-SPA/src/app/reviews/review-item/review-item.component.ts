import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/_models/comment.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.scss']
})
export class ReviewItemComponent implements OnInit {

  comment: Comment;
  commentId: number;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.comment = this.getComment(this.route.snapshot.params.commentId);
  }

  getComment(commentId: number): Comment {
    this.http.get<Comment>(`http://localhost:5000/api/comments/${commentId}/comment`)
    .subscribe(comment => {
      this.comment = comment;
    }, error => {
    });

    return this.comment;
  }

}
