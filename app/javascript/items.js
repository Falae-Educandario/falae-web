// document.addEventListener('turbo:load', () => {
//   // filter items
//   const itemsSeach = document.getElementById('items-search-area');
//   if (itemsSeach) {
//     const childrenArray = Array.from(itemsSeach.children);
//     const input = childrenArray.find(el => el.tagName.toLowerCase() === 'input')
//     const searchBtn = childrenArray.find(el => el.tagName.toLowerCase() === 'button')

//     if (input?.value?.trim()) {
//       searchBtn.disabled = false;
//     }

//     input.addEventListener('keyup', ev => {
//       searchBtn.disabled = !input.value.trim();

//       if (ev.key == "Enter" && input.value.trim()) {
//         searchBtn.click();
//       }

//       if (ev.key == "Escape") {
//         input.value = '';
//         input.blur();
//       }
//     });

//     searchBtn.addEventListener("click", () => {
//       location.href = searchBtn.dataset.path + '?name=' + input.value.trim();
//     });
//   }

//   const itemImage = document.getElementById('item-image')
//   if (itemImage) {
//     // shows item image in edit view
//     itemImage.parentElement.style.display = 'inline-block';
//   }

//   const itemImageInput = document.getElementById('item_image_attributes_image');
//   if (itemImageInput) {
//     // add event listener to load item image preview on form
//     itemImageInput.addEventListener('change', ev => {
//       const files = ev.target.files;
//       const image = files[0];
//       if (image && /.*\.(jpe?g|png|gif)/i.test(image.name)) {
//         const reader = new FileReader();
//         reader.readAsDataURL(image);
//         return reader.onload = file => {
//           return loadPreview(file);
//         };
//       } else {
//         const inputFileButton = document.getElementsByClassName('wrapper-custom-input-file')[0];
//         const unsuportedImageTypeText = inputFileButton.dataset.unsupportedImageType;
//         return alert(unsuportedImageTypeText);
//       }
//     });
//   }

//   const loadPreview = file => {
//     const imgBase64 = new Image();
//     imgBase64.src = file.target.result;
//     let originalImgWidth = 0;
//     let originalImgHeight = 0;
//     let initialXPos = 0;
//     let initialYPos = 0;
//     let selectionWidth = 150;
//     let selectionHeight = 150;
//     const overlay = document.getElementsByClassName('overlay')[0];
//     overlay.style.display = 'block';
//     const imgCropContainer = document.getElementsByClassName('img-crop-container')[0]
//     imgCropContainer.innerHTML = imgBase64.outerHTML;

//     const updateCrop = coords => {
//       document.getElementById('crop_x').value = coords.x;
//       document.getElementById('crop_y').value = coords.y;
//       document.getElementById('crop_w').value = coords.w;
//       document.getElementById('crop_h').value = coords.h;
//     };

//     const resetCrop = () => {
//       document.getElementById('crop_x').value = '';
//       document.getElementById('crop_y').value = '';
//       document.getElementById('crop_w').value = '';
//       document.getElementById('crop_h').value = '';
//     };

//     imgBase64.onload = () => {
//       originalImgWidth = imgBase64.width;
//       originalImgHeight = imgBase64.height;
//       initialXPos = Math.max(0, originalImgWidth/2 - selectionWidth/2);
//       initialYPos = Math.max(0, originalImgHeight/2 - selectionHeight/2);
//       $('.img-crop-container img').Jcrop({
//         allowSelect: false,
//         aspectRatio: selectionWidth / selectionHeight,
//         boxWidth: 760,
//         minSize: [selectionWidth, selectionHeight],
//         setSelect: [
//           initialXPos,
//           initialYPos,
//           initialXPos + selectionWidth,
//           initialYPos + selectionHeight
//         ],
//         onChange: updateCrop,
//         onSelect: updateCrop,
//       });
//     }

//     const updatePhotoPreview = ev => {
//       const cropW = document.getElementById('crop_w').value;
//       const cropH = document.getElementById('crop_h').value;
//       const cropX = document.getElementById('crop_x').value;
//       const cropY = document.getElementById('crop_y').value;
//       imgBase64.width = selectionWidth * originalImgWidth / cropW;
//       imgBase64.height = selectionHeight * originalImgHeight / cropH;
//       const rx = selectionWidth / cropW;
//       const ry = selectionHeight / cropH;
//       const itemImageWrapper = document.getElementById('item-image-wrapper');
//       itemImageWrapper.innerHTML = imgBase64.outerHTML;
//       itemImageWrapper.style.display = 'inline-block';
//       const imgItemImageWrapper = itemImageWrapper.getElementsByTagName('img')[0];
//       imgItemImageWrapper.style.marginLeft = '-' + Math.round(rx * cropX) + 'px';
//       imgItemImageWrapper.style.marginTop = '-' + Math.round(rx * cropY) + 'px';
//       closeDialog(ev);
//     }

//     const closeDialog = ev => {
//       if (ev) {
//         ev.preventDefault();
//       }
//       overlay.style.display = 'none';
//       document.body.style.overflow = 'initial';
//       document.removeEventListener('keyup', closeDialogOnEscape);
//     };

//     const closeDialogOnClick = ev => {
//       resetCrop();
//       closeDialog(ev);
//     };

//     const closeDialogOnEscape = ev => {
//       if (ev.which == 27) { // ESC
//         closeDialogOnClick(ev);
//       } else if (ev.which == 13) { // ENTER
//         updatePhotoPreview(ev);
//       }
//     };

//     document.getElementById('crop-btn').addEventListener('click', updatePhotoPreview);
//     document.getElementsByClassName('close')[0].addEventListener('click', closeDialog);
//     document.addEventListener('keyup', closeDialogOnEscape);
//   }
// });
