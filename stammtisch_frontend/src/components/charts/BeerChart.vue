<template>
  <div
    class="max-w-[100%] rounded-xl bg-darkess p-4 shadow-md md:max-w-[1100px]"
  >
    <h3 class="font-italic text-2xl text-primary">
      {{ title }}
    </h3>
    <VueApexCharts
      type="bar"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';


const props = defineProps<{
  title: string,
  seriesData: number[],
  users: string[] 
}>();

const chartHeight = computed(() => {
  return `${props.users.length * 50}px`
});

const chartOptions = computed(() => {
  return {
    chart: {
      id: 'barChart',
      stacked: false,
      foreColor: '#ffb4a7',
      height: '90%',
      fontFamily: 'Roboto',
      toolbar: {
        show: false,
      }
    },
    tooltip: {
      enabled: false
    },
    xaxis: {
      categories: props.users
    },
    stroke: {
      width: 3,
      colors: ['#fff'],
      curve: 'smooth'
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 5
      }
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: {
              horizontal: true,
              borderRadius: 5
            }
          },
          chart: {
            height: chartHeight.value
          },
          stroke: {
            width: 1
          }
        }
      }
    ]
  };
});

const series = computed(() => {
  return [{
    name: 'User',
    data: props.seriesData
  }]
});
</script>