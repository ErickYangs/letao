$(function () {

  

  // 表单校验初始化
  $('#form').bootstrapValidator({
    // 校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
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
            message: '用户名长度必须在2-6位'
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
    }
  });

  // 表单校验成功之后通过ajax判断用户名和密码
  $('#form').on('success.form.bv',function (e) {
    // 手动阻止浏览器提交信息的默认行为
    e.preventDefault();
    // 通过ajax请求服务器判断
    $.ajax({
      url: '/employee/employeeLogin',
      data: $('#form').serialize(),
      dataType: 'json',
      type: 'post',
      success: function (info) {
        console.log(info);
        
        if (info.success) {
          location.href = 'index.html';
        }
        if (info.error === 1000) {
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
        }
        if (info.error === 1001) {
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
        }
      }
    });
  });

  // 表单重置
  $('[type="reset"]').click(function () {
    $('#form').data('bootstrapValidator').resetForm();
  });
});