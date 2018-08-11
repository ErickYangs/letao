$(function () {
  var currentPage = 1;
  var pageSize = 6;
  render();
// 渲染数据
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
        // 分页处理
        $('#pagination').bootstrapPaginator({
          // 指定版本
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

// 
$('#addBtn').click(function () {
  $('#addModal').modal('show');
});

// 表单校验初始化
$('#form').bootstrapValidator({
  // 校验图标
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
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

$('#form').on('success.form.bv', function (e) {
  e.preventDefault();
  $.ajax({
    url: '/category/addTopCategory',
    data: $('#form').serialize(),
    dataType: 'json',
    type: 'post',
    success: function (info) {
      if (info.success) {
        $('#addModal').modal('hide');
        currentPage = 1;
        render();
        $('#form').data('bootstrapValidator').resetForm(true);
      }
    }
  });
});

});