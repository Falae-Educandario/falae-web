import { Controller } from "@hotwired/stimulus";
import { FetchRequest } from "@rails/request.js";
// import { Turbo } from "@hotwired/turbo";

export default class extends Controller {
  static targets = [
    "itemsList", "searchArea", "searchResult", "searchInput",
    "filterButton",
    // "modal", "loading"
  ];
  static values = { userid: Number };
  static outlets = ["global"]

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
        responseKind: 'turbo-stream'
      }
    );
    this.globalOutlet.showOverlay();
    this.globalOutlet.showLoading();
    const response = await request.perform();
    this.globalOutlet.hideOverlay();
    this.globalOutlet.hideLoading();
    this.searchAreaTarget.style.display = 'none';
    this.searchResultTarget.style.display = 'flex';
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
    this.searchAreaTarget.style.display = 'flex';
    this.searchResultTarget.style.display = 'none';
    if (response.ok) {
      this.searchInputTarget.value = '';
      this.filterButtonTarget.disabled = true;
      await response.renderTurboStream();
    } else {
      alert('Somehting went wrong. Try again later.');
    }
  }

  async new(ev) {
    ev.preventDefault();
    const url = ev.target?.dataset?.newItemUrl;
    const request = new FetchRequest('get', url);
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

  updateItemsList({ detail: { content }}) {
    this.itemslistTarget.innerHtml = content;
  }
}
