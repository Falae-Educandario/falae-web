import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['tab'];

  connect() {
    this.tabTargets.forEach(tab => {
      tab.addEventListener('click', (ev) => {
        this.tabTargets.forEach(tab => tab.classList.remove('active'));
        ev.target.classList.add('active');
      });
    });
  }
}
