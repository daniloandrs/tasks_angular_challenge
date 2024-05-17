import { Injectable } from '@angular/core';
import { Tag } from '../models/task.model';
import { Observable, delay, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class TagLocalService {
    private readonly localStorageKey = 'tags';
  
    constructor() {}
  
    private getTags(): Tag[] {
      const data = localStorage.getItem(this.localStorageKey);
      return data ? JSON.parse(data) : [];
    }
  
    private saveTags(tags: Tag[]): void {
      localStorage.setItem(this.localStorageKey, JSON.stringify(tags));
    }
  
    getAllTags(): Observable<Tag[]> {
      return of(this.getTags()).pipe(delay(100));
    }
  
    getTagsById(key: string): Tag | undefined {
      return this.getTags().find(tag => tag.key === key);
    }
  
    createTags(tag: Tag): Observable<{
      success:boolean,
      message:string
    }>  {
      const tags = this.getTags();
      tags.push(tag);
      this.saveTags(tags)
      return of({success:true, message:'creado correctamente'}).pipe(delay(200));
    }
  
    updateTags(updatedTag: Tag): Observable<{
      success:boolean,
      message:string
    }>  {
      const tags = this.getTags();
      const index = tags.findIndex(tag => tag.key === updatedTag.key);
      if (index !== -1) {
        tags[index] = updatedTag;
        this.saveTags(tags);
      }
      return of({success:true, message:'actualizado correctamente'}).pipe(delay(200));
    }
  
    deleteTags(key: string): void {
      const tags = this.getTags();
      const filteredTags = tags.filter(tag => tag.key !== key);
      this.saveTags(filteredTags);
    }
  }