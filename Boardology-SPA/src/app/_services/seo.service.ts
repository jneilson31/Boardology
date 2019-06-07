import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface TagData {
  [prop: string]: string;
}

@Injectable({
  providedIn: 'root'
})

export class SeoService {

  constructor(private meta: Meta, private title: Title) { }

  getTitle(): string {
    return this.title.getTitle();
  }

  setTitle(title: string): void {
    this.title.setTitle(title);
  }

  addTag(data: TagData) {
    this.meta.addTag(data);
  }

  addTags(data: TagData[]) {
    this.meta.addTags(data);
  }

  getTag(tag: string): HTMLElement {
    return this.meta.getTag(tag);
  }

  updateTag(data: TagData) {
    this.meta.updateTag(data);
  }

  removeTag(tag: string): void {
    this.meta.removeTag(tag);
  }

  removeTagElement(tagElement: HTMLMetaElement): void {
    this.meta.removeTagElement(tagElement);
  }
}
