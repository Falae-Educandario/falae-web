import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.element.textContent = "Hello World!"
  }

  // added for testing
  static targets = [ "name", "output", "overlay" ]

  greet() {
    this.overlayTarget.style.color = 'red';
    this.overlayTarget.style.display = 'none';
    this.outputTarget.textContent =
      `Hello, ${this.nameTarget.value}!`;
  }
}
