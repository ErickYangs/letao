$(function () {
  // 表单校验初始化
  $('#form').bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 配置字段(不要忘记给input加name)
    fields: {
      username: {
        // 校验规则
        validators: {
          // 非空校验
          notEmpty: {
            // 配置提示信息
            message: "用户名不能为空"
          },
          // 长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须是2-6位",
          },
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          // 非空校验
          notEmpty: {
            message: "密码不能为空"
          },
          // 长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须是2-6位",
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    },
    
  });

  /**
   * 实现登录功能
   *  submit 按钮. 默认点击时会提交表单提交,插件会在表单提交时进行校验
   *  (1) 如果校验成功,页面会跳转,我们需要阻止这次跳转,通过ajax提交请求
   *  (2) 如果校验失败,默认插件会阻止这次提交跳转
   */
  $('#form').on('success.form.bv',function (e) {
    // 手动浏览器阻止默认行为,阻止表单提交
    e.preventDefault();
    // 通过ajax 进行提交请求
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      dataType:'json',
      data: $('#form').serialize(),
      success: function (info) {
        console.log(info);
        // 处理响应
        if (info.success) {
          // 跳转到首页
          location.href = 'index.html';
        }
        if (info.error === 1000) {
          // alert('用户名不存在');
          // 如果用户不存在,更新表单校验状态,并设置提示信息
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
        }
        if (info.error === 1001) {
          // alert('密码错误');
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
        }
      }
    });
  });

  /**
   * 解决重置按钮bug
   */
  $('[type="reset"]').click(function () {
    // 调用插件方法,进行重置表单校验状态
    // 
    $('#form').data('bootstrapValidator').resetForm();
  });
});