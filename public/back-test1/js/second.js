$(function () {
  var currentPage = 1;
  var pageSize = 8;
  // 1- 渲染数据
  render();

  function render() {
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        $('tbody').html(template('tmp', info));
        // 分页处理
        $('#pagination').bootstrapPaginator({
          // 设置bootstrap版本
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


  //2- 点击添加按钮,显示模态框
  $('#addBtn').click(function () {
    $('#addModal').modal('show');

    // 渲染下拉分类
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      type: 'get',
      success: function (info) {
        // console.log(info);
        $('#downList').html(template('tmp2', info));
      }
    });
  });

  //3- 下拉数据点击事件
  $('#downList').on('click', 'a', function () {
    var id = $(this).data('id');
    var txt = $(this).text();
    $('#downText').text(txt);
    $('[name="categoryId"]').val(id);

    $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID');
  });

  //4- 上传文件
  $('#files').fileupload({
    dataType: 'json',
    done: function (e, data) {
      // console.log(data);
      var url = data.result.picAddr;
      $('#imgBox img').attr('src', url);
      $('[name="brandLogo"]').val(url);

      $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');

    }
  });

  //5- 表单校验初始化
  $('#form').bootstrapValidator({
    // 隐藏的也许校验
    excluded: [],
    // 校验时显示的图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传logo'
          }
        }
      }
    }
  });

  //6- 校验成功之后,通过ajax发送请求
  $('#form').on('success.form.bv', function (e) {
    // 手动阻止默认事件
    e.preventDefault();

    $.ajax({
      url: '/category/addSecondCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      type: 'post',
      success: function (info) {
        // console.log(info);
        // 重新渲染第一页
        currentPage = 1;
        render();
        // 关闭模态框
        $('#addModal').modal('hide');
        // 重置表单数据
        $('#form').data('bootstrapValidator').resetForm(true);
        // 重置文本和图片链接
        $('#downText').text('请选择一级分类');
        $('#imgBox img').attr('src', './images/none.png');
      }
    });
  })
});