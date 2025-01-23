export interface FormItem {
  title: string;
  type:
    | 'CHECKBOX'
    | 'CHECKBOX_GRID'
    | 'DATE'
    | 'DATETIME'
    | 'DURATION'
    | 'GRID'
    | 'IMAGE'
    | 'LIST'
    | 'MULTIPLE_CHOICE'
    | 'PAGE_BREAK'
    | 'PARAGRAPH_TEXT'
    | 'RATING'
    | 'SCALE'
    | 'SECTION_HEADER'
    | 'TEXT'
    | 'TIME'
    | 'VIDEO'
    | 'FILE_UPLOAD'
    | 'UNSUPPORTED';
  response: string;
}

export interface FormResponse {
  id: string;
  // no Date to transfer to client
  timestamp: string;
  email: string;
  items: FormItem[];
}
