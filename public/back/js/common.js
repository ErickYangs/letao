/**
 * 实现进度条功能
 */

// 5. 判断用户是否登录,实现登录拦截
/**
 *  (1) 用户已登录,继续访问
 *  (2) 用户未登录,拦截到登录页
 */
// 一进入页面,发送ajax请求
if (location.href.indexOf('login.html') === -1) {
  // 不是login页面,进行登录页面
  $.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    dataType: 'json',
    success: function (info) {
      if (info.success) {
        console.log('已登录');
      }
      if (info.error === 400) {
        location.href = 'login.html';
      }
    }
  });
}



// 在发送第一个ajax请求时,开启进度条,
// 在最后一个ajax请求回来时,关闭进度条

// ajax 全局事件

$(document).ajaxStart(function () {
  // 开启进度条
  NProgress.start();
});
$(document).ajaxStop(function () {
  // 关闭进度条
  // 模拟网络延迟
  setTimeout(function () {
    NProgress.done();
  }, 500);
});



$(function () {
  // 公共功能实现
  // 1. 左侧二级菜单切换
  $('.lt-aside .category').click(function () {
    $('.lt-aside .child').stop().slideToggle();
  });
  // 2. 点击切换侧边栏
  $('.icon-menu').click(function () {
    $('.lt-aside').toggleClass('hidemenu');
    $('.lt-main').toggleClass('hidemenu');
    $('.lt-topbar').toggleClass('hidemenu');
  });
  // 3. 点击退出菜单,显示退出模态框
  $('.icon-logout').click(function () {
    $('#logoutModal').modal('show');
  });
  // 4.点击退出按钮,实现用户退出
  $('#logoutBth').click(function () {
    // 需发送ajax请求
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          location.href = 'login.html';
        }
      }
    });
  });
});