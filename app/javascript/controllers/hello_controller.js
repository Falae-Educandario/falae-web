import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "name", "output", "overlay" ];

  connect() {
    this.element.textContent = "Hello World!"
  }

  greet() {
    this.overlayTarget.style.color = 'red';
    this.overlayTarget.style.display = 'none';
    this.outputTarget.textContent =
      `Hello, ${this.nameTarget.value}!`;
  }
}
