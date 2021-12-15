/*
 * @Author: your name
 * @Date: 2021-12-09 14:11:40
 * @LastEditTime: 2021-12-15 16:16:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\assets\js\ChartsOption\option.js
 */
// 绘制左侧面
var echarts = require("echarts");
const CubeLeft = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx, shape) {
    // 会canvas的应该都能看得懂，shape是从custom传入的
    const xAxisPoint = shape.xAxisPoint
    const c0 = [shape.x, shape.y + 6]
    const c1 = [shape.x - 10, shape.y]
    const c2 = [xAxisPoint[0] - 10, xAxisPoint[1] + 1]
    const c3 = [xAxisPoint[0], xAxisPoint[1] + 6]
    ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
  }
});
// 绘制右侧面
const CubeRight = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint
    const c1 = [shape.x, shape.y + 6]
    const c2 = [xAxisPoint[0], xAxisPoint[1] + 6]
    const c3 = [xAxisPoint[0] + 10, xAxisPoint[1] + 1]
    const c4 = [shape.x + 10, shape.y]
    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
  }
});
// 绘制顶面
const CubeTop = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx, shape) {
    const c1 = [shape.x, shape.y + 6]
    const c2 = [shape.x + 10, shape.y]
    const c3 = [shape.x, shape.y - 6]
    const c4 = [shape.x - 10, shape.y]
    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
  }
});
// 注册三个面图形
echarts.graphic.registerShape('CubeLeft', CubeLeft)
echarts.graphic.registerShape('CubeRight', CubeRight)
echarts.graphic.registerShape('CubeTop', CubeTop)

var questionOptionTwo = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none'
    },
    formatter: function (params) {
      const item = params[1]
      return item.name + ' : ' + item.value + "%";
    }
  },
  title: {
    // text: "各题型正误统计图",
    text: "",
    textStyle: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 12,
    },
    textAlign: "center",
    left: "47%",
    top: 0
  },
  dataZoom: [
    {
      type: "inside",
      show: true,
      height: 15,
      xAxisIndex: [0],
      start: 1,
      end: 1,
      zoomOnMouseWheel: false,
    },
  ],
  grid: {
    left: 40,
    top: 30,
    right: 30,
    bottom: 30,
  },
  xAxis: [{
    name: "题型",
    nameGap: 6,
    type: 'category',
    position: 'bottom',
    data: [],
    axisLine: {
      lineStyle: {
        color: '#e0e7ff',
        opacity: 0.3
      }
    },
    nameTextStyle: {
      verticalAlign: 'center'
    },
    axisTick: {
      show: false,
      length: 6,
    },
    axisLabel: {
      interval: 0,
      //show:false,
      margin: 10,
      color: '#fff',
      fontSize: 12,
      rotate: '0'
    },
  }],
  yAxis: {
    type: 'value',
    name: "正确率(%)",
    max: 100.01,
    splitNumber: 4,
    interval: 25,
    axisLine: {
      show: true,
      lineStyle: {
        color: '#e0e7ff',
        opacity: 0.3
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(128,151,177,0.3)',
        type: 'dotted'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      fontSize: 12
    },
    boundaryGap: ['0%', '0%']
  },
  series: [
    {
      type: 'custom',
      renderItem: function (params, api) {
        const location = api.coord([api.value(0), api.value(1)]);
        var color = api.value(1) < 1 ? 'rgba(255,118,118,0.3)' : 'rgba(0,240,255,0.3)'
        var color2 = api.value(1) < 1 ? 'rgba(255,118,118,0.2)' : 'rgba(0,240,255,0.2)'
        var color1 = api.value(1) < 1 ? 'rgba(255,118,118,0.25)' : 'rgba(0,240,255,0.25)'
        return {
          type: 'group',
          children: [{
            type: 'CubeLeft',
            shape: {
              api,
              x: location[0],
              y: location[1],
              xAxisPoint: api.coord([api.value(0), 0])
            },
            style: {
              fill: color2
            }
          }, {
            type: 'CubeRight',
            shape: {
              api,
              x: location[0],
              y: location[1],
              xAxisPoint: api.coord([api.value(0), 0])
            },
            style: {
              fill: color
            }
          }, {
            type: 'CubeTop',
            shape: {
              api,
              x: location[0],
              y: location[1],
              xAxisPoint: api.coord([api.value(0), 0])
            },
            style: {
              fill: color1
            }
          }]
        }
      },
      data: []
    }, {
      type: 'custom',
      renderItem: (params, api) => {
        const location = api.coord([api.value(0), api.value(1)])
        // 柱状图左侧颜色
        var color = api.value(1) > 100 ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#ff7676'
        },
        {
          offset: 1,
          color: '#ea4848'
        }
        ]) : new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          // color: '#61e400'
          color: 'rgba(0,240,255)'

        },
        {
          offset: 1,
          // color: '#389500'
          color: 'rgba(0,240,255,0.5)'
        }
        ])
        // 柱状图顶部颜色
        var color1 = api.value(1) > 100 ? '#ff7676' : new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          // color: '#95fb4c'
          color: 'rgba(0,240,255)'
        },
        {
          offset: 1,
          // color: '#95fb4c'
          color: 'rgba(0,240,255)'
        }
        ])
        // 柱状图右侧颜色
        var color2 = api.value(1) > 100 ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#ff6868'
        },
        {
          offset: 1,
          color: '#cc3b3b'
        }
        ]) : new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          // color: '#53c400'
          color: 'rgba(0,240,255)'
        },
        {
          offset: 1,
          // color: '#2e7a00'
          color: 'rgba(0,240,255,0.2)'
        }
        ])
        return {
          type: 'group',
          children: [{
            type: 'CubeLeft',
            shape: {
              api,
              xValue: api.value(0),
              yValue: api.value(1),
              x: location[0],
              y: location[1],
              xAxisPoint: api.coord([api.value(0), 0])
            },
            style: {
              fill: color
            }
          }, {
            type: 'CubeRight',
            shape: {
              api,
              xValue: api.value(1),
              yValue: api.value(0),
              x: location[0],
              y: location[1],
              xAxisPoint: api.coord([api.value(0), 0])
            },
            style: {
              fill: color2
            }
          }, {
            type: 'CubeTop',
            shape: {
              api,
              xValue: api.value(0),
              yValue: api.value(1),
              x: location[0],
              y: location[1],
              xAxisPoint: api.coord([api.value(0), 0])
            },
            style: {
              fill: color1
            }
          }]
        }
      },
      data: []
    }, {
      type: 'bar',
      label: {
        normal: {
          show: false,
          position: 'top',
          fontSize: 12,
          color: '#',
          offset: [2, -15]
        }
      },
      itemStyle: {
        color: 'transparent'
      },
      tooltip: {

      },
      data: []
    }]
}

var learnOption = {
  cursor: "default",
  color: [],
  tooltip: {
    trigger: 'axis',
    // backgroundColor:'transparent',
    // axisPointer: {
    //     lineStyle: {
    //         color: {
    //             type: 'linear',
    //             x: 0,
    //             y: 0,
    //             x2: 0,
    //             y2: 1,
    //             colorStops: [{
    //                 offset: 0,
    //                 color: 'rgba(126,199,255,0)' // 0% 处的颜色
    //             }, {
    //                 offset: 0.5,
    //                 color: 'rgba(126,199,255,1)' // 100% 处的颜色
    //             }, {
    //                 offset: 1,
    //                 color: 'rgba(126,199,255,0)' // 100% 处的颜色
    //             }],
    //             global: false // 缺省为 false
    //         }
    //     },
    // },
  },
  legend: {
    align: "left",
    right: 'center',
    top: '10%',
    type: 'plain',
    selectedMode: false,
    textStyle: {
      color: '#a2afcc',
      fontSize: 12
    },
    // icon:'rect',
    itemGap: 25,
    itemWidth: 18,
    icon: 'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',

    data: [
      {
        name: '学习速度'
      },
      {
        name: '知识掌握速度'
      }
    ]
  },
  grid: {
    top: '50',
    left: '30',
    right: '30',
    bottom: '15%',
  },
  xAxis: [{
    type: 'category',
    boundaryGap: false,
    axisLine: { //坐标轴轴线相关设置。数学上的x轴
      show: true,
      lineStyle: {
        color: 'rgba(224,231,255,0.3)'
      },
    },
    axisLabel: { //坐标轴刻度标签的相关设置
      textStyle: {
        color: '#ffffff',
        padding: 10,
        fontSize: 14
      },
      formatter: function (data) {
        return data
      }
    },
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    data: []
  }],
  yAxis: [{
    min: 0,
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(128,151,177,0.3)', type: 'dotted'
      },
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  }],
  series: [
    {
      cursor: "default",
      name: '学习速度',
      type: 'line',
      symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
      showAllSymbol: true,
      symbolSize: 0,
      smooth: true,
      lineStyle: {
        normal: {
          width: 2,
          color: "#37eed6", // 线条颜色
        },
      },
      itemStyle: {
        color: "#37eed6", // 线条颜色
      },
      tooltip: {
        show: true
      },
      data: []
    },
    {
      cursor: "default",
      name: '知识掌握速度',
      type: 'line',
      symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
      showAllSymbol: true,
      symbolSize: 0,
      smooth: true,
      lineStyle: {
        normal: {
          color: "rgba(228,226,62,1)", // 线条颜色
        },
        borderColor: 'rgba(0,0,0,.4)',
      },
      itemStyle: {
        color: "rgba(228,226,62,1)", // 线条颜色

      },
      tooltip: {
        show: true
      },
      data: []
    }]
};

var vocabOption = {
  tooltip: {
    trigger: 'item',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: '2%',
    right: '50',
    bottom: '10',
    top: '16%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
    axisLine: {
      lineStyle: {
        color: 'rgba(224,231,255,0.3)',
        width: '2'

      }
    },
    axisTick: { show: false },
    axisLabel: {
      textStyle: {
        color: "#ffffff"
      }
    },
  },

  yAxis: [{
    type: 'value',
    axisLine: {
      show: false,
      lineStyle: {
        color: '#cdd5e2'
      }
    },
    splitLine: {
      show: false,
    },
    axisLabel: {
      show: false,
      textStyle: {
        color: "#666666"
      }
    },
  },
  {
    type: "value",
    name: "",
    nameTextStyle: {
      color: "#666666"
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(128,151,177,0.3)',
        type: 'dotted'
      }
    },
    splitNumber: 4,
    interval: 25,
    max: 100,
    position: "right",
    axisLine: {
      lineStyle: {
        color: '#cdd5e2'
      }
    },
    axisLabel: {
      show: false,
      formatter: "{value} %", //右侧Y轴文字显示
      textStyle: {
        color: "#666666"
      }
    }
  }
  ],
  series: [{
    name: '平均掌握量',
    type: 'bar',
    barWidth: '16px',
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#00ccff'
        }, {
          offset: 1,
          color: '#003aff'
        }]),
        barBorderRadius: [2, 2, 0, 0],
      },
    },
    data: [400, 400, 300, 300, 300, 400, 400, 400, 300]
  },
  {
    name: '平均答对率',
    type: 'bar',
    barWidth: '16px',
    yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#009880'
        }, {
          offset: 1,
          color: '#37eed6'
        }]),
        barBorderRadius: [2, 2, 0, 0],
      }

    },
    data: [44, 55, 11, 22, 88, 44, 66, 77, 55]
  }
  ]
}

var gramOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      lineStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(126,199,255,0)' // 0% 处的颜色
          }, {
            offset: 0.5,
            color: 'rgba(126,199,255,1)' // 100% 处的颜色
          }, {
            offset: 1,
            color: 'rgba(126,199,255,0)' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }
      },
    }
  },
  grid: {
    left: '2%',
    right: '50',
    bottom: '10',
    top: '16%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
    axisLine: {
      lineStyle: {
        color: 'rgba(224,231,255,0.3)',
        width: '1'

      }
    },
    axisTick: { show: false },
    axisLabel: {
      textStyle: {
        color: "#ffffff"
      }
    },
  },

  yAxis: [
    {
      type: "value",
      name: "答对率(%)",
      nameTextStyle: {
        color: "#a2afcc",
        fontSize: 12
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(128,151,177,0.3)',
          type: 'dotted'
        }
      },
      splitNumber: 4,
      interval: 25,
      max: 100,
      position: "left",
      axisLine: {
        show: true,
        lineStyle: {
          color: '#e0e7ff',
          opacity: '0.3'
        }
      },
      axisLabel: {
        show: true,
        formatter: "{value}", //右侧Y轴文字显示
        textStyle: {
          color: "#a2afcc"
        }
      }
    }
  ],
  series: [
    {
      name: '答对率',
      cursor: 'default',
      type: 'line',
      barWidth: '16px',
      showAllSymbol: true,
      symbolSize: 0,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#009cff'
          }, {
            offset: 1,
            color: '#009cff'
          }]),
        },
      },
      areaStyle: { //区域填充样式
        normal: {
          //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "rgba(3,163,233,.8)"


          },
          {
            offset: 1,
            color: "rgba(25,163,223, 0)"
          }
          ], false),
          shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
          shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
        }
      },
      data: [40, 40, 30, 30, 30, 40, 40, 40, 30]
    }
  ]
}
// 历次作答统计
var responseOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      shadowStyle: {
        color: 'rgba(0,0,0,0.1)',
      },
    },
  },
  grid: {
    left: '2%',
    right: '50',
    bottom: '10',
    top: '50',
    containLabel: true,
  },
  xAxis: {
    name: '试卷\n得分',
    type: 'category',
    data: ['0~40分', '40~60分', '60~80分', '80~120分', '120~150分'],
    axisLine: {
      lineStyle: {
        color: 'rgba(224,231,255,0.3)',
        width: '1',
      },
    },
    axisTick: { show: false },
    axisLabel: {
      textStyle: {
        color: '#ffffff',
      },
    },
  },

  yAxis: [
    {
      type: 'value',
      name: '人数(人)',
      nameTextStyle: {
        color: '#a2afcc',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(128,151,177,0.3)',
          type: 'dotted',
        },
      },
      axisTick: {
        show: false,
      },
      splitNumber: 4,
      position: 'left',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#rgba(224,231,255,0.3)',
        },
      },
      axisLabel: {
        show: true,
        formatter: '{value}', //右侧Y轴文字显示
        textStyle: {
          color: '#a2afcc',
        },
      },
    },
  ],
  series: [
    {
      name: '人数',
      type: 'bar',
      barWidth: '16px',
      itemStyle: {
        normal: {
          color: function (params) {
            switch (params.dataIndex) {
              case 0:
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#ffa0a0',
                  },
                  {
                    offset: 1,
                    color: '#ff6767',
                  },
                ])
              case 1:
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#ffc334',
                  },
                  {
                    offset: 1,
                    color: '#ff9000',
                  },
                ])
              case 2:
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#22d7bb',
                  },
                  {
                    offset: 1,
                    color: '#00b99c',
                  },
                ])
              case 3:
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#4fe74b',
                  },
                  {
                    offset: 1,
                    color: '#06a103',
                  },
                ])
              case 4:
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#00f0ff',
                  },
                  {
                    offset: 1,
                    color: '#003aff',
                  },
                ])
              default:
                break;
            }
          },
          //  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //     {
          //         offset: 0,
          //         color: '#00ccff',
          //     },
          //     {
          //         offset: 1,
          //         color: '#003aff',
          //     },
          // ]),
          barBorderRadius: [8, 8, 0, 0],
        },
      },
      emphasis: {
        label: {
          show: true,
          formatter: "{c}人",
          distance: 10,
          position: 'top',
          color: function (params) {
            switch (params.dataIndex) {
              case 0:
                return '#ff8080'
              case 1:
                return '#ffc334'
              case 2:
                return '#22d7bb'
              case 3:
                return '#4fe74b'
              case 4:
                return '#00f0ff'
              default:
                break;
            }
          },
        },
      },
      data: [40, 70, 100, 80, 60, 90],
    },
  ],
}
// 第一个柱状
const CubeLeft1 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx, shape) {
    // 会canvas的应该都能看得懂，shape是从custom传入的
    const xAxisPoint = shape.xAxisPoint
    const c0 = [shape.x - 35, shape.y + 6]
    const c1 = [shape.x - 45, shape.y]
    const c2 = [xAxisPoint[0] - 45, xAxisPoint[1] + 1]
    const c3 = [xAxisPoint[0] - 35, xAxisPoint[1] + 6]
    ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
  }
});
// 绘制右侧面
const CubeRight1 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint
    const c1 = [shape.x - 35, shape.y + 6]
    const c2 = [xAxisPoint[0] - 35, xAxisPoint[1] + 6]
    const c3 = [xAxisPoint[0] - 25, xAxisPoint[1] + 1]
    const c4 = [shape.x - 25, shape.y]
    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
  }
});
// 绘制顶面
const CubeTop1 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx, shape) {
    const c1 = [shape.x - 35, shape.y + 6]
    const c2 = [shape.x - 25, shape.y]
    const c3 = [shape.x - 35, shape.y - 6]
    const c4 = [shape.x - 45, shape.y]
    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
  }
});
// 注册三个面图形
echarts.graphic.registerShape('CubeLeft1', CubeLeft1)
echarts.graphic.registerShape('CubeRight1', CubeRight1)
echarts.graphic.registerShape('CubeTop1', CubeTop1)
// 第二个柱状
const CubeLeft2 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx, shape) {
    // 会canvas的应该都能看得懂，shape是从custom传入的
    const xAxisPoint = shape.xAxisPoint
    const c0 = [shape.x - 12, shape.y + 6]
    const c1 = [shape.x - 22, shape.y]
    const c2 = [xAxisPoint[0] - 22, xAxisPoint[1] + 1]
    const c3 = [xAxisPoint[0] - 12, xAxisPoint[1] + 6]
    ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
  }
});
// 绘制右侧面
const CubeRight2 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint
    const c1 = [shape.x - 12, shape.y + 6]
    const c2 = [xAxisPoint[0] - 12, xAxisPoint[1] + 6]
    const c3 = [xAxisPoint[0] - 2, xAxisPoint[1] + 1]
    const c4 = [shape.x - 2, shape.y]
    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
  }
});
// 绘制顶面
const CubeTop2 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx, shape) {
    const c1 = [shape.x - 12, shape.y + 6]
    const c2 = [shape.x - 2, shape.y]
    const c3 = [shape.x - 12, shape.y - 6]
    const c4 = [shape.x - 22, shape.y]
    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
  }
});
// 注册三个面图形
echarts.graphic.registerShape('CubeLeft2', CubeLeft2)
echarts.graphic.registerShape('CubeRight2', CubeRight2)
echarts.graphic.registerShape('CubeTop2', CubeTop2)
// 第三个柱状
const CubeLeft3 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx, shape) {
    // 会canvas的应该都能看得懂，shape是从custom传入的
    const xAxisPoint = shape.xAxisPoint
    const c0 = [shape.x + 10, shape.y + 6]
    const c1 = [shape.x, shape.y]
    const c2 = [xAxisPoint[0], xAxisPoint[1] + 1]
    const c3 = [xAxisPoint[0] + 10, xAxisPoint[1] + 6]
    ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
  }
});
// 绘制右侧面
const CubeRight3 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint
    const c1 = [shape.x + 10, shape.y + 6]
    const c2 = [xAxisPoint[0] + 10, xAxisPoint[1] + 6]
    const c3 = [xAxisPoint[0] + 20, xAxisPoint[1] + 1]
    const c4 = [shape.x + 20, shape.y]
    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
  }
});
// 绘制顶面
const CubeTop3 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx, shape) {
    const c1 = [shape.x + 10, shape.y + 6]
    const c2 = [shape.x + 20, shape.y]
    const c3 = [shape.x + 10, shape.y - 6]
    const c4 = [shape.x, shape.y]
    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
  }
});
// 注册三个面图形
echarts.graphic.registerShape('CubeLeft3', CubeLeft3)
echarts.graphic.registerShape('CubeRight3', CubeRight3)
echarts.graphic.registerShape('CubeTop3', CubeTop3)


const CubeLeft4 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx, shape) {
    // 会canvas的应该都能看得懂，shape是从custom传入的
    const xAxisPoint = shape.xAxisPoint
    const c0 = [shape.x + 32, shape.y + 6]
    const c1 = [shape.x + 22, shape.y]
    const c2 = [xAxisPoint[0] + 22, xAxisPoint[1] + 1]
    const c3 = [xAxisPoint[0] + 32, xAxisPoint[1] + 6]
    ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
  }
});
// 绘制右侧面
const CubeRight4 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint
    const c1 = [shape.x + 32, shape.y + 6]
    const c2 = [xAxisPoint[0] + 32, xAxisPoint[1] + 6]
    const c3 = [xAxisPoint[0] + 42, xAxisPoint[1] + 1]
    const c4 = [shape.x + 42, shape.y]
    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
  }
});
// 绘制顶面
const CubeTop4 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx, shape) {
    const c1 = [shape.x + 32, shape.y + 6]
    const c2 = [shape.x + 42, shape.y]
    const c3 = [shape.x + 32, shape.y - 6]
    const c4 = [shape.x + 22, shape.y]
    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
  }
});
// 注册三个面图形
echarts.graphic.registerShape('CubeLeft4', CubeLeft4)
echarts.graphic.registerShape('CubeRight4', CubeRight4)
echarts.graphic.registerShape('CubeTop4', CubeTop4)
var compareOption = {
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    show: true,
    name: '班级',
    nameTextStyle: {
      color: '#a2afcc',
      padding: [0, 0, 0, 0]
    },
    data: [],
    type: 'category',
    axisTick: {
      show: false
    },
    axisLine: {
      show: true,
      lineStyle: {
        width: 1,
        color: 'rgba(255,255,255,0.3)',
      },
    },
    splitLine: {
      show: false,
    },
    axisLabel: {
      margin: 13,
      color: '#fff',
      fontSize: 15,
    },
  },
  yAxis: [
    {
      show: true,
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgba(255,255,255,0.2)'
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dotted',
          color: 'rgba(128,151,177,0.76)'

        },
      },
      axisLabel: {
        show: false,
        color: '#FFFFFF',
      }
    },
    {
      show: true,
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgba(255,255,255,0.2)'
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dotted',
          color: 'rgba(128,151,177,0.76)'

        },
      },
      axisLabel: {
        show: false,
        color: '#FFFFFF',
      }
    },
    {
      show: true,
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgba(255,255,255,0.2)'
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dotted',
          color: 'rgba(128,151,177,0.76)'

        },
      },
      axisLabel: {
        show: false,
        color: '#FFFFFF',
      }
    },
    {
      show: true,
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgba(255,255,255,0.2)'
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dotted',
          color: 'rgba(128,151,177,0.76)'

        },
      },
      axisLabel: {
        show: false,
        color: '#FFFFFF',
      }
    },
  ],

  series: [
    {
      type: 'custom',
      renderItem: (params, api) => {
        const location = api.coord([api.value(0), api.value(1)])
        // 柱状图左侧颜色
        var color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#00f0ff'
        },
        {
          offset: 1,
          color: '#0036ff'
        }
        ])
        // 柱状图顶部颜色
        var color1 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#37f0ff'
          // color: 'rgba(0,240,255)'
        },
        {
          offset: 1,
          color: '#37f0ff'
          // color: 'rgba(0,240,255)'
        }
        ])
        // 柱状图右侧颜色
        var color2 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#00c5d1'
          // color: 'rgba(0,240,255)'
        },
        {
          offset: 1,
          color: '#002ac6'
          // color: 'rgba(0,240,255,0.2)'
        }
        ])
        return {
          type: 'group',
          children: [{
            type: 'CubeLeft1',
            shape: {
              api,
              xValue: api.value(0),
              yValue: api.value(1),
              x: location[0],
              y: location[1],
              xAxisPoint: api.coord([api.value(0), 0])
            },
            style: {
              fill: color
            }
          }, {
            type: 'CubeRight1',
            shape: {
              api,
              xValue: api.value(1),
              yValue: api.value(0),
              x: location[0],
              y: location[1],
              xAxisPoint: api.coord([api.value(0), 0])
            },
            style: {
              fill: color2
            }
          }, {
            type: 'CubeTop1',
            shape: {
              api,
              xValue: api.value(0),
              yValue: api.value(1),
              x: location[0],
              y: location[1],
              xAxisPoint: api.coord([api.value(0), 0])
            },
            style: {
              fill: color1
            }
          }]
        }
      },
      data: []
    },
    {
      type: 'custom', yAxisIndex: 1,
      renderItem: (params, api) => {
        const location = api.coord([api.value(0), api.value(1)])
        // 柱状图左侧颜色
        var color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#009880'
        },
        {
          offset: 1,
          color: '#37eed6'
        }
        ])
        // 柱状图顶部颜色
        var color1 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#00ffdd'
          // color: 'rgba(0,240,255)'
        },
        {
          offset: 1,
          color: '#00ffdd'
          // color: 'rgba(0,240,255)'
        }
        ])
        // 柱状图右侧颜色
        var color2 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#007562'
          // color: 'rgba(0,240,255)'
        },
        {
          offset: 1,
          color: '#31d6c0'
          // color: 'rgba(0,240,255,0.2)'
        }
        ])
        return {
          type: 'group',
          children: [{
            type: 'CubeLeft2',
            shape: {
              api,
              xValue: api.value(0),
              yValue: api.value(1),
              x: location[0],
              y: location[1],
              xAxisPoint: api.coord([api.value(0), 0])
            },
            style: {
              fill: color
            }
          }, {
            type: 'CubeRight2',
            shape: {
              api,
              xValue: api.value(1),
              yValue: api.value(0),
              x: location[0],
              y: location[1],
              xAxisPoint: api.coord([api.value(0), 0])
            },
            style: {
              fill: color2
            }
          }, {
            type: 'CubeTop2',
            shape: {
              api,
              xValue: api.value(0),
              yValue: api.value(1),
              x: location[0],
              y: location[1],
              xAxisPoint: api.coord([api.value(0), 0])
            },
            style: {
              fill: color1
            }
          }]
        }
      },
      data: []
    },
    {
      type: 'custom', yAxisIndex: 2,
      renderItem: (params, api) => {
        const location = api.coord([api.value(0), api.value(1)])
        // 柱状图左侧颜色
        var color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#cf5c00'
        },
        {
          offset: 1,
          color: '#ffbb39'
        }
        ])
        // 柱状图顶部颜色
        var color1 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#ffa52c'
          // color: 'rgba(0,240,255)'
        },
        {
          offset: 1,
          color: '#ffa52c'
          // color: 'rgba(0,240,255)'
        }
        ])
        // 柱状图右侧颜色
        var color2 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#ca5600'
          // color: 'rgba(0,240,255)'
        },
        {
          offset: 1,
          color: '#ee9b27'
          // color: 'rgba(0,240,255,0.2)'
        }
        ])
        return {
          type: 'group',
          children: [{
            type: 'CubeLeft3',
            shape: {
              api,
              xValue: api.value(0),
              yValue: api.value(1),
              x: location[0],
              y: location[1],
              xAxisPoint: api.coord([api.value(0), 0])
            },
            style: {
              fill: color
            }
          }, {
            type: 'CubeRight3',
            shape: {
              api,
              xValue: api.value(1),
              yValue: api.value(0),
              x: location[0],
              y: location[1],
              xAxisPoint: api.coord([api.value(0), 0])
            },
            style: {
              fill: color2
            }
          }, {
            type: 'CubeTop3',
            shape: {
              api,
              xValue: api.value(0),
              yValue: api.value(1),
              x: location[0],
              y: location[1],
              xAxisPoint: api.coord([api.value(0), 0])
            },
            style: {
              fill: color1
            }
          }]
        }
      },
      data: []
    },
    {
      type: 'custom', yAxisIndex: 3,
      renderItem: (params, api) => {
        const location = api.coord([api.value(0), api.value(1)])
        // 柱状图左侧颜色
        var color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#61e400'
        },
        {
          offset: 1,
          color: '#389500'
        }
        ])
        // 柱状图顶部颜色
        var color1 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#95fb4c'
          // color: 'rgba(0,240,255)'
        },
        {
          offset: 1,
          color: '#95fb4c'
          // color: 'rgba(0,240,255)'
        }
        ])
        // 柱状图右侧颜色
        var color2 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#53c400'
          // color: 'rgba(0,240,255)'
        },
        {
          offset: 1,
          color: '#2e7a00'
          // color: 'rgba(0,240,255,0.2)'
        }
        ])
        return {
          type: 'group',
          children: [{
            type: 'CubeLeft4',
            shape: {
              api,
              xValue: api.value(0),
              yValue: api.value(1),
              x: location[0],
              y: location[1],
              xAxisPoint: api.coord([api.value(0), 0])
            },
            style: {
              fill: color
            }
          }, {
            type: 'CubeRight4',
            shape: {
              api,
              xValue: api.value(1),
              yValue: api.value(0),
              x: location[0],
              y: location[1],
              xAxisPoint: api.coord([api.value(0), 0])
            },
            style: {
              fill: color2
            }
          }, {
            type: 'CubeTop4',
            shape: {
              api,
              xValue: api.value(0),
              yValue: api.value(1),
              x: location[0],
              y: location[1],
              xAxisPoint: api.coord([api.value(0), 0])
            },
            style: {
              fill: color1
            }
          }]
        }
      },
      data: []
    },
  ]
}

const CubeLeft5 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx, shape) {
    // 会canvas的应该都能看得懂，shape是从custom传入的
    const xAxisPoint = shape.xAxisPoint
    const c0 = [shape.x, shape.y + 6]
    const c1 = [shape.x - 10, shape.y]
    const c2 = [xAxisPoint[0] - 10, xAxisPoint[1] + 1]
    const c3 = [xAxisPoint[0], xAxisPoint[1] + 6]
    ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
  }
});
// 绘制右侧面
const CubeRight5 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint
    const c1 = [shape.x, shape.y + 6]
    const c2 = [xAxisPoint[0], xAxisPoint[1] + 6]
    const c3 = [xAxisPoint[0] + 10, xAxisPoint[1] + 1]
    const c4 = [shape.x + 10, shape.y]
    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
  }
});
// 绘制顶面
const CubeTop5 = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx, shape) {
    const c1 = [shape.x, shape.y + 6]
    const c2 = [shape.x + 10, shape.y]
    const c3 = [shape.x, shape.y - 6]
    const c4 = [shape.x - 10, shape.y]
    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
  }
});
// 注册三个面图形
echarts.graphic.registerShape('CubeLeft5', CubeLeft5)
echarts.graphic.registerShape('CubeRight5', CubeRight5)
echarts.graphic.registerShape('CubeTop5', CubeTop5)
var questionDiologOption = {
  tooltip: {
    trigger: 'item',
  },
  xAxis: {
    show: true,
    name: '班级',
    nameTextStyle: {
      color: '#a2afcc',
      padding: [0, 0, 0, 0]
    },
    data: [],
    type: 'category',
    axisTick: {
      show: false
    },
    axisLine: {
      show: true,
      lineStyle: {
        width: 1,
        color: 'rgba(255,255,255,0.3)',
      },
    },
    splitLine: {
      show: false,
    },
    axisLabel: {
      margin: 13,
      color: '#fff',
      fontSize: 15,
    },
  },
  yAxis: {
    name:'题型得分率(%)',
    show: true,
    max:100,
    splitNumber: 4,
    interval: 25,
    axisLine: {
      show: true,
      lineStyle: {
        color: 'rgba(224,231,255,0.3)'
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dotted',
        color: 'rgba(128,151,177,0.76)'

      },
    },
    axisLabel: {
      show: true,
      color: '#a2afcc',
    }
  },

  series:
  {
    type: 'custom',
    renderItem: (params, api) => {
      const location = api.coord([api.value(0), api.value(1)])
      // 柱状图左侧颜色
      var color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: '#37eed6'
      },
      {
        offset: 1,
        color: '#009880'
      }
      ])
      // 柱状图顶部颜色
      var color1 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: '#00ffdd'
        // color: 'rgba(0,240,255)'
      },
      {
        offset: 1,
        color: '#00ffdd'
        // color: 'rgba(0,240,255)'
      }
      ])
      // 柱状图右侧颜色
      var color2 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: '#31d6c0'
        // color: 'rgba(0,240,255)'
      },
      {
        offset: 1,
        color: '#007562'
        // color: 'rgba(0,240,255,0.2)'
      }
      ])
      return {
        type: 'group',
        children: [{
          type: 'CubeLeft5',
          shape: {
            api,
            xValue: api.value(0),
            yValue: api.value(1),
            x: location[0],
            y: location[1],
            xAxisPoint: api.coord([api.value(0), 0])
          },
          style: {
            fill: color
          }
        }, {
          type: 'CubeRight5',
          shape: {
            api,
            xValue: api.value(1),
            yValue: api.value(0),
            x: location[0],
            y: location[1],
            xAxisPoint: api.coord([api.value(0), 0])
          },
          style: {
            fill: color2
          }
        }, {
          type: 'CubeTop5',
          shape: {
            api,
            xValue: api.value(0),
            yValue: api.value(1),
            x: location[0],
            y: location[1],
            xAxisPoint: api.coord([api.value(0), 0])
          },
          style: {
            fill: color1
          }
        }]
      }
    },
    data: []
  }

}
var optionObj = {
  questionOptionTwo: questionOptionTwo,
  learnOption: learnOption,
  vocabOption: vocabOption,
  gramOption: gramOption,
  responseOption: responseOption,
  compareOption: compareOption,
  questionDiologOption: questionDiologOption,
}
export default optionObj