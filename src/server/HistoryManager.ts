type PropertiesType = GoogleAppsScript.Properties.Properties;

export class HistoryManager {
  private readonly properties: PropertiesType;
  private readonly storageKey: string;
  private readonly maxItems: number;
  private items: string[] = [];

  constructor(
    properties: PropertiesType,
    storageKey: string,
    maxItems: number = 100
  ) {
    this.properties = properties;
    this.storageKey = storageKey;
    this.maxItems = maxItems;
    this.items = JSON.parse(properties.getProperty(storageKey) ?? '[]');
  }

  public add(id: string): void {
    if (!this.items.includes(id)) {
      this.items.push(id);
      if (this.items.length > this.maxItems) {
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
    this.properties.setProperty(this.storageKey, JSON.stringify(this.items));
  }
}
