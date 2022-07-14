import { Injectable } from '@angular/core';
import { TractorConfig } from '../tractor/tractor-config';

interface StoredTractor {
  name: string;
  config: TractorConfig;
  createdAt: number;
}

@Injectable({
  providedIn: 'root',
})
export class TractorStorageService {
  private readonly storageKey = 'tractors';

  get tractors(): StoredTractor[] {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    } catch {
      return [];
    }
  }

  set tractors(tractors: StoredTractor[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(tractors));
  }

  constructor() {}

  saveTractor(data: { name: string; config: TractorConfig }) {
    const item = { ...data, createdAt: Date.now() };
    console.log(item, this.tractors);
    this.tractors = [item, ...this.tractors];
  }
}
