$(function () {
  var currentPage = 1;
  var pageSize = 5;

  //1- 渲染数据
  render();
  function render() {
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      type: 'get',
      success: function (info) {
        $('tbody').html(template('tmp', info));
        // 进行分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          // 总页数
          totalPages: Math.ceil(info.total / info.size),
          // 当前第几页
          currentPage: info.page,
          // 注册按钮点击事件
          onPageClicked: function (a,b,c,page) {
            // 更新当前页
            currentPage = page;
            render();
          }
        });
      }
    });
  }

});