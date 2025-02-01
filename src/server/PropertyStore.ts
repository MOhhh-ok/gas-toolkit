/**
 * A utility class that wraps Google Apps Script's Properties Service to provide
 * type-safe persistent storage functionality.
 *
 * This class provides a strongly-typed interface for storing and retrieving data
 * using the Properties Service, with automatic serialization and deserialization
 * of JSON data.
 *
 * @template T - The type of value to be stored
 * @example
 * const store = new ScriptPropertyStore<string[]>('myList', 'script');
 * store.set('items', ['item1', 'item2']);
 * const items = store.get('items'); // string[] | undefined
 */
export class PropertyStore<T> {
  private readonly properties: GoogleAppsScript.Properties.Properties;

  constructor(
    private readonly name: string,
    private readonly type: 'script' | 'document' | 'user'
  ) {
    switch (type) {
      case 'script':
        this.properties = PropertiesService.getScriptProperties();
        break;
      case 'document':
        this.properties = PropertiesService.getDocumentProperties();
        break;
      case 'user':
        this.properties = PropertiesService.getUserProperties();
        break;
    }
  }

  get(key: string): T | undefined {
    const value = this.properties.getProperty(this.createKey(key));
    return value ? (JSON.parse(value) as T) : undefined;
  }

  set(key: string, value: T) {
    this.properties.setProperty(this.createKey(key), JSON.stringify(value));
  }

  delete(key: string) {
    this.properties.deleteProperty(this.createKey(key));
  }

  getKeys(): string[] {
    return this.properties
      .getKeys()
      .filter((key) => key.startsWith(this.createKeyPrefix()));
  }

  clear() {
    this.getKeys().forEach((key) => this.properties.deleteProperty(key));
  }

  getAll(): Record<string, T> {
    const all = this.properties.getProperties();
    const filtered = Object.entries(all).filter(([key]) =>
      this.isKeyMatch(key)
    );
    const result: Record<string, T> = {};
    for (const [key, value] of filtered) {
      const newKey = this.restoreKey(key);
      result[newKey] = JSON.parse(value) as T;
    }
    return result;
  }

  /////////////////////////

  private isKeyMatch(key: string) {
    return key.startsWith(this.createKeyPrefix());
  }

  private createKey(key: string) {
    return `${this.createKeyPrefix()}${key}`;
  }

  private createKeyPrefix() {
    return `${this.name}:`;
  }

  private restoreKey(key: string) {
    const prefix = this.createKeyPrefix();
    return key.startsWith(prefix) ? key.substring(prefix.length) : key;
  }
}
