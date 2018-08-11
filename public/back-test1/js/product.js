$(function () {
  var currentpage = 1;
  var pageSize = 6;
  var picArr = [];
  // 1- 渲染数据
  render();

  function render() {
    $.ajax({
      url: '/product/queryProductDetailList',
      data: {
        page: currentpage,
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
          onPageClicked: function (a, b, c, page) {
            currentpage = page;
            render();
          },
          itemTexts: function (type,  page,  current) {
            switch (type) {
              case 'next':
                return '下一页';
              case 'page':
                return '第' + page + '页';
              case 'first':
                return '首页';
              case 'last':
                return '最后一页';
              case 'prev':
                return '上一页';
            }
          },
          tooltipTitles: function (type,  page,  current) {
            switch (type) {
              case 'next':
                return '下一页';
              case 'page':
                return '第' + page + '页';
              case 'first':
                return '首页';
              case 'last':
                return '最后一页';
              case 'prev':
                return '上一页';
            }
          },
          useBootstrapTooltip: true
        });
      }
    });
  }

  $('#addBtn').click(function () {
    $('#addModal').modal('show');
    // 渲染二级分类
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      type: 'get',
      success: function (info) {
        $('#downList').html(template('tmp2', info));
      }
    });
  });

  $('#downList').on('click', 'a', function () {
    var id = $(this).parent().data('id');
    var txt = $(this).text();
    $('#downText').text(txt);
    $('[name="brandId"]').val(id);
    $('#form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
  });

  // 上传文件
  $('#files').fileupload({
    dataType: 'json',
    done: function (e, data) {
      picArr.unshift(data.result);
      var url = data.result.picAddr;
      $('#imgBox').prepend('<img src="' + url + '" style="width: 100px;">');

      if (picArr.length > 3) {
        picArr.pop();
        $('#imgBox img:last-of-type').remove();
      }
      if (picArr.length === 3) {
        $('#form').data('bootstrapValidator').updateStatus('picUrls', 'VALID');
      }
    }
  });

  // 表单校验初始化
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
            regexp: /^[0-9]\d$/,
            message: '商品库存必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品尺码'
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '商品尺码必须是 xx-xx 的格式, 例如 32-40'
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
      picUrls: {
        validators: {
          notEmpty: {
            message: '请上传3张图片'
          }
        }
      }
    }
  });

  // 校验完成发送ajax请求
  $('#form').on('success.form.bv',function (e) {
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
        if (info.success) {
          $('#addModal').modal('hide');
          currentpage = 1;
          render();
          $('#form').data('bootstrapValidator').resetForm(true);
          $('#downText').text('请选择二级分类');
          $('#imgBox img').remove();
          picArr = [];
        }
      }
    });
  });
});