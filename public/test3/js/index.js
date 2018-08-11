$(function () {
  // 柱状图
  // 基于准备好的dom，初始化echarts实例
  var echarts_1 = echarts.init(document.querySelector('.echarts_1'));

  // 指定图表的配置项和数据
  var option1 = {
    title: {
      text: '2017年注册人数'
    },
    tooltip: {},
    legend: {
      data: ['人数']
    },
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [1215, 2201, 1736, 210, 3110, 120]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts_1.setOption(option1);

  //饼图
  // 基于准备好的dom，初始化echarts实例
  var echarts_2 = echarts.init(document.querySelector('.echarts_2'));

  // 指定图表的配置项和数据
  var option2 = {
    backgroundColor: '#2c343c',

    title: {
      text: '热门品牌销售',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#ccc'
      }
    },

    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1]
      }
    },
    series: [{
      name: '销售记录',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: [{
          value: 335,
          name: '耐克'
        },
        {
          value: 310,
          name: '阿迪'
        },
        {
          value: 274,
          name: '阿迪王'
        },
        {
          value: 235,
          name: '李宁'
        },
        {
          value: 400,
          name: '新百伦'
        }
      ].sort(function (a, b) {
        return a.value - b.value;
      }),
      roseType: 'radius',
      label: {
        normal: {
          textStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          }
        }
      },
      labelLine: {
        normal: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        }
      },
      itemStyle: {
        normal: {
          color: '#c23531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },

      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200;
      }
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts_2.setOption(option2);
});