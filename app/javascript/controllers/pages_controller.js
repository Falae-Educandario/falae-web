import { Controller } from "@hotwired/stimulus"
import { FetchRequest } from '@rails/request.js'

export default class extends Controller {
  static targets = ["name", "searchItemForm", "searchResult", "addItemToPageUrl"];
  static values = { searchUrl: String, addItemToPage: String }

  openSearchItemForm() {
    const clone = this.searchItemFormTarget.cloneNode({ deep: true });
    const searchFrom = clone.querySelector('.search-form');
    searchFrom.dataset.controller = 'pages';
    searchFrom.dataset.action = 'will-paginate:link-clicked->pages#pagination';
    this.dispatch(
      "openSearchItemForm",
        {
          detail: {
            title: 'Search Item',
            content: clone.innerHTML,
          }
        }
      );
  }

  pagination(...params) {
    console.log(params)
  }

  async fetchItems(ev) {
    ev.preventDefault();
    const offset = ev.target?.dataset?.offset;
    const request = new FetchRequest(
      'get',
      this.searchUrlValue,
      {
        query: {
          name: this.nameTarget.value,
          search: true,
          ...(offset && { offset })
        }
      }
    );
    const response = await request.perform()
    if (response.ok) {
      const html = await response.html;
      this.searchResultTarget.innerHTML = html;
    } else {
      alert('Somehting went wrong. Try again later.');
    }
  }
}
