import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "links" ]

  connect() {
    const anchors = this.element.querySelectorAll('.paginate > a');
    anchors.forEach(anchor => {
      anchor.dataset.action = 'will-paginate#click';
    });
  }
}
