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

  public add(ids: string[]): void {
    for (const id of ids) {
      if (!this.items.includes(id)) {
        this.items.push(id);
      }
    }
    this.items = this.items.slice(-this.params.maxItems);
    this.saveItems();
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
