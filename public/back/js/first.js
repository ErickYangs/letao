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

  $('#addBtn').click(function () {
    $('#addModal').modal('show');
  });


  // 3- 使用表单校验插件
  $('#form').bootstrapValidator({
     // 配置图标
     feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '一级分类不能为空'
          }
        }
      }
    }
  });

  // 4- 注册表单成功事件,
  $('#form').on('success.form.bv',function (e) {
    e.preventDefault();

    $.ajax({
      url: '/category/addTopCategory',
      type: 'post',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          // 添加成功
          // 关闭模态框
          $('#addModal').modal('hide');
          // 页面重新渲染第一页
          currentPage = 1;
          render();
          // 重置模态框
          $('#form').data('bootstrapValidator').resetForm(true);
        }
      }
    });
  })
});