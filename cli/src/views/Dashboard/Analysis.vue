<template>
  <div>
    <Chart :option="chartOption" style="height:400px" />
  </div>
</template>

<script>
import Chart from "../../components/Charts";
import axios from "axios";
// import random from "lodash/random";
export default {
  data() {
    return {
      chartOption: {}
    };
  },
  components: {
    Chart
  },
  methods: {
    getCharData() {
      axios
        .get("/api/dashboard/chart", { params: { ID: 123 } })
        .then(response => {
          this.chartOption = {
            title: {
              text: "ECharts 入门示例"
            },
            tooltip: {},
            xAxis: {
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [
              {
                name: "销量",
                type: "bar",
                data: response.data
              }
            ]
          };
        });
    }
  },
  mounted() {
    this.getCharData();
    this.Interval = setInterval(() => {
      this.getCharData();
      //轮询
      // this.chartOption.series[0].data = this.chartOption.series[0].data.map(
      //   () => random(100)
      // );
      // this.chartOption = { ...this.chartOption }; //将option变成一个新值，避免深度监听
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.Interval);
  }
};
</script>

<style></style>
