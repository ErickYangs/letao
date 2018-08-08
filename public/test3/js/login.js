$(function () {
  // 表单校验初始化
  $('#form').bootstrapValidator({
    // 指定校验字段
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空',
          },
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度在2-6位'
          },
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空',
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度在6-12位'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    },
    // 校验时显示的图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  });
  // 表单校验成功后,通过ajax提交到后台验证数据
  $('#form').on('success.form.bv',function (e) {
    // 手动阻止浏览器默认提交表单的行为
    e.preventDefault();
    // 通过ajax提交数据
    $.ajax({
      url: '/employee/employeeLogin',
      data: $('#form').serialize(),
      dataType: 'json',
      type: 'post',
      success: function (info) {
        if (info.success) {
          location.href = 'index.html';
        };
        if (info.error === 1000) {
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
        };
        if (info.error === 1001) {
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
        }
      }
    });
  });
  // 重置表单状态
  $('[type="reset"]').click(function () {
    $('#form').data('bootstrapValidator').resetForm();
  });
});