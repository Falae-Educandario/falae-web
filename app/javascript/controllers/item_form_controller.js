import { Controller } from "@hotwired/stimulus";
import { FetchRequest } from '@rails/request.js';

const CATEGORIES = [
  "greetings-social-expressions",
  "subject", "verb", "noun",
  "adjective", "other",
];

export default class extends Controller {
  static targets = [
    'form', 'name', 'speech', 'categoryId',
    'pictogramName', 'pictogramCategory', 'pictogramImage',
    'fileInput', 'cropX', 'cropY', 'cropW', 'cropH',
    'submitButton',
  ];
  static outlets = ["global"];
  static tmpCrop = {};

  initialize() {
    this.state = {};
  }

  setState() {
    this.state.name = this.nameTarget.value;
    this.state.speech = this.speechTarget.value;
    this.state.categoryId = this.categoryIdTarget.value;
    this.state.pictogramImage = this.pictogramImageTarget.src;
    this.state.cropX = this.cropXTarget.value;
    this.state.cropY = this.cropYTarget.value;
    this.state.cropW = this.cropWTarget.value;
    this.state.cropH = this.cropHTarget.value;
  }

  hasChanges() {
    return this.state.name !== this.nameTarget.value ||
      this.state.speech !== this.speechTarget.value ||
      this.state.categoryId !== this.categoryIdTarget.value ||
      this.state.pictogramImage !== this.pictogramImageTarget.src ||
      this.state.cropX !== this.cropXTarget.value ||
      this.state.cropY !== this.cropYTarget.value ||
      this.state.cropW !== this.cropWTarget.value ||
      this.state.cropH !== this.cropHTarget.value;
  }

  connect() {
    this.setState();

    // this.formTarget.addEventListener('input', () => {
    //   this.submitButtonTarget.disabled = !this.hasChanges();
    // });

    ['change', 'keyup'].forEach(ev => {
      this.nameTarget.addEventListener(ev, () => {
        this.pictogramNameTarget.innerText = this.nameTarget.value;
        // TODO: Check how to update speech if equals to name
        if (this.nameTarget.value === this.speechTarget.value) {
          this.speechTarget.value = this.nameTarget.value;
        }
      });
    });


    this.categoryIdTarget.addEventListener('change', () => {
      const ctg = CATEGORIES[this.categoryIdTarget.value - 1];
      this.pictogramCategoryTarget.classList = `item ${ctg}`;
    });


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
