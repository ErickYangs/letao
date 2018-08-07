/**
 * 实现进度条功能
 */

// NProgress.start();


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
  },500);
});
