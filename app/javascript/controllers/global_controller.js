import { Controller } from "@hotwired/stimulus";
import TrueCropper from "truecropper";

export default class extends Controller {
  static targets = [
    "overlay", "loading", "modal", "modalTitle", "modalContent",
    "imageCropper"
  ];
  static cropper = null;
  static cropperCancelCallback = null;
  static cropperConfirmCallback = null;

  hideOverlay() {
    this.overlayTarget.style.display = 'none';
    document.body.style.overflow = null;
  }
  showOverlay() {
    document.body.style.overflow = 'hidden';
    this.overlayTarget.style.display = 'block';
  }

  hideLoading() {
    this.loadingTarget.style.display = 'none';
    this.overlayTarget.style.zIndex = null;
    this.loadingTarget.style.zIndex = null;
  }
  showLoading() {
    this.loadingTarget.style.display = 'flex';
    this.loadingTarget.style.zIndex = 5;
    this.overlayTarget.style.zIndex = 3;
  }

  closeModal() {
    this.modalTarget.style.display = 'none';
    this.modalTitleTarget.innerText = '';
    this.modalContentTarget.innerHTML = '';
    this.hideOverlay();
  }
  hideModal() {
    this.modalTarget.style.display = 'none';
  }
  showModal() {
    this.modalTarget.style.display = 'block';
  }
  resetModal() {
    this.setModal({ title: '', content: '' });
  }
  setModal({ title, content }) {
    this.modalTitleTarget.innerText = title;
    this.modalContentTarget.innerHTML = content;
  }

  showImageCropper = ({ file, options, onConfirm, onCancel }) => {
    this.imageCropperTarget.style.display = 'block';
    this.cropperCancelCallback = onCancel;
    this.cropperConfirmCallback = onConfirm;

    // this.hideModal();
    const opts = {
      allowFlip: false,
      allowNewSelection: false,
      ...options
    };
    this.cropper = new TrueCropper("#image-cropper", opts);
    const reader = new FileReader();

    reader.onload = (ev) => {
      this.cropper.setImage(ev.target.result.toString());
      this.overlayTarget.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
  closeImageCropper() {
    this.imageCropperTarget.style.display = 'none';
    this.overlayTarget.style.display = 'none';
    this.cropper.destroy();
    // this.showModal();
  }
  cancelImageCropper() {
    this.cropperCancelCallback();
    this.closeImageCropper();
  }
  confirmImageCropper() {
    this.cropperConfirmCallback();
    this.closeImageCropper();
  }
}
