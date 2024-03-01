<template>
  <div class="max-w-[100%] rounded-xl bg-darkess p-4 shadow-md md:max-w-[1100px]">
    <h3 class="font-italic text-2xl text-primary">
      {{ title }}
    </h3>
    <VueApexCharts
      type="line"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts';
import { computed } from 'vue';


const props = defineProps<{
  title: string,
  seriesData: number[],
  dates: string[]
}>();

const chartOptions = computed(() => {
  return {
    chart: {
      id: 'stackedBarChart',
      stacked: true,
      foreColor: '#ffb4a7',
      height: '90%',
      fontFamily: 'Roboto',
      toolbar: {
        show: false,
      }
    },
    tooltip: {
      enabled: true,
      theme: 'dark'
    },
    xaxis: {
      categories: props.dates
    },
    stroke: {
      width: 3,
      colors: ['#fff'],
      curve: 'smooth'
    },
  }
});

const series = computed(() => {
  return [
    {
      name: 'Bier',
      data: props.seriesData
    }
  ]
})

</script>
