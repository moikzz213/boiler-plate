<template>
  <div style="width: 100%; height: 600px">
    <canvas ref="chart_container" width="100%"></canvas>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import Chart from "chart.js/auto";

const chart_container = ref(null);
const props = defineProps(["data"]);
const fetchedData = ref(props.data);
const filterData = (property) => {
  return fetchedData.value.map((d) => d[property]);
};
const theDataTitle = computed(() => {
  return fetchedData.value.map((d) => d.title);
});
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
const data = ref({
  labels: theDataTitle.value,
  datasets: theDataSet.value,
});
const loadChart = (container) => {
  new Chart(container, {
    type: "bar",
    data: data.value,
    options: {
      //   plugins: {
      //     title: {
      //       display: true,
      //       text: "Chart.js Bar Chart - Stacked",
      //     },
      //   },
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
onMounted(() => {
  loadChart(chart_container.value);
});
watch(props.data, (newData, oldData) => {
  loadChart(chart_container.value);
});
</script>
