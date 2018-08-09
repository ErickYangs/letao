$(function () {
  var currentPage = 1;
  var pageSize = 7;
  // 1- 渲染数据
  render();

  function render() {
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      type: 'get',
      success: function (info) {
        $('tbody').html(template('tmp', info));
        $('#pagination').bootstrapPaginator({
          bootstrapMajorVersion: 3, 
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }

        });
      }
    });
  }

  
});