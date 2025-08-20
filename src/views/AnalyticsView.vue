<script setup>
  import { ref, onMounted } from 'vue';

  import { Calendar } from 'lucide-vue-next';
  import Chart from 'primevue/chart';

  onMounted(() => {
    lineData.value = setLineData();
    lineOptions.value = setLineOptions();
  });

  const lineData = ref();
  const lineOptions = ref();

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
          tension: 0.4
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
</script>

<template>
  <div class="bg-[#FFE3C6] h-62 rounded-bl-3xl rounded-br-3xl">
    <section class="overflow-y-auto">
      <header class="flex flex-row justify-between items-center p-6">
      <h1 class="text-2xl font-semibold static">Analytics</h1>
      </header>
    
    <!-- Current Week's Spending -->
      <section class="static flex flex-col bg-white rounded-xl mx-6 shadow-black/15 shadow-2xl gap-5">
        <div class="flex flex-col">
          <!-- Header -->
          <div class="flex flex-row items-center p-5 gap-2">
            <Calendar 
              :size="20"
            />
            <h2 class="font-bold">This Weeks Expenses</h2>
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
      </section>

      <!-- Top Categories -->
      <section class="static h-95 flex flex-col bg-white rounded-xl mx-6 shadow-black/15 shadow-2xl gap-5 mt-5">
        <div class="flex flex-col">
          <!-- Header -->
          <div class="flex flex-row items-center p-5 gap-2">
            <Calendar 
              :size="20"
            />
            <h2 class="font-bold">Top Categories</h2>
          </div>

          <!-- Chart -->
          <div>

          </div>
        </div>
      </section>
    </section>
    <!-- Header -->
  </div>
</template>