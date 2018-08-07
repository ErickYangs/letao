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
});