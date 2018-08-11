$(function () {
  var currentPage = 1;
  var pageSize = 6;
  render();

  function render() {
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      type: 'get',
      success: function (info) {
        $('tbody').html(template('tmp', info));
        // 分类处理
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

  $('#addBtn').click(function () {
    $('#addModal').modal('show');

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

  $('#downList').on('click','a', function () {
    var id = $(this).data('id');
    var txt = $(this).text();
    $('[name="categoryId"]').val(id);
    $('#downText').text(txt);
    $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
  });

  // 上传文件
  $('#files').fileupload({
    dataType: 'json',
    done: function (e, data) {
      var url = data.result.picAddr;
      $('#imgBox img').attr('src', url);
      $('[name="brandLogo"]').val(url);
    $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');      
    }
  });

  // 表单校验初始化
  $('#form').bootstrapValidator({
    // 
    excluded: [],
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
            message: '请上传文件'
          }
        }
      }
    }
  });

  // 校验成功后,发送ajax请求
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      url: '/category/addSecondCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      type: 'post',
      success: function (info) {
        // console.log(info);
        if (info.success) {
          $('#addModal').modal('hide');
          currentPage = 1;
          render();
          $('#form').data('bootstrapValidator').resetForm(true);
          $('#downText').text('请选择一级分类');
          $('#imgBox img').attr('src','./images/none.png');
        }
      }
    });
  });
});