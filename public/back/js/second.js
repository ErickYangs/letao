$(function () {
  var currentPage = 1;
  var pageSize = 5;
  //1- 渲染数据
  render()
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
        // console.log(info);
        $('tbody').html(template('tmp', info));

        // 分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          // 总页数
          totalPages:Math.ceil(info.total / info.size),
          // 当前页面
          currentPage: info.page,
          // 渲染当前页面
          onPageClicked: function (a,b,c, page) {
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
    // 渲染下拉一级分类数据
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      type: 'get',
      success: function (info) {
        console.log(info);
        $('#downList').html(template('tmpDown', info));
      }
    });
  });

  //3- 点击一级分类数据,改变内容
  $('#downList').on('click','a',function () {
    var txt = $(this).text();
    $('.downText').text(txt);
    var id = $(this).data('id');
    // console.log(id)
    $('#listId').val(id);
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
  });

  //4- 图片上传
  $('#files').fileupload({
    dataType:'json',
    // 上传之后的事件
    done: function (e, data) {
      var imgUrl = data.result.picAddr;
      // console.log(imgUrl);
      $('#imgBox img').attr('src', imgUrl);
      $('#brandLogo').val(imgUrl);

      // 手动改变校验状态
      $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
    }
  });

  //5- 初始化表单验证
  $('#form').bootstrapValidator({
    // 隐藏的也需要验证
    excluded: [],
    // 验证时显示的图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 配置字段
    fields: {
      // categoryId 分类id
      // brandName 二级分类名称
      // brandLogo 图片地址
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择图片"
          }
        }
      }
    }
  });

  //6- 校验成功之后,通过ajax请求服务器
  $('#form').on('success.form.bv',function (e) {
    // 阻止提交的默认行为
    e.preventDefault();

    $.ajax({
      url: '/category/addSecondCategory',
      data: $('#form').serialize(),
      dataType:'json',
      type:'post',
      success: function (info) {
        // console.log(info);
        if (info.success) {
          currentPage = 1;
          render();

          $('#addModal').modal('hide');
          // 
          $('#form').data('bootstrapValidator').resetForm(true);

          // 手动重置
          $('.downText').text('请选择一级分类');
          $('#imgBox img').attr('src','./images/none.png');
        }
      }
    });
  });
});