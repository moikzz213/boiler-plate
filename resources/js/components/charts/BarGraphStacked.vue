<template>
  <div style="width: 100%; height: 480px">
    <canvas ref="chart_container" width="100%"></canvas>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import Chart from "chart.js/auto";

const props = defineProps(["data"]);
const chart_container = ref(null);
const fetchedData = ref(props.data);
const filterData = (property) => fetchedData.value.map((d) => d[property]);
const theDataTitle = computed(() => fetchedData.value.map((d) => d.title));
const theDataSet = computed(() => {
  let set = [
    {
      label: "Open",
      data: filterData("open"),
      backgroundColor: "#03A9F4",
    },
    {
      label: "In Progress",
      data: filterData("in_progress"),
      backgroundColor: "#C6A92D",
    },
    {
      label: "In Review",
      data: filterData("in_review"),
      backgroundColor: "#FF5252",
    },
    {
      label: "Submitted",
      data: filterData("submitted"),
      backgroundColor: "#21C176",
    },
  ];

  return set;
});
const chartData = computed(() => {
  return { labels: theDataTitle.value, datasets: theDataSet.value };
});
let chart = null;
const loadChart = (container) => {
  chart = new Chart(container, {
    type: "bar",
    data: chartData.value,
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  });
};
const updateChart = async () => {
  chart.data = Object.assign({}, chartData.value);
};
onMounted(() => {
  loadChart(chart_container.value);
});
watch(
  () => props.data,
  () => {
    fetchedData.value = props.data;
    updateChart().then(() => {
      chart.update();
    });
  },
  {
    deep: true,
  }
);
</script>
