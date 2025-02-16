<template>
    <div>
      <!-- Chart Section -->
      <div class="mb-8">
        <div class="w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <!-- 1D Chart -->
            <AreaChart v-if="stockChart === '1D'" :data="firstDay" :dot="false">
              <Area
                dataKey="uv"
                fill="rgba(128, 0, 128, 0.3)"
                type="linear"
                stroke="purple"
              />
              <Tooltip
                :contentStyle="{ display: 'none' }"
                :cursor="{ stroke: 'white', strokeWidth: 1 }"
              />
            </AreaChart>
  
            <!-- 7D Chart -->
            <AreaChart v-if="stockChart === '7d'" :data="firstWeek">
              <Area
                type="linear"
                dataKey="uv"
                fill="rgba(128, 0, 128, 0.3)"
                stroke="purple"
                :strokeWidth="1"
                :dot="false"
                :shape="({ points }) => {
                  const pathData = points.reduce((acc, point, index) => {
                    const { x, y } = point;
                    return index === 0 ? `M${x},${y}` : `${acc} L${x},${y}`;
                  }, '');
                  return <path d={pathData} stroke='purple' strokeWidth={2} fill='none' strokeDasharray='4 4' />;
                }"
              />
              <Tooltip
                :contentStyle="{ display: 'none' }"
                :cursor="{ stroke: 'white', strokeWidth: 1 }"
              />
            </AreaChart>
  
            <!-- 1M Chart -->
            <AreaChart v-if="stockChart === '1m'" :data="firstMonth">
              <Area
                type="linear"
                dataKey="uv"
                fill="rgba(128, 0, 128, 0.3)"
                stroke="purple"
                :strokeWidth="1"
                :dot="false"
              />
              <Tooltip
                :contentStyle="{ display: 'none' }"
                :cursor="{ stroke: 'white', strokeWidth: 1 }"
              />
            </AreaChart>
  
            <!-- 3M Chart -->
            <AreaChart v-if="stockChart === '3m'" :data="threeMonth">
              <Area
                type="linear"
                dataKey="uv"
                fill="rgba(128, 0, 128, 0.3)"
                stroke="purple"
                :strokeWidth="1"
                :dot="false"
              />
              <Tooltip
                :contentStyle="{ display: 'none' }"
                :cursor="{ stroke: 'white', strokeWidth: 1 }"
              />
            </AreaChart>
  
            <!-- 1Y Chart -->
            <AreaChart v-if="stockChart === '1y'" :data="firstYear">
              <Area
                type="linear"
                dataKey="uv"
                fill="rgba(128, 0, 128, 0.3)"
                stroke="purple"
                :strokeWidth="1"
                :dot="false"
              />
              <Tooltip
                :contentStyle="{ display: 'none' }"
                :cursor="{ stroke: 'white', strokeWidth: 1 }"
              />
            </AreaChart>
  
            <!-- 3Y Chart -->
            <AreaChart v-if="stockChart === '3y'" :data="threeYear">
              <Area
                type="linear"
                dataKey="uv"
                fill="rgba(128, 0, 128, 0.3)"
                stroke="purple"
                :strokeWidth="1"
                :dot="false"
              />
              <Tooltip
                :contentStyle="{ display: 'none' }"
                :cursor="{ stroke: 'white', strokeWidth: 1 }"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
  
      <!-- Timeframe Buttons -->
      <div class="flex md:justify-center justify-between space-x-4 mb-4">
        <button
          @click="toggleChart('1D')"
          :class="{ 'text-purple-600': stockChart === '1D', 'text-gray-300': stockChart !== '1D' }"
          class="py-2 rounded"
        >
          1D
        </button>
        <button
          @click="toggleChart('7d')"
          :class="{ 'text-purple-600': stockChart === '7d', 'text-gray-300': stockChart !== '7d' }"
          class="py-2 rounded"
        >
          1W
        </button>
        <button
          @click="toggleChart('1m')"
          :class="{ 'text-purple-600': stockChart === '1m', 'text-gray-300': stockChart !== '1m' }"
          class="py-2 rounded"
        >
          1M
        </button>
        <button
          @click="toggleChart('3m')"
          :class="{ 'text-purple-600': stockChart === '3m', 'text-gray-300': stockChart !== '3m' }"
          class="py-2 rounded"
        >
          3M
        </button>
        <button
          @click="toggleChart('1y')"
          :class="{ 'text-purple-600': stockChart === '1y', 'text-gray-300': stockChart !== '1y' }"
          class="py-2 rounded"
        >
          1Y
        </button>
        <button
          @click="toggleChart('3y')"
          :class="{ 'text-purple-600': stockChart === '3y', 'text-gray-300': stockChart !== '3y' }"
          class="py-2 rounded"
        >
          3Y
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { stockData } from "../data/stockData";
  import {
    firstDay,
    firstMonth,
    firstYear,
    firstWeek,
    threeMonth,
    threeYear,
  } from "./chartArray";
  
  export default {
    data() {
      return {
        stockChart: "1D",
        stockData,
        firstDay,
        firstMonth,
        firstYear,
        firstWeek,
        threeMonth,
        threeYear
      };
    },
    methods: {
      toggleChart(chart) {
        this.stockChart = chart;
      }
    },
    computed: {
      stock() {
        return this.stockData.find(s => s.symbol === this.$route.params.symbol);
      }
    }
  };
  </script>