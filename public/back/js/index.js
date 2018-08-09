$(function () {
  // 柱状图
  // 基于准备好的dom，初始化echarts实例
  var echarts_1 = echarts.init(document.querySelector('.echarts_1'));

  // 指定图表的配置项和数据
  var option1 = {
    title: {
      text: '2017年注册人数'
    },
    // 提示框组件
    tooltip: {
      trigger: 'axis',
    },
    // 图例
    legend: {
      data: ['人数']
    },
    // x轴的刻度
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    // y轴的刻度,注意 y 轴的刻度应该根据数据动态生成
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [1500, 1200, 1360, 2100, 910, 1020]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts_1.setOption(option1);


  // 饼图
  // 基于准备好的dom，初始化echarts实例
  var echarts_2 = echarts.init(document.querySelector('.echarts_2'));

  // 指定图表的配置项和数据
  var option2 = {
    title: {
      text: '热门品牌销售',
      subtext: '2017年6月',
      // 让整个标题居中
      x: 'center'
    },
    // 提示框组件
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克', '阿迪', '新百伦', '李宁', '阿迪王']
    },
    series: [{
      name: '品牌',
      type: 'pie',
      // radius 配置直径  相对于容器
      radius: '55%',
      // 配置圆心的位置
      center: ['50%', '60%'],
      data: [{
          value: 335,
          name: '耐克'
        },
        {
          value: 310,
          name: '阿迪'
        },
        {
          value: 234,
          name: '新百伦'
        },
        {
          value: 135,
          name: '李宁'
        },
        {
          value: 1548,
          name: '阿迪王'
        }
      ],
      // 添加阴影效果
      itemStyle: {
        emphasis: {
          shadowBlur: 100,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts_2.setOption(option2);
});