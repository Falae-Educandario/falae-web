import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = { height: Number, width: Number };
  static targets = [
    'image', 'fileInput', 'cropX', 'cropY', 'cropW', 'cropH',
  ];
  static outlets = ["global"];
  static tmpCrop = {};

  initialize() {
    this.state = {};
  }

  setState() {
    if (this.hasFileInputTarget) {
      this.state.image = this.imageTarget.src;
      this.state.cropX = this.cropXTarget.value;
      this.state.cropY = this.cropYTarget.value;
      this.state.cropW = this.cropWTarget.value;
      this.state.cropH = this.cropHTarget.value;
    }
  }

  confirmCrop = () => {
    this.cropXTarget.value = this.tmpCrop.x;
    this.cropYTarget.value = this.tmpCrop.y;
    this.cropWTarget.value = this.tmpCrop.width;
    this.cropHTarget.value = this.tmpCrop.height;
    this.imageTarget.src = this.tmpCrop.imgData;
  }

  resetCrop = () => {
    this.fileInputTarget.value = null;
    this.tmpCrop = {};
  }

  connect() {
    this.setState();

    this.fileInputTarget.addEventListener('change', (ev) => {
      this.globalOutlet.showImageCropper({
        file: ev.target.files[0],
        onConfirm: this.confirmCrop,
        onCancel: this.resetCrop,
        options: {
          aspectRatio: this.widthValue/this.heightValue,
          minSize: {
            height: this.heightValue,
            width: this.widthValue,
          },
          defaultSize: {
            height: this.heightValue,
            width: this.widthValue,
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
