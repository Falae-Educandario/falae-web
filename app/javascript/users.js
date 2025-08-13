document.addEventListener('turbo:load', () => {
  const editCheckBox = document.getElementById('edit_sensitive_data');
  if (editCheckBox) {
    editCheckBox.addEventListener('click', ev => {
      const sensitiveDataElems = document.getElementsByClassName('sensitive-data');
      for(elem in sensitiveDataElems) {
        const input = elem.getElementsByTagName('input')[0];
        if (ev.target.checked) {
          elem.style.color = 'inherit';
          input.disabled = false;
          input.style.color = '#2E8B57';
        } else {
          elem.style.color = '#AAAAAA';
          input.disabled = true;
          input.style.color = '#AAAAAA';
        }
      }
    })
  }

  const userPhotoInput = document.getElementById('user_photo');
  if (userPhotoInput) {
    // add event listener to load item image preview on form
    userPhotoInput.addEventListener('change', ev => {
      const files = ev.target.files;
      const photo = files[0];
      if (photo && /.*\.(jpe?g|png|gif)/i.test(photo.name)) {
        const reader = new FileReader();
        reader.readAsDataURL(photo);
        return reader.onload = file => {
          return loadPreview(file);
        };
      } else {
        const inputFileButton = document.getElementsByClassName('wrapper-custom-input-file')[0];
        const unsuportedPhotoTypeText = inputFileButton.dataset.unsupportedPhotoType;
        return alert(unsuportedPhotoTypeText);
      }
    });
  }

  const loadPreview = file => {
    const imgBase64 = new Image();
    imgBase64.src = file.target.result;
    let originalImgWidth = 0;
    let originalImgHeight = 0;
    let initialXPos = 0;
    let initialYPos = 0;
    let selectionWidth = 150;
    let selectionHeight = 180;
    const overlay = document.getElementsByClassName('overlay')[0];
    overlay.style.display = 'block';
    const imgCropContainer = document.getElementsByClassName('img-crop-container')[0]
    imgCropContainer.innerHTML = imgBase64.outerHTML;

    const updateCrop = coords => {
      document.getElementById('crop_x').value = coords.x;
      document.getElementById('crop_y').value = coords.y;
      document.getElementById('crop_w').value = coords.w;
      document.getElementById('crop_h').value = coords.h;
    };

    const resetCrop = () => {
      document.getElementById('crop_x').value = '';
      document.getElementById('crop_y').value = '';
      document.getElementById('crop_w').value = '';
      document.getElementById('crop_h').value = '';
    };

    imgBase64.onload = () => {
      originalImgWidth = imgBase64.width;
      originalImgHeight = imgBase64.height;
      initialXPos = Math.max(0, originalImgWidth/2 - selectionWidth/2);
      initialYPos = Math.max(0, originalImgHeight/2 - selectionHeight/2);
      $('.img-crop-container img').Jcrop({
        allowSelect: false,
        aspectRatio: selectionWidth / selectionHeight,
        boxWidth: 760,
        minSize: [selectionWidth, selectionHeight],
        setSelect: [
          initialXPos,
          initialYPos,
          initialXPos + selectionWidth,
          initialYPos + selectionHeight
        ],
        onChange: updateCrop,
        onSelect: updateCrop
      });
    };

    const updatePhotoPreview = ev => {
      const cropW = document.getElementById('crop_w').value;
      const cropH = document.getElementById('crop_h').value;
      const cropX = document.getElementById('crop_x').value;
      const cropY = document.getElementById('crop_y').value;
      imgBase64.width = selectionWidth * originalImgWidth / cropW;
      imgBase64.height = selectionHeight * originalImgHeight / cropH;
      const rx = selectionWidth / cropW;
      const ry = selectionHeight / cropH;
      const userPhotoWrapper = document.getElementById('user-photo-wrapper');
      userPhotoWrapper.innerHTML = imgBase64.outerHTML;
      const imgUserPhotoWrapper = userPhotoWrapper.getElementsByTagName('img')[0];
      imgUserPhotoWrapper.style.marginLeft = '-' + Math.round(rx * cropX) + 'px';
      imgUserPhotoWrapper.style.marginTop = '-' + Math.round(rx * cropY) + 'px';
      closeDialog(ev);
    };

    const closeDialog = ev => {
      if (ev) {
        ev.preventDefault();
      }
      overlay.style.display = 'none';
      document.body.style.overflow = 'initial';
      document.removeEventListener('keyup', closeDialogOnEscape);
    };

    const closeDialogOnClick = ev => {
      resetCrop();
      closeDialog(ev);
    };

    const closeDialogOnEscape = ev => {
      if (ev.which == 27) { // ESC
        closeDialogOnClick(ev);
      } else if (ev.which == 13) { // ENTER
        updatePhotoPreview(ev);
      }
    };

    document.getElementById('crop-btn').addEventListener('click', updatePhotoPreview);
    document.getElementsByClassName('close')[0].addEventListener('click', closeDialog);
    document.addEventListener('keyup', closeDialogOnEscape);
  }
});
