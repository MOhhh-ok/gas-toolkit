export interface FormItem {
  title: string;
  type: string;
  response: string;
}

export interface FormResponse {
  id: string;
  timestamp: GoogleAppsScript.Base.Date;
  email: string;
  items: FormItem[];
}
