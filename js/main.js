const buttons = document.querySelectorAll('.section-3__button');
const container = document.querySelector('.section-3__items');
const items = document.querySelectorAll('.section-3__item');

function jsGrid(container, items) {
  container.style.position = 'relative';
  let wrapIndicator = 0;
  let lineHeight = 0;
  let lineHeightSum = 0;
  for (let i = 0; i < items.length; i++) {
    items[i].style.position = 'absolute';
    items[i].style.transform = 'scale(1)';
    if (wrapIndicator + items[i].clientWidth - 1 > container.clientWidth) {
      wrapIndicator = 0;
      lineHeightSum += lineHeight;
      lineHeight = 0;
    }
    lineHeight = items[i].clientHeight <= lineHeight ? lineHeight : items[i].clientHeight;
    items[i].style.left = wrapIndicator + 1 + 'px';
    items[i].style.top = lineHeightSum + 'px';
    wrapIndicator += items[i].clientWidth - 1;
  }
}

function maxHeight(container, items) {
  let wrapIndicator = 0;
  let lineHeight = 0;
  let lineHeightSum = 0;
  let containerHeightIter = 0;
  let containerHeightArr = [];
  let containerHeight = 0;
  for (let i = 0; i < items.length; i++) {
    if (wrapIndicator + items[i].clientWidth - 1 > container.clientWidth) {
      containerHeightIter++;
      wrapIndicator = 0;
      lineHeightSum += lineHeight;
      lineHeight = 0;
    }
    lineHeight = items[i].clientHeight <= lineHeight ? lineHeight : items[i].clientHeight;
    containerHeightArr[containerHeightIter] = lineHeight;
    containerHeight = 0;
    for (let i = 0; i < containerHeightArr.length; i++) {
      containerHeight += containerHeightArr[i];
    }
    container.style.height = containerHeight + 'px';
    wrapIndicator += items[i].clientWidth - 1;
  }
}

function sorting(items, callback) {
  let arr = [];
  for (let i = 0; i < items.length; i++) {
    if (callback(items[i])) {
      arr.push(items[i]);
    }
  }
  return arr;
}

function sort(buttons, container, items) {
  maxHeight(container, items);
  jsGrid(container, items);
  window.addEventListener('resize', function() {
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].classList.contains('active')) {
        const number = buttons[i].getAttribute('data-sorting');
        const sortArr = sorting(items, function(item) {
          let arr = item.getAttribute('data-sorting').split(' ');
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] === number) {
              return true;
            }
          }
        });
        jsGrid(container, sortArr);
      }
    }
  });
  buttons.forEach(function(element) {
    element.addEventListener('click', function() {
      buttons.forEach(function(element) {
        element.classList.remove('active');
      });
      this.classList.add('active');
      const number = this.getAttribute('data-sorting');
      if (!number) {
        jsGrid(container, items);
      } else {
        const sortArr = sorting(items, function(item) {
          let arr = item.getAttribute('data-sorting').split(' ');
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] === number) {
              return true;
            }
          }
        });
        const unSortArr = sorting(items, function(item) {
          let arr = item.getAttribute('data-sorting').split(' ');
          for (let i = 0; i < arr.length; i++) {
            if (!(arr[i] === number)) {
              return true;
            }
          }
        });
        unSortArr.forEach(function(element) {
          element.style.transform = 'scale(0)';
        });
        jsGrid(container, sortArr);
      }
    });
  });
}

sort(buttons, container, items);