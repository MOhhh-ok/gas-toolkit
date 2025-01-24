export class UrlHelper {
  static getUrlParams(url: string): Record<string, string> {
    const searchParamsString = url.split('?')[1];
    if (!searchParamsString) return {};
    const arr = searchParamsString.split('&');
    const result: Record<string, string> = {};
    for (const item of arr) {
      const [key, ...value] = item.split('=');
      result[key] = value.join('=');
    }
    return result;
  }
}
