$(function () {
  // 1- 渲染一级分类数据
  firstRender();
  function firstRender() {
    $.ajax({
      url: '/category/queryTopCategory',
      dataType: 'json',
      type: 'get',
      success: function (info) {
        console.log(info);
        var str = template('tmp1',info);
        $('.left ul').html(str);
        secondRender( info.rows[0].id );
      }
    });
  }
  function secondRender( id ) {
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
    secondRender(id);
    $(this).addClass('current').parent().siblings().find('a').removeClass('current');
  });
});