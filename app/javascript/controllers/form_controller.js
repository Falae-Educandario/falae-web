import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['submit'];

  initialize() {
    this.initialState = {};
  }

  getFormFields = () => {
    return [...this.element.querySelectorAll(
      '.field input, .field select, .field textarea',
    )];
  }

  findFieldsWithConfirmations(fields) {
    const confirmations = fields.reduce((acc, field) => {
      const matches = field.value.match(/(.*)\[((.*)_confirmation)\]/);
      console.log('FIELD', field, matches);
      if (matches && fields.includes(`${matches[1]}[${matches[3]}]`)) {
        return [...acc, [`${matches[1]}[${matches[3]}]`, field]];
      }
      return acc;
    }, false);

    return confirmations;
  }



  connect() {
    this.submitTarget.disabled = true;
    const formFields = this.getFormFields();
    formFields.forEach(field => {
      this.initialState[field.id] = {
        value: field.defaultValue || field.value,
        required: field.required,
        hasConfirmation: formFields
          .some(elem => elem.id === `${field.id}_confirmation`),
      }
    });

    this.element.addEventListener('input', () => {
      const fields = this.getFormFields();

      if (this.submitTarget.disabled) {
        if (fields
              .filter(field => field.required)
              .every(field => !!field.value.trim()) &&
            fields.some(
              field => field.value !== this.initialState[field.id].value
            ) &&
            Object.entries(this.initialState)
              .reduce((acc, [key, val]) => {
                if (val.hasConfirmation) {
                  return acc && fields
                    .find(f => f.id === key).value ===
                      fields.find(f => f.id === `${key}_confirmation`).value;
                }
                return acc;
              }, true)
        ) {
          this.submitTarget.disabled = null;
        }
      } else {
        if (fields
              .filter(field => field.required)
              .some(field => !field.value.trim()) ||
            fields.every(
              field => field.value === this.initialState[field.id].value
            ) ||
            Object.entries(this.initialState)
              .reduce((acc, [key, val]) => {
                if (val.hasConfirmation) {
                  return acc || fields.find(f => f.id === key).value !==
                    fields.find(f => f.id === `${key}_confirmation`).value;
                }
                return acc;
              }, false)
        ) {
          this.submitTarget.disabled = true;
        }
      }
    });
  }

  disconnect() {
    this.initialState = {};
  }
}
