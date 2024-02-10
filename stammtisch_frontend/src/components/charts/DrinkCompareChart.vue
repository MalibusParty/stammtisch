<template>
	<div class="max-w-[100%] rounded-xl bg-darkess p-4 shadow-md md:max-w-[1100px]">
		<h3
			class="font-italic text-2xl text-primary"
		>
			{{ title }}
		</h3>
		<VueApexCharts
			type="bar"
			:options="chartOptions"
			:series="seriesData"
		/>
	</div>
</template>

<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts';
import { type StackedBar } from '@/interfaces/BarCharts';
import { computed, ref, watch } from 'vue';

const props = defineProps<{
	users: string[],
	seriesData: StackedBar[],
	title: string
}>();

const maxYAxis = ref(maxHeight());

const chartHeight = computed(() => props.users.length * 75);

const chartOptions = computed(() => {
	return {
		chart: {
			id: 'stackedBarChart',
			stacked: true,
			foreColor: '#ffb4a7',
			height: '90%',
			fontFamily: 'Roboto',
			toolbar: {
				show: false
			}
		},
    tooltip: {
      enabled: false
    },
		xaxis: {
			categories: props.users
		},
		yaxis: {
			min: 0,
			max: maxYAxis.value
		},
		stroke: {
			width: 1,
			colors: ['#fff']
		},
		plotOptions: {
			bar: {
				columnWidth: '30%',
				horizontal: false
			}
		},
		theme: {
			palette: 'palette1'
		},
		responsive: [
			{
				breakpoint: 768,
				options: {
					plotOptions: {
						bar: {
							columnWidth: '30%',
							horizontal: true
						}
					},
					chart: {
						height: chartHeight.value
					}
				}
			}
		]
	}
});

watch(
	() => props.seriesData,
	() => maxYAxis.value = maxHeight(),
	{ deep: true }
);

function maxHeight() {
	let max = 0;
	for (let i = 0; i < props.seriesData[0].data.length; i++) {
		let acc = 0;
		for (let j = 0; j < props.seriesData.length; j++) {
			acc += props.seriesData[j].data[i];
		}
		if (acc > max) max = acc;
	}
	return max;
}
</script>