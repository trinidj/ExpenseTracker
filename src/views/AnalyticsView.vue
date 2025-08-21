<script setup>
  import { ref, onMounted } from 'vue';

  import { Calendar, Tags, Wallet, TrendingDown } from 'lucide-vue-next';
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
  <div class="bg-[#FFE3C6] h-62 rounded-bl-3xl rounded-br-3xl">
    <header class="flex flex-row justify-start items-center px-6 py-8">
      <h1 class="text-zinc-800 text-2xl font-semibold">Analytics</h1>
    </header>
  
    <!-- Analytics Content -->
    <ScrollPanel style="height: 900px">
      <div class="flex flex-col gap-5">
        <!-- Current Week's Spending -->
        <div class="bg-white rounded-xl mx-6 gap-5 border border-emerald-300/50">
          <div class="flex flex-col">
            <!-- Header -->
            <header class="flex flex-row items-center p-5 gap-2 text-zinc-800">
              <Calendar 
                :size="16"
              />
              <h2 class="font-medium text-sm">This Weeks Expenses</h2>
            </header>

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

        <div class="flex mx-6 gap-5">
          <div class="bg-white rounded-xl gap-5 border border-emerald-300/50 flex-1">
            <header class="flex flex-row items-center p-5 gap-2 text-zinc-800">
              <Wallet 
                :size="16"
              />
              <h2 class="font-medium text-sm">Spent</h2>
            </header>

            <div class="p-6 pt-0 text-zinc-800">
              <p class="font-medium text-xl">$1,200</p>
            </div>
          </div>

          <div class="bg-white rounded-xl gap-5 border border-emerald-300/50 flex-1">
            <header class="flex flex-row items-center p-5 gap-2 text-zinc-800">
              <TrendingDown 
                :size="16"
              />
              <h2 class="font-medium text-sm">Trend</h2>
            </header>

            <div class="p-6 pt-0 text-zinc-800">
              <p class="font-medium text-xl">-8%</p>
            </div>
          </div>
        </div>

        <!-- Top Categories -->
        <div class="bg-white rounded-xl mx-6 gap-5 border border-emerald-300/50 ">
          <div class="flex flex-col">
            <!-- Header -->
            <header class="flex flex-row items-center p-5 gap-2 text-zinc-800">
              <Tags 
                :size="16"
              />
              <h2 class="font-medium text-sm">Top Categories</h2>
            </header>

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