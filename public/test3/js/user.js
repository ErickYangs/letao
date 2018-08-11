$(function () {
  var currentPage = 1;
  var pageSize = 5;
  var id;
  var isDelete;
  // 获取用户信息
  render();
  function render() {
    $.ajax({
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      type: 'get',
      success: function (info) {
        $('tbody').html(template('userList', info));
        // 分页处理
        $('#pagination').bootstrapPaginator({
          // 指定版本
          bootstrapMajorVersion: 3,
          // 总页数
          totalPages: Math.ceil(info.total / info.size),
          // 当前页
          currentPage: info.page,
          // 页码点击事件
          onPageClicked: function (a,b,c, page) {
            currentPage = page;
            render();
          }
        });
      }
    });
  }

  $('tbody').on('click','button', function () {
    id = $(this).parent().data('id');
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
    $('#updateModal').modal('show');
  });

  $('.updateBtn').click(function () {
    $.ajax({
      url: '/user/updateUser',
      data: {
        id: id,
        isDelete: isDelete
      },
      dataType: 'json',
      type: 'post',
      success: function (info) {
        if (info.success) {
          render();
          $('#updateModal').modal('hide');
        }
      }
    });
  });

});