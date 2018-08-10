$(function () {
  var currentPage = 1;
  var pageSize = 7;
  // 1- 渲染数据
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
        $('#pagination').bootstrapPaginator({
          bootstrapMajorVersion: 3, 
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
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

  $('#downList').on('click','a',function () {
    var txt = $(this).text();
    var id = $(this).parent().data('id');
    $('[name="categoryId"]').val(id);
    $('#downText').text(txt);
    $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');    
  });

  $('#files').fileupload({
    dataType: 'json',
    done: function (e, data) {
      // console.log(data);
      var url = data.result.picAddr;
      $('#imgBox img').attr('src', url);
      $('[name="brandLogo"]').val(url);
      $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
    }
  });

  $('#form').bootstrapValidator({
    excluded: [],
    // 校验图标
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

  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();

    $.ajax({
      url: '/category/addSecondCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      type: "post",
      success: function (info) {
        // console.log(info);
        if (info.success) {
          currentPage = 1;
          render();
          $('#addModal').modal('hide');
          $('#form').data('bootstrapValidator').resetForm(true);
          $('#downText').text('请选择一级分类');
          $('#imgBox img').attr('src', './images/none.png')
        }
      }
    });
  });
});