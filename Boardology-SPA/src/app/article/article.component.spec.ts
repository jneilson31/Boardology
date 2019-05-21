import { async, ComponentFixture, TestBed, flush, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ArticleComponent } from './article.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../_models/article-model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  let activatedRouteMock;
  let app;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    activatedRouteMock = {
      route: { paramMap: { get: () => '3'}}
    };



    TestBed.configureTestingModule({
      declarations: [ ArticleComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteMock}
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    });

    httpMock = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(ArticleComponent);

    component = fixture.componentInstance;

    app = fixture.debugElement.componentInstance;

  });

  describe('getArticle', () => {

    it('should retrieve the article and set article to response', fakeAsync(() => {
      // Arrange
      const articleResponse: Article = {id: 1, title: 'title', content: 'test',
      created: new Date(), photoUrl: 'photoUrl',
      dateCreated: new Date(), author: 'author', comments: 1};


      // Act
      component.getArticle(1);

      // Assert
      const request = httpMock.expectOne(`${component.baseUrl}articles/1`).flush(articleResponse);
      expect(component.article).toEqual(articleResponse);

    }));
  });

});
