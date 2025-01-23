import { FormResponse, FormItem } from './types';

export class FormGetter {
  private form: GoogleAppsScript.Forms.Form;

  constructor(private formId: string) {
    this.form = FormApp.openById(formId);
  }

  static fromFormUrl(formUrl: string) {
    const arr = formUrl.split('/');
    arr.pop();
    const id = arr.pop();
    if (!id) throw new Error('Invalid form url');
    return new FormGetter(id);
  }

  getResponses(): FormResponse[] {
    const responses = this.form.getResponses();
    const result: FormResponse[] = [];
    for (const response of responses) {
      const responseId = response.getId();
      const items = response.getItemResponses().map((item) => {
        const result: FormItem = {
          title: item.getItem().getTitle(),
          type: item.getItem().getType().toString(),
          response: item.getResponse().toString(),
        };
        return result;
      });
      result.push({
        id: responseId,
        timestamp: response.getTimestamp(),
        email: response.getRespondentEmail(),
        items,
      });
    }
    return result;
  }
}
