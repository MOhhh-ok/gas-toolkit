import { PropertyType } from './types';
import { getPropertyFromType } from './utils';

export class HistoryManager {
  private readonly properties: GoogleAppsScript.Properties.Properties;
  private items: string[] = [];

  constructor(
    private readonly params: {
      propertyType: PropertyType;
      storageKey: string;
      maxItems: number;
    }
  ) {
    this.properties = getPropertyFromType(params.propertyType);
    this.items = JSON.parse(
      this.properties.getProperty(params.storageKey) ?? '[]'
    );
  }

  public add(id: string): void {
    if (!this.items.includes(id)) {
      this.items.push(id);
      if (this.items.length > this.params.maxItems) {
        this.items.shift(); // 古いものから削除
      }
      this.saveItems();
    }
  }

  public has(id: string): boolean {
    return this.items.includes(id);
  }

  public clear(): void {
    this.items = [];
    this.saveItems();
  }

  private saveItems(): void {
    this.properties.setProperty(
      this.params.storageKey,
      JSON.stringify(this.items)
    );
  }
}
