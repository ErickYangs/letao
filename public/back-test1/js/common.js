// 判断是否登录
if (location.href.indexOf('login.html') === -1) {
  $.ajax({
    url: '/employee/checkRootLogin',
    type: 'get',
    dataType: 'json',
    success: function (info) {
      if (info.seccess) {
        console.log('已登录');
      }
      if (info.error === 400) {
        location.href = 'login.html';
      }
    }
  });
}




// 进度条
// 第一条ajax请求发送时执行
$(document).ajaxStart(function () {
  // 开启进度条
  NProgress.start()
});
// ajax请求全部完成时执行
$(document).ajaxStop(function () {
  // 关闭进度条
  // 延时模拟效果
  setTimeout(function () {
    NProgress.done();
  }, 500);
});


// 主页js效果
$(function () {
  //1. 分类点击显示隐藏效果
  $('#category').click(function () {
    $('.nav .child').stop().slideToggle();
  });
  //2. 点击菜单按钮,左侧侧边栏显示隐藏效果
  $('.icon-menu').click(function () {
    $('.lt-aside').toggleClass('hidmenu');
    $('.lt-main').toggleClass('hidmenu');
    $('.lt-topbar').toggleClass('hidmenu');
  });
  //3. 退出按钮点击,模态框显示效果
  $('.icon-logout').click(function () {
    $('#logoutModal').modal('show');
  });
  //4. 点击模态框中退出按钮,退出登录
  $('#logoutBtn').click(function () {
    $.ajax({
      url: '/employee/employeeLogout',
      type: 'get',
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          location.href = 'login.html';
        }
      }
    });
  });
});