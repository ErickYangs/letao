// 检测是否登录
if (location.href.indexOf('login.html') === -1) {
  $.ajax({
    url: '/employee/checkRootLogin',
    dataType: 'json',
    type: 'get',
    success: function (info) {
      if (info.error === 400) {
        location.href = 'login.html';
      }
    }
  });
}

// 进度条
// 第一条ajax请求发送时 开启进度条
$(document).ajaxStart(function () {
  NProgress.start();
});
// 最后一条ajax结束时,关闭进度条
$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done();
  }, 500);
});


/**
 * 主页效果
 */
$(function () {
  // 1- 侧边栏分类点击显示隐藏效果
  $('#category').click(function () {
    $('.nav .child').stop().slideToggle();
  });
  // 2- 菜单按钮点击,侧边栏效果
  $('.icon_menu').click(function () {
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
    $('.topbar').toggleClass('hidemenu');
  });
  // 3- 退出菜单点击,模态框效果
  $('.icon_logout').click(function () {
    $('#logoutModal').modal('show');
  });
  // 4- 点击退出按钮,退出登录
  $('.logoutBtn').click(function () {
    $.ajax({
      url: '/employee/employeeLogout',
      dataType: 'json',
      type: 'get',
      success: function (info) {
        if (info.success) {
          location.href = 'login.html';
        }
      }
    });
  });
});