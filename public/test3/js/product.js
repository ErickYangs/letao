$(function () {
  var currentPage = 1;
  var pageSize = 8;
  var picArr = [];
  render();
  function render() {
    $.ajax({
      url: '/product/queryProductDetailList',
      dataType: 'json',
      type: 'get',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        $('tbody').html(template('tmp', info));
        // 分页处理
        $('#pagination').bootstrapPaginator({
          // 设置版本
          bootstrapMajorVersion: 3,
          // 总页数
          totalPages: Math.ceil(info.total / info.size),
          // 当前页
          currentPage: info.page,
          // 页码点击事件
          onPageClicked: function (a,b,c,page) {
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
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      type: 'get',
      success: function (info) {
        console.log(info);
        $('#downList').html(template('tmp2', info));
      }
    });
  });

  $('#downList').on('click','a', function () {
    var id = $(this).data('id');
    var txt = $(this).text();
    $('#downText').text(txt);
    $('[name="brandId"]').val(id);
    $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');
  });

  // 上传文件
  $('#files').fileupload({
    dataType: 'json',
    done: function (e, data) {
      picArr.unshift(data.result);
      var url = data.result.picAddr;
      $('#imgBox').prepend(' <img src="'+ url +'" style="width: 100px;">');
      
      if (picArr.length > 3) {
        picArr.pop();
        $('#imgBox img:last-of-type').remove();
      }
      if (picArr.length === 3) {
         $('#form').data('bootstrapValidator').updateStatus('picUrlArr','VALID');
      }
    }
  });

  // 初始化校验表单
  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '请输入商品库存'
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '非0数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品尺寸'
          },
          //正则校验
          regexp: {
            regexp: /^[0-9]{2}-[0-9]{2}$/,
            message: 'xx-xx'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品原价'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品现价'
          }
        }
      },
      picUrlArr: {
        validators: {
          notEmpty: {
            message: '请上传三张图片'
          }
        }
      }
    }
  });

  // 校验完成发送ajax请求
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    var str = $('#form').serialize();
    // &picAddr1=xx&picName1=xx
    // &picAddr2=xx&picName2=xx
    // &picAddr3=xx&picName3=xx
    str += '&picAddr1='+ picArr[0].picAddr +'&picName1='+picArr[0].picName;
    str += '&picAddr2='+ picArr[1].picAddr +'&picName2='+picArr[1].picName;
    str += '&picAddr3='+ picArr[2].picAddr +'&picName3='+picArr[2].picName;
    $.ajax({
      url: '/product/addProduct',
      data: str,
      dataType: 'json',
      type: 'post',
      success: function (info) {
        console.log(info);
        if (info.success) {
          currentPage = 1;
          render();
          $('#addModal').modal('hide');
          $('#form').data('bootstrapValidator').resetForm(true);
          $('#downText').text('请选择二级分类');
          $('#imgBox img').remove();
          picArr = [];
        }
      }
    });
  });
});