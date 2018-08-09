$(function () {
  var currentPage = 1;
  var pageSize = 6;
  var id;
  var isDelete;
  // 1- 渲染数据
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
        $('tbody').html(template('tmp',info));
        // 分页处理
        $('#pagination').bootstrapPaginator({
          // 指定版本
          bootstrapMajorVersion:3,
          // 总页数
          totalPages: Math.ceil(info.total / info.size),
          // 当前页
          currentPage: info.page,
          // 页码点击事件
          onPageClicked: function (a,b,c,page) {
            // 重新渲染当前页
            currentPage = page;
            render();
          }
        });
      }
    });
  }

  //2- 改变状态
  $('tbody').on('click','.btn',function () {
    $('#changeModal').modal('show');
    id = $(this).parent().data('id');
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;

  });

  $('.changeBtn').click(function () {
    $.ajax({
      url: '/user/updateUser',
      data: {
        id: id,
        isDelete: isDelete
      },
      dataType: 'json',
      type: 'post',
      success: function (info) {
        // console.log(info);
        if (info.success) {
          // 重新渲染当前页
          render();
          // 关闭模态框
          $('#changeModal').modal('hide');
        }
      }
    });
  });
});