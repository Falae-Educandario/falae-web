import { Controller } from "@hotwired/stimulus"
import { FetchRequest } from "@rails/request.js";

export default class extends Controller {
  static targets = ["name", "initialPage", "form", "nameInput", "submitButton"];
  static outlets = ["global"];

  connect() {
    if (this.hasNameInputTarget) {
      const length = this.nameInputTarget.value.length;
      this.nameInputTarget.focus();
      this.nameInputTarget.setSelectionRange(length, length);

      this.nameInputTarget.addEventListener('input', (ev) => {
        if (this.submitButtonTarget.disabled && ev.target.value.trim()) {
          this.submitButtonTarget.disabled = null;
        } else if (!this.submitButtonTarget.disabled && !ev.target.value.trim()) {
          this.submitButtonTarget.disabled = true;
        }
      });
    }
  }

  // async showModal(ev) {
  //   ev.preventDefault();
  //   const { path } = ev.target?.dataset || {};
  //   const request = new FetchRequest('get', path);
  //   this.globalOutlet.showOverlay();
  //   this.globalOutlet.showLoading();
  //   const response = await request.perform();
  //   this.globalOutlet.hideLoading();

  //   if (response.ok) {
  //     const html = await response.html;
  //     this.globalOutlet.setModal({ title: 'Form Test', content: html });
  //     this.globalOutlet.showModal();
  //   } else {
  //     alert('Somehting went wrong. Try again later.');
  //   }
  // }
  // closeModal(ev) {
  //   ev.preventDefault();
  //   this.globalOutlet.resetModal();
  //   this.globalOutlet.hideModal();
  //   this.globalOutlet.hideOverlay();
  // }

  async new(ev) {
    ev.preventDefault();
    const { path, title } = ev.target?.dataset || {};
    const request = new FetchRequest('get', path);
    this.globalOutlet.showOverlay();
    this.globalOutlet.showLoading();
    const response = await request.perform();
    this.globalOutlet.hideLoading();

    if (response.ok) {
      const html = await response.html;
      this.globalOutlet.setModal({ controller: 'boards', title, content: html });
      this.globalOutlet.showModal();
    } else {
      alert('Somehting went wrong. Try again later.');
    }
  }

  async create(ev) {
    ev.preventDefault();
    const formData = new FormData(this.formTarget);
    const request = new FetchRequest(
      'post',
      this.formTarget.getAttribute('action'),
      {
        body: formData,
        responseKind: 'turbo-stream',
      }
    );
    this.globalOutlet.showLoading();
    const response = await request.perform();
    this.globalOutlet.hideLoading();
    if (response.ok) {
      this.globalOutlet.hideOverlay();
      this.globalOutlet.resetModal();
      this.globalOutlet.hideModal();
      await response.renderTurboStream();
    } else {
      const errors = await response.json;
      const fields = this.formTarget.querySelectorAll('.field [required]');
      fields.forEach(requiredField => requiredField.classList.remove('error'));
      Object.keys(errors).forEach(field => {
        const element = this.formTarget.querySelector(`#item_${field}`);
        element?.classList.add('error');
      });
      alert('Somehting went wrong. Try again later.');
    }
  }

  async edit(ev) {
    // TODO: Error if path is not defined?
    const { path, title } = ev.target?.dataset || {};
    const request = new FetchRequest('get', path);
    this.globalOutlet.showOverlay();
    this.globalOutlet.showLoading();
    const response = await request.perform();
    this.globalOutlet.hideLoading();

    if (response.ok) {
      const html = await response.html;
      this.globalOutlet.setModal({ title: 'Show Boardxxx', content: html });
      this.globalOutlet.showModal();
    } else {
      alert('Somehting went wrong. Try again later.');
      this.globalOutlet.hideOverlay();
    }
  }

  async update(ev) {
    // not enable submit if no changes
    ev.preventDefault();
    const formData = new FormData(this.formTarget);
    const request = new FetchRequest(
      'patch',
      this.formTarget.getAttribute('action'),
      {
        body: formData,
        responseKind: 'turbo-stream',
      }
    );
    this.globalOutlet.showLoading();
    const response = await request.perform();
    this.globalOutlet.hideLoading();
    this.globalOutlet.hideOverlay();
    this.globalOutlet.resetModal();
    this.globalOutlet.hideModal();
    if (response.ok) {
      await response.renderTurboStream();
    } else {
      alert('Somehting went wrong. Try again later.');
    }
  }
}
