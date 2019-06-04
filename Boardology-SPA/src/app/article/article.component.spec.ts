import { async, ComponentFixture, TestBed, flush, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ArticleComponent } from './article.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../_models/article.model';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  let activatedRouteMock;
  let app;
  let httpClientSpy;

  beforeEach(() => {

    activatedRouteMock = {
      route: { paramMap: { get: () => '3'}}
    };
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);



    TestBed.configureTestingModule({
      declarations: [ ArticleComponent ],
      imports: [RouterTestingModule],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteMock},
        { provide: HttpClient, useValue: httpClientSpy }
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    });


    fixture = TestBed.createComponent(ArticleComponent);

    component = fixture.componentInstance;

    app = fixture.debugElement.componentInstance;

  });

  describe('getArticle', () => {

    it('should retrieve the article and set article to response', fakeAsync(() => {
      // Arrange
      const articleResponse: Article = {id: 1, title: 'title', content: 'test',
      created: new Date(), photoUrl: 'photoUrl',
      dateCreated: new Date(), author: 'author', numberOfComments: 1};
      httpClientSpy.get.and.returnValue(of(articleResponse));

      // Act
      component.getArticle(1);

      // Assert
      expect(component.article).toEqual(articleResponse);

    }));
  });

});
