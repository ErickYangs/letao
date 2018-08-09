$(function () {
  var currentPage = 1;
  var pageSize = 7;
  //1- 渲染数据
  render();

  function render() {
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        $('tbody').html(template('tmp', info));
        // 分页
        $('#paginator').bootstrapPaginator({
          // 版本
          bootstrapMajorVersion: 3,
          // 总页数
          totalPages: Math.ceil(info.total / info.size),
          // 当前页
          currentPage: info.page,
          // 页码点击事件
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }

        });
      }
    });
  }

  //2- 添加的模态框
  $('.addBtn').click(function () {
    $('#addModal').modal('show');
  });

  //3- 表单初始化验证
  $('#form').bootstrapValidator({
    // 错误提示图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 配置校验字段
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '请输入一级分类'
          }
        }
      }
    }
  });

  //4- 校验成功之后,通过ajax请求
  $('#form').on('success.form.bv',function (e) {
    // 手动阻止表格提交的事件
    e.preventDefault();

    $.ajax({
      url:'/category/addTopCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      type:'post',
      success: function (info) {
        // console.log(info);
        if (info.success) {
          // 重新渲染第一页
          currentPage = 1;
          render();
          // 模态框隐藏
          $('#addModal').modal('hide');
          // 重置模态框的内容
          $('#form').data('bootstrapValidator').resetForm(true);
        }
      }
    });
  });
});