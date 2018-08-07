$(function () {
  // 表单初始化校验
  $('#form').bootstrapValidator({
    // 指定校验字段
    fields: {
      // 用户名
      username: {
        validators: {
          // 为空校验
          notEmpty: {
            message: "用户名不能为空"
          },
          // 长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2-6位之间'
          },
          callback: {
            message: '用户名错误'
          }
        }
      },
      password: {
        validators: {
          // 为空校验
          notEmpty: {
            message: '密码不能为空'
          },
          // 长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6-12位之间'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    },
    // 错误提示图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  });


  // 实现登录功能
  /**
   * submit 按钮,默认点击时会提交表单信息,插件会在表单提交时进行校验
   * (1) 如果校验成功,页面会跳转,我们需要阻止这次跳转,通过ajax提交请求
   * (2) 如果校验失败,默认插件会阻止这次提交跳转
   */
  $('#form').on('success.form.bv', function (e) {
    // 手动阻止浏览器默认行为,阻止表单提交
    e.preventDefault();
    // 通过ajax 进行提交请求
    $.ajax({
      url: '/employee/employeeLogin',
      type: 'post',
      dataType: 'json',
      data: $('#form').serialize(),
      success: function (info) {
        // console.log(info);
        if (info.success) {
          // 成功跳转到首页
          location.href = 'index.html';
        }
        if (info.error === 1000) {
          console.log('用户名错误');
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
        }
        if (info.error === 1001) {
          console.log('密码错误');
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
        }
      }
    });
  });

  // 重置表单
  $('[type="reset"]').click(function () {
    // 调用插件方法,进行重置表单校验状态;
    $('#form').data('bootstrapValidator').resetForm();
  });
});