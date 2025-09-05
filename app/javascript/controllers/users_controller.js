import { Controller } from '@hotwired/stimulus';
import { get, patch } from '@rails/request.js';

export default class extends Controller {
  static targets = ['form'];
  static outlets = ['global'];

  async update(ev) {
    ev.preventDefault();
    const formData = new FormData(this.formTarget);
    this.globalOutlet.showOverlay();
    this.globalOutlet.showLoading();
    const response = await patch(
      this.formTarget.getAttribute('action'),
      {
        body: formData,
        responseKind: 'turbo-stream',
      }
    );
    this.globalOutlet.hideLoading();
    this.globalOutlet.hideOverlay();
    if (response.ok) {
      await response.renderTurboStream();
    } else {
      alert('Somehting went wrong. Try again later.');
    }
  }

  async changeEmail(ev) {
    ev.preventDefault();
    const { modalTitle: title } = ev.target.dataset || {};
    this.globalOutlet.showOverlay();
    this.globalOutlet.showLoading();
    const response = await get(ev.target.href);
    this.globalOutlet.hideLoading();

    if (response.ok) {
      const content = await response.html;
      this.globalOutlet.setModal({ title, content });
      this.globalOutlet.showModal();
    } else {
      alert('Somehting went wrong. Try again later.');
    }
  }

  async updateEmail(ev) {
    ev.preventDefault();
    const formData = new FormData(this.formTarget);
    this.globalOutlet.showOverlay();
    this.globalOutlet.showLoading();
    const response = await new patch(
      this.formTarget.getAttribute('action'),
      {
        body: formData,
        responseKind: 'turbo-stream',
      }
    );
    this.globalOutlet.hideLoading();
    this.globalOutlet.hideOverlay();
    if (response.ok) {
      this.globalOutlet.hideLoading();
      this.globalOutlet.hideModal();
      this.hideOverlay();
      this.resetModal();
      await response.renderTurboStream();
    } else {
      alert('Somehting went wrong. Try again later.');
    }
  }
}
