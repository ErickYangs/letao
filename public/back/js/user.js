$(function () {

  var currentPage = 1;
  var pageSize = 5;
  // 1- 渲染数据
  render();
  function render() {
    $.ajax({
      url: '/user/queryUser',
      type: 'get',
      dataType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        $('tbody').html(template('tmp', info));
        // 2- 分页初始化
        $('#paginator').bootstrapPaginator({
          // 配置 bootstrap 版本
          bootstrapMajorVersion: 3,
          // 需要指定总页数
          totalPages: Math.ceil(info.total / info.size),
          //当前页
          currentPage: info.page,
          // 当页码被点击时调用的回调函数
          onPageClicked: function (a,b,c,page) {
            // 更新当前页
            currentPage = page;
            // 重新渲染
            render();
          }
        });
      }
    });
  }



});