import { PropertyType } from './types';

export function getPropertyFromType(
  type: PropertyType
): GoogleAppsScript.Properties.Properties {
  switch (type) {
    case 'script':
      return PropertiesService.getScriptProperties();
    case 'document':
      return PropertiesService.getDocumentProperties();
    case 'user':
      return PropertiesService.getUserProperties();
    default:
      throw new Error(`Invalid property type: ${type}`);
  }
}
