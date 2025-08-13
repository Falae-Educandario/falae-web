import { Controller } from "@hotwired/stimulus";
import { FetchRequest } from '@rails/request.js';

const CATEGORIES = [
  "greetings-social-expressions",
  "subject", "verb", "noun",
  "adjective", "other",
];

export default class extends Controller {
  static targets = [
    'modal', 'form', 'name', 'speech', 'categoryId',
    'pictogramName', 'pictogramCategory', 'pictogramImage',
    'fileInput', 'cropX', 'cropY', 'cropW', 'cropH',
  ];
  static values = { id: Number, url: String, userid: Number };
  static outlets = ["global"];
  static tmpCrop = {};

  connect() {
    if (this.hasNameTarget) {
      ['change', 'keyup'].forEach(ev => {
        this.nameTarget.addEventListener(ev, () => {
          this.pictogramNameTarget.innerText = this.nameTarget.value;
          // TODO: Check how to update speech if equals to name
          if (this.nameTarget.value === this.speechTarget.value) {
            this.speechTarget.value = this.nameTarget.value;
          }
        });
      });
    }

    if (this.hasCategoryIdTarget) {
      this.categoryIdTarget.addEventListener('change', () => {
        const ctg = CATEGORIES[this.categoryIdTarget.value - 1];
        this.pictogramCategoryTarget.classList = `item ${ctg}`;
      });
    }

    if (this.hasFileInputTarget) {
      this.fileInputTarget.addEventListener('change', (ev) => {
        this.globalOutlet.showImageCropper({
          file: ev.target.files[0],
          onConfirm: this.confirmCrop,
          onCancel: this.resetCrop,
          options: {
            aspectRatio: 1,
            minSize: {
              width: 150,
              height: 150,
            },
            defaultSize: {
              width: 150,
              height: 150,
            },
            onCropEnd: (instance, data) => {
              this.tmpCrop = { ...data };
              const canvas = instance.getImagePreview();
              if (canvas) {
                this.tmpCrop['imgData'] = canvas.toDataURL();
              }
            },
          },
        });
      });
    }
  }

  async upsert(ev) {
    // not enable submit if no changes
    ev.preventDefault();
    const formData = new FormData(this.formTarget);
    const method = this.idValue ? 'patch' : 'post';
      // Filter only fields that have been changed for patch
    const request = new FetchRequest(
      method,
      this.formTarget.getAttribute('action'),
      {
        body: formData,
      }
    );
    this.globalOutlet.showLoading();
    const response = await request.perform();
    this.globalOutlet.hideLoading();
    if (response.ok) {
      this.globalOutlet.resetModal();
      const text = await response.text();
      this.dispatch('upsert', { detail: { content: text }});
    } else {
      alert('Somehting went wrong. Try again later.');
    }
  }

  async show() {
    const request = new FetchRequest('get', this.urlValue);
    const response = await request.perform()
    if (response.ok) {
      const html = await response.html;
      this.dispatch('showItem', { detail: { title: 'Show Item', content: html }});
    } else {
      alert('Somehting went wrong. Try again later.');
    }
  }



  confirmCrop = () => {
    this.cropXTarget.value = this.tmpCrop.x;
    this.cropYTarget.value = this.tmpCrop.y;
    this.cropWTarget.value = this.tmpCrop.width;
    this.cropHTarget.value = this.tmpCrop.height;
    this.pictogramImageTarget.src = this.tmpCrop.imgData;
  }

  resetCrop = () => {
    this.tmpCrop = {};
  }
}
