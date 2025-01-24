export class DriveHelper {
  static isDriveUrl(url: string): boolean {
    const id = this.getIdFromUrl(url);
    return !!id;
  }

  static getFileByUrl(url: string): GoogleAppsScript.Drive.File | undefined {
    const id = this.getIdFromUrl(url);
    if (!id) return;
    const file = DriveApp.getFileById(id);
    return file;
  }

  static getIdFromUrl(url: string): string | undefined {
    for (const rs of [
      'https://drive.google.com/file/d/([^/]+)',
      'https://drive.google.com/open\\?id=([^/]+)',
    ]) {
      const reg = new RegExp(rs);
      const matches = url.match(reg);
      const id = matches?.[1];
      if (id) return id;
    }
  }
}
