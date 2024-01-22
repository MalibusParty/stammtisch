<template>
	<div
		class="p-4 rounded-lg shadow-md"
	>
		<h3>
			{{ title }}
		</h3>
		<VueApexCharts
			width="500"
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

const chartOptions = computed(() => {
	return {
		chart: {
			id: 'stackedBarChart',
			stacked: true
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
				columnWidth: '30%'
			}
		},
		theme: {
			palette: 'palette1'
		}
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