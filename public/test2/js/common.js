// 判断用户是否登录
if (location.href.indexOf('login.html') === -1) {
  $.ajax({
    url: '/employee/checkRootLogin',
    dataType: 'json',
    type: 'get',
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



// 进度条

$(document).ajaxStart(function () {
  // 开启进度条
  NProgress.start();
});
$(document).ajaxStop(function () {
  // 关闭进度条
  setTimeout(function () {
    NProgress.done();
  }, 500);
});


/**
 *  主页效果
 */

$(function () {
  //1- 分类展开效果
  $('#category').click(function () {
    $('.nav .child').stop().slideToggle();
  });
  //2- 侧边栏效果
  $('.icon_menu').click(function () {
    $('.lt_aside').toggleClass('hidemenu');
    $('.li_main').toggleClass('hidemenu');
    $('.li_topbar').toggleClass('hidemenu');
  });
  //3- 登出模态框效果
  $('.icon_logout').click(function () {
    $('#logoutModal').modal('show');
  });
  //4- 点击退出按钮,退出登录
  $('.logoutBtn').click(function () {
    $.ajax({
      url: '/employee/employeeLogout',
      dataType: 'json',
      type: 'get',
      success: function (info) {
        console.log(info);
        if (info.success) {
          location.href = 'login.html';
        }
      }
    });
  });
});