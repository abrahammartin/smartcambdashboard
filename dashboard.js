var testGrid = [
  {w: 2, h: 2, x: 0, y: 0},
  {w: 2, h: 2, x: 2, y: 0},
  {w: 2, h: 2, x: 4, y: 0},
  {w: 2, h: 2, x: 0, y: 2},
  {w: 2, h: 2, x: 2, y: 2},
  {w: 2, h: 2, x: 4, y: 2},
];

var nboxes = testGrid.length;


function createGrid() {
    $('#grid').gridList({
    lanes: SmartCamGrid.currentSize,
    direction: SmartCamGrid.direction,
    widthHeightRatio: SmartCamGrid.widthHeightRatio,
    heightToFontSizeRatio: SmartCamGrid.heightToFontSizeRatio
  });
}


function assing_resize_binding() {
    $('#grid li .resize').click(function(e) {
    e.preventDefault();
    var itemElement = $(e.currentTarget).closest('li'),
        itemWidth = $(e.currentTarget).data('w'),
        itemHeight = $(e.currentTarget).data('h');
    itemElement.attr('data-w', itemWidth);
    itemElement.attr('data-h', itemHeight);
    $('#grid').gridList('resizeItem', itemElement, {
      w: itemWidth,
      h: itemHeight
    });
  });

  $('#grid li .delete').click(function(e) {
    e.preventDefault();
    if ($(e.currentTarget).data('del') == true) {
      $(e.currentTarget).closest('li').remove();
    }
  });
}

function box_html(box_content) {
  return '<li>' +
          '<div class="inner">' +
            '<div class="controls">' +
              '<a href="#" class="resize mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" data-w="1" data-h="1">1x1</a>' +
              '<a href="#" class="resize mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" data-w="2" data-h="1">2x1</a>' +
              '<a href="#" class="resize mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" data-w="1" data-h="2">1x2</a>' +
              '<a href="#" class="resize mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" data-w="2" data-h="2">2x2</a>' +
              '<a href="#" class="delete mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" data-del="true">del</a>' +
            '</div>' +
            box_content +
          '</div>' +
        '</li>'
} 

var SmartCamGrid = {
  currentSize: 6,
  direction: 'vertical',
  widthHeightRatio: 16/9,
  heightToFontSizeRatio: 0.25,
  buildElements: function($gridContainer, items) {
    var item, i;
    for (i = 0; i < items.length; i++) {
      item = items[i];
      $item = $(box_html(i));
      $item.attr({
        'data-w': item.w,
        'data-h': item.h,
        'data-x': item.x,
        'data-y': item.y
      });
      $gridContainer.append($item);
    }
  },
  appendElement: function($gridContainer, item) {
    $item = $(box_html(nboxes));
    nboxes += 1;
    $item.attr({
      'data-w': item.w,
      'data-h': item.h,
      'data-x': item.x,
      'data-y': item.y
    });
    $gridContainer.append($item);
    createGrid();
    assing_resize_binding();
  }
};


$(window).resize(function() {
  $('#grid').gridList('reflow');
});


$(function() {
  SmartCamGrid.buildElements($('#grid'), testGrid);

  $('#grid').gridList({
    lanes: SmartCamGrid.currentSize,
    direction: SmartCamGrid.direction,
    widthHeightRatio: SmartCamGrid.widthHeightRatio,
    heightToFontSizeRatio: SmartCamGrid.heightToFontSizeRatio
  });

  createGrid();
  assing_resize_binding();

  $('#add-widget').click(function(e) {
    e.preventDefault();
    SmartCamGrid.appendElement($('#grid'), {w: 2, h: 2, x: 0, y: 0});
    $('#grid').gridList('resize', SmartCamGrid.currentSize); // refresh the grid to reallocate spaces
  });
});
