import { FormResponse, FormItem } from './types';

/**
 * Warning: Form methods is too heavy.
 */
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
    // console.log('start getResponses', Date.now());
    const responses = this.form.getResponses();
    // console.log('end getResponses', Date.now());
    const result: FormResponse[] = [];
    for (const response of responses) {
      // console.log('each response', Date.now());
      const responseId = response.getId();
      const items = response.getItemResponses().map((itemResponse) => {
        const item = itemResponse.getItem();
        const result: FormItem = {
          title: item.getTitle(),
          type: item.getType().toString() as FormItem['type'],
          response: itemResponse.getResponse().toString(),
        };
        return result;
      });
      result.push({
        id: responseId,
        timestamp: response.getTimestamp().toString(),
        email: response.getRespondentEmail(),
        items,
      });
    }
    return result;
  }
}
