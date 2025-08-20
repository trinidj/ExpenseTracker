<script setup>
  import { ref, onMounted } from 'vue';

  import { Calendar, Scroll, Tags, Wallet } from 'lucide-vue-next';
  import Chart from 'primevue/chart';
  import { ProgressBar, ScrollPanel } from 'primevue';

  onMounted(() => {
    lineData.value = setLineData();
    lineOptions.value = setLineOptions();

    doughnutData.value = setDoughnutData();
    doughnutOptions.value = setDoughnutOptions();
  });

  const lineData = ref();
  const lineOptions = ref();

  const doughnutData = ref();
  const doughnutOptions = ref(null);

  const setLineData = () => {
    return {
      labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'],
      datasets: [
        {
          label: 'This Week',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          borderColor: '#6EE7B7',
          backgroundColor: 'rgba(110, 231, 183, 0.2)',
        },
      ],
    }
  };

  const setLineOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
  }

  const setDoughnutData = () => {
    return {
      labels: ['Food', 'Entertainment', 'Travel', 'Housing'],
      datasets: [
        {
          data: [540, 325, 702, 309],
          backgroundColor: ['#ffb86a', '#6ee7b7', '#93c5fd', '#d8b4fe'],
        }
      ]
    };
  };

  const setDoughnutOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');

    return {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor,
            usePointStyle: true,
            padding: 20,
          },
          position: 'bottom',
        }
      },
    };
  };
</script>

<template>
  <header class="flex flex-row justify-between items-center p-6">
    <h1 class="text-2xl font-semibold static">Analytics</h1>
  </header>
  
  <!-- Analytics Content -->
  <div class="flex-grow overflow-hidden">
    <ScrollPanel class="h-full!">
    <div class="flex flex-col gap-8">
      <!-- Budget Progress -->
      <div class="flex flex-col bg-white rounded-xl mx-6 border border-emerald-300/50">
        <div class="flex flex-col">
          <!-- Header -->
          <div class="flex flex-row items-center p-5 gap-2">
            <Wallet 
              :size="20"
            />
            <h2 class="font-medium">Budget Progress</h2>
          </div>
          
          <ProgressBar :value="50" class="h-4 rounded-full bg-slate-200">
          </ProgressBar>
        </div>
      </div>

      <!-- Current Week's Spending -->
      <div class="bg-white rounded-xl mx-6 gap-5 border border-emerald-300/50">
        <div class="flex flex-col">
          <!-- Header -->
          <div class="flex flex-row items-center p-5 gap-2">
            <Calendar 
              :size="20"
            />
            <h2 class=" font-medium">This Weeks Expenses</h2>
          </div>

          <!-- Chart -->
          <div class="p-5 pt-0">
            <Chart 
              type="line"
              :data="lineData"
              :options="lineOptions"
            />
          </div>
        </div>
      </div>

      <!-- Top Categories -->
      <div class="bg-white rounded-xl mx-6 gap-5 border border-emerald-300/50 ">
        <div class="flex flex-col">
          <!-- Header -->
          <div class="flex flex-row items-center p-5 gap-2">
            <Tags 
              :size="20"
            />
            <h2 class="font-medium">Top Categories</h2>
          </div>

          <!-- Chart -->
          <div class="flex flex-col items-center justify-center p-10">
            <Chart 
              type="doughnut"
              :data="doughnutData"
              :options="doughnutOptions"
            />
          </div>
        </div>
      </div>
    </div>
    </ScrollPanel>
  </div>
</template>