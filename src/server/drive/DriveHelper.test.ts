import { describe, it, expect } from 'vitest';
import { DriveHelper } from './DriveHelper';

describe('TestClass.getIdFromUrl', () => {
  it('should extract the file ID from a valid "file" URL', () => {
    const url = 'https://drive.google.com/file/d/12345abcdef/view?usp=sharing';
    const result = DriveHelper.getIdFromUrl(url);
    expect(result).toBe('12345abcdef');
  });

  it('should extract the file ID from a valid "open" URL', () => {
    const url = 'https://drive.google.com/open?id=67890ghijk';
    const result = DriveHelper.getIdFromUrl(url);
    expect(result).toBe('67890ghijk');
  });

  it('should return undefined for an invalid URL', () => {
    const url = 'https://example.com/somepath';
    const result = DriveHelper.getIdFromUrl(url);
    expect(result).toBeUndefined();
  });

  it('should return undefined for a URL without an ID', () => {
    const url = 'https://drive.google.com/file/d/';
    const result = DriveHelper.getIdFromUrl(url);
    expect(result).toBeUndefined();
  });

  it('should return undefined for an empty string', () => {
    const url = '';
    const result = DriveHelper.getIdFromUrl(url);
    expect(result).toBeUndefined();
  });
});
