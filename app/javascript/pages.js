document.addEventListener('turbo:load', () => {
  // pageItemsTab = document.getElementsByClassName('page-items-tab')[0]
  // pageMobileTab = document.getElementsByClassName('page-mobile-tab')[0]
  const pageItemList = document.getElementsByClassName('page-items')[0];
  // pageMobileView = document.getElementsByClassName('page-mobile-view')[0]

  // if pageItemsTab
  //   pageItemsTab.addEventListener 'click', () ->
  //     pageMobileTab.classList.remove 'active'
  //     pageMobileView.classList.remove 'active'
  //     pageItemsTab.classList.add 'active'
  //     pageItemList.classList.add 'active'

  // if pageMobileTab
  //   pageMobileTab.addEventListener 'click', () ->
  //     pageItemsTab.classList.remove 'active'
  //     pageItemList.classList.remove 'active'
  //     pageMobileTab.classList.add 'active'
  //     pageMobileView.classList.add 'active'

  const addDragAndDropEventListeners = () => {
    const items = pageItemList.querySelectorAll('.items-list-item:not(.add-button)');
    let srcElement = null;
    items.forEach(item => {
      item.addEventListener('dragstart', ev => {
        srcElement = this;
        this.style.opacity = '0.5';
        ev.dataTransfer.effectAllowed = 'move';
        ev.dataTransfer.setData('text/html', this.innerHTML);
        itemMenu = this.getElementsByClassName('items-list-item-menu')[0];
        itemMenu.style.display = 'none';
      });

      item.addEventListener('dragenter', () => {
        if (srcElement != this) {
          this.classList.add('over');
        }
      });

      item.addEventListener('dragover', (e) => {
        if (srcElement != this) {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
        }
        return false;
      });

      item.addEventListener('dragleave', (e) => {
        this.classList.remove('over');
      });

      item.addEventListener('drop', (e) => {
        e.stopPropagation();
        if (srcElement != this) {
          $.ajax({
            type: "PUT",
            url: window.location.href + '/swap_items',
            data: {
              id_1: srcElement.dataset.id,
              id_2: this.dataset.id
            },
            beforeSend: addLoadingLayer,
            success: removeLoadingLayer
          });
        }
        return false;
      });

      item.addEventListener('dragend', () => {
        this.style.opacity = '1';
        const itemMenu = this.getElementsByClassName('items-list-item-menu')[0];
        itemMenu.style.display = '';
      });
    });
  };

  if (pageItemList) {
    addDragAndDropEventListeners();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          addDragAndDropEventListeners();
        }
      });
    });
    observer.observe(pageItemList, { childList: true });
  }

  const addLoadingLayer = () => {
    const spinner = document.createElement('div');
    spinner.className = 'fa fa-spinner fa-pulse fa-3x fa-fw';
    const loadingLayer = document.createElement('div');
    loadingLayer.id = 'loading-layer';
    loadingLayer.appendChild(spinner);
    document.body.appendChild(loadingLayer);
  };

  const removeLoadingLayer = () => {
    const loadingLayer = document.getElementById('loading-layer');
    if (loadingLayer) {
      document.body.removeChild(loadingLayer);
    }
  };
});
