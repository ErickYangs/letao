$(function () {

  var currentPage = 1;
  var pageSize = 5;
  var currentId; // 当前选中的用户id
  var isDelete;
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

  // 3- 点击启用禁用按钮,显示模态框,通过事件委托
  $('tbody').on('click','.btn',function () {
    // 显示模态框
    $('#userModal').modal('show');

    // 获取用户 id
    currentId = $(this).parent().data('id');

    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
    
  });

  // 4- 点击确认按钮,发送ajax请求,修改对应用户状态
  $('#submitBtn').click(function () {
    $.ajax({
      url: '/user/updateUser',
      type: 'post',
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType:'json',
      success: function (info) {
        if (info.success) {
          //1- 关闭模态框
          $('#userModal').modal('hide');
          //2- 页面重新渲染
          render();
        }

      }
    });
  });

});