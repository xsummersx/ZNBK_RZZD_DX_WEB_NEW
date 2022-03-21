import { use } from 'echarts/core';

// 手动引入 ECharts 各模块来减小打包体积
// 参考所有支持的渲染器/图表/组件https://github.com/apache/echarts/blob/master/src/echarts.all.ts
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';
import { BarChart, PieChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from 'echarts/components';

use([
  CanvasRenderer,
  SVGRenderer,
  BarChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
]);
