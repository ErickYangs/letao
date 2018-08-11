$(function () {
  var currentPage = 1;
  var pageSize = 5;
  var picArr = [];
  // 1- 渲染数据
  render();

  function render() {
    $.ajax({
      url: '/product/queryProductDetailList',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      type: 'get',
      success: function (info) {
        console.log(info);
        $('tbody').html(template('tmp1', info));

        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil(info.total / info.size),
          currentPage: info.page,
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          },
          itemTexts: function (type,  page,  current) {
            switch (type) {
              case 'page':
                return page;
              case 'next':
                return '下一页';
              case 'prev':
                return '上一页';
              case 'first':
                return '首页';
              case 'last':
                return '尾页'
            }
          },
          tooltipTitles: function (type,  page,  current) {
            switch (type) {
              case 'page':
                return '第' + page + '页';
              case 'next':
                return '下一页';
              case 'prev':
                return '上一页';
              case 'first':
                return '首页';
              case 'last':
                return '尾页'
            }
          },
          useBootstrapTooltip: true
        });
      }
    });
  }

  $('#addBtn').click(function () {
    $('#addModal').modal('show');

    // 渲染下拉数据
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
    $('[name="brandId"]').val(id);
    var txt = $(this).text();
    $('#downText').text(txt);

    $('#form').data('bootstrapValidator').updateStatus("brandId", "VALID");
  });

  // 上传文件
  $('#files').fileupload({
    dataType: 'json',
    done: function (e, data) {
      console.log(data.result);
      picArr.unshift(data.result);
      var url = data.result.picAddr;
      $('#imgBox').prepend('<img src="' + url + '" style="width: 100px;">');

      if (picArr.length > 3) {
        picArr.pop();
        $('#imgBox img:last-of-type').remove();
      }
      if (picArr.length === 3) {
        // 说明上传 3 张图片了, 将picStatus校验状态置成 VALID
        $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
      }
    }
  });

  // 校验初始化
  $('#form').bootstrapValidator({
    // 隐藏的也需要验证
    excluded: [],
    // 验证时显示的图标
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
      picStatus: {
        validators: {
          notEmpty: {
            message: '请上传3张图片'
          }
        }
      }
    }
  });

  // 校验完成ajax上传文件
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    var str = $('#form').serialize();
    // &picAddr1=xx&picName1=xx
    // &picAddr2=xx&picName2=xx
    // &picAddr3=xx&picName3=xx
    str += '&picAddr1='+ picArr[2].picAddr +'&picName1='+picArr[2].picName;
    str += '&picAddr2='+ picArr[1].picAddr +'&picName2='+picArr[1].picName;
    str += '&picAddr3='+ picArr[0].picAddr +'&picName3='+picArr[0].picName;

    $.ajax({
      url: '/product/addProduct',
      data: str,
      dataType: 'json',
      type: 'post',
      success: function (info) {
        console.log(info);
        if (info.success) {
          $('#addModal').modal('hide');
          currentPage = 1;
          render();
          $('#form').data("bootstrapValidator").resetForm(true);
          $('#imgBox img').remove();
          $('#downText').text('请选择二级分类');
          picArr = [];
        }
      }
    });
  });
});