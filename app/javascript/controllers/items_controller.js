import { Controller } from '@hotwired/stimulus';
import { FetchRequest } from '@rails/request.js';
// import { Turbo } from "@hotwired/turbo";

export default class extends Controller {
  static targets = [
    'searchArea', 'searchResult', 'searchInput', 'filterButton', 'filterName',
    'form', 'itemsList', 'item',
  ];
  // TODO: Review values if they are used
  static values = { itemid: Number, userid: Number };
  static outlets = ['global'];

  connect() {
    if (this.hasSearchInputTarget && this.hasFilterButtonTarget) {
      this.searchInputTarget.addEventListener('input', (ev) => {
        this.filterButtonTarget.disabled = !ev.target.value.trim();
      });
    }
  }

  async filterItems(ev) {
    ev.preventDefault();
    const url = ev.target?.dataset?.filterUrl;
    const request = new FetchRequest(
      'get',
      url,
      {
        query: { name: this.searchInputTarget.value },
        responseKind: 'turbo-stream',
      }
    );
    this.globalOutlet.showOverlay();
    this.globalOutlet.showLoading();
    const response = await request.perform();
    this.globalOutlet.hideOverlay();
    this.globalOutlet.hideLoading();
    this.searchAreaTarget.style.display = 'none';
    this.searchResultTarget.style.display = 'flex';
    this.filterNameTarget.innerText = this.searchInputTarget.value;
    if (response.ok) {
      await response.renderTurboStream();
    } else {
      alert('Somehting went wrong. Try again later.');
    }
  }

  async searchClose(ev) {
    const request = new FetchRequest(
      'get',
      ev.target.dataset.resetSearchUrl,
      {
        responseKind: 'turbo-stream'
      }
    );
    this.globalOutlet.showOverlay();
    this.globalOutlet.showLoading();
    const response = await request.perform();
    this.globalOutlet.hideOverlay();
    this.globalOutlet.hideLoading();
    this.searchAreaTarget.style.display = null;
    this.searchResultTarget.style.display = 'none';
    if (response.ok) {
      this.searchInputTarget.value = '';
      this.filterNameTarget.innerText = '';
      this.filterButtonTarget.disabled = true;
      await response.renderTurboStream();
    } else {
      alert('Somehting went wrong. Try again later.');
    }
  }

  async new(ev) {
    ev.preventDefault();
    const { path } = ev.target?.dataset || {};
    const request = new FetchRequest('get', path);
    this.globalOutlet.showOverlay();
    this.globalOutlet.showLoading();
    const response = await request.perform();
    this.globalOutlet.hideLoading();

    if (response.ok) {
      const html = await response.html;
      this.globalOutlet.setModal({ title: 'Create Item', content: html });
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

  async show(ev) {
    // TODO: Error if path is not defined?
    const { path } = ev.currentTarget?.dataset || {};
    const request = new FetchRequest('get', path);
    this.globalOutlet.showOverlay();
    this.globalOutlet.showLoading();
    const response = await request.perform();
    this.globalOutlet.hideLoading();

    if (response.ok) {
      const html = await response.html;
      this.globalOutlet.setModal({ title: 'Show Item', content: html });
      this.globalOutlet.showModal();
    } else {
      alert('Somehting went wrong. Try again later.');
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
      }
    );
    this.globalOutlet.showLoading();
    const response = await request.perform();
    this.globalOutlet.hideLoading();
    this.globalOutlet.hideOverlay();
    this.globalOutlet.resetModal();
    this.globalOutlet.hideModal();
    if (response.ok) {
      const html = await response.html;
      document
        .querySelector(`.items-list [data-item-id="${this.itemidValue}"]`)
        .outerHTML = html;
    } else {
      alert('Somehting went wrong. Try again later.');
    }
  }

  async destroy(ev) {
    ev.preventDefault();
    const confirmMessage = ev.currentTarget.dataset.turboConfirm;
    if (!confirm(confirmMessage)) {
      return;
    }
    const path = ev.currentTarget?.dataset?.path;
    const request = new FetchRequest(
      'delete',
      path,
      {
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
