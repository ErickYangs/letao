$(function () {
  // 渲染一级分类
  renderFirst();
  function renderFirst() {
    $.ajax({
      url: '/category/queryTopCategory',
      dataType: 'json',
      type: 'get',
      success: function (info) {
        console.log(info);
        $('.left ul').html(template('left', info));
        renderSecond(info.rows[0].id);
      }
    });
  }

  function renderSecond(id) {
    $.ajax({
      url: '/category/querySecondCategory',
      dataType: 'json',
      data: {
        id: id
      },
      type: 'get',
      success: function (info) {
        console.log(info);
        $('.right ul').html(template('right', info));
      }
    });
  }

  $('.left ul').on('click','a', function () {
    var id = $(this).data('id');
    renderSecond(id);
    $(this).addClass('current').parent().siblings().find('a').removeClass('current');
  });
});