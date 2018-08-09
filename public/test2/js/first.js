$(function () {
  var currentPage = 1;
  var pageSize = 5;
  // 1-渲染数据
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
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil(info.total / info.size),
          currentPage: info.page,
          onPageClicked: function (a,b,c,page) {
            currentPage = page;
            render();
          }
        });
      }
    });
  };
  render();

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
    // 配置校验字段名
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '请输入一级分类名'
          }
        }
      }
    }
  });

  // 校验成功后发送ajax请求
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      url: '/category/addTopCategory',
      data: $('#form').serialize(),
      dataType:'json',
      type:'post',
      success: function (info) {
        $('#addModal').modal('hide');
        currentPage = 1;
        render();
      }
    });
  });
});