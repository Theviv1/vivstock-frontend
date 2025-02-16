<template>
  <div class="p-4">
    <!-- Main Trade Cards Container -->
    <div class="max-w-sm mx-auto space-y-4">
      <!-- Trade Card (Buy) -->
      <div 
        class="flex justify-between items-center bg-transparent border border-[#626060] rounded-lg p-3"
        @click="toggleCancelButton"
      >
        <div class="flex flex-col">
          <p class="text-white">
            MSFT <span class="text-green-500">buy</span>
          </p>
          <p class="flex gap-2 text-sm">
            <span>$456</span>
            <span>22/03/2023</span>
          </p>
        </div>
        <div class="flex flex-col">
          <p class="text-green-500 text-right">+0.1%</p>
        </div>
      </div>
      <!-- Trade Card (Sell) -->
      <div 
        class="flex justify-between items-center bg-transparent border border-[#626060] rounded-lg p-3"
        @click="toggleCancelButton"
      >
        <div class="flex flex-col">
          <p class="text-white">
            MSFT <span class="text-red-500">Sell</span>
          </p>
          <p class="flex gap-2 text-sm">
            <span>$456</span>
            <span>22/03/2023</span>
          </p>
        </div>
        <div class="flex flex-col">
          <p class="text-red-500 text-right">-0.01%</p>
        </div>
      </div>
    </div>

    <!-- Modal for Cancel Action -->
    <transition name="slide-up">
      <div v-if="showCancelButton" class="fixed inset-0 flex items-center justify-center z-50">
        <div class="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-lg w-11/12 max-w-sm p-4 relative">
          <!-- Cancel Icon at Top Right -->
          <button @click.stop="cancelAction" class="absolute top-2 right-2 text-white text-3xl">
            &times;
          </button>
          <transition name="slide-up">
            <div
              class="bg-red-600 text-white py-2 px-4 rounded-lg cursor-pointer text-center"
              @click.stop="cancelAction"
            >
              Close Trade
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'noTrade',
  data() {
    return {
      showCancelButton: false, // Initially, the cancel button is hidden
    };
  },
  methods: {
    toggleCancelButton() {
      // Toggle the visibility of the cancel button
      this.showCancelButton = !this.showCancelButton;
    },
    cancelAction() {
      // Add logic for cancel action here
      console.log('Action cancelled');
      // Reset the cancel button state if necessary
      this.showCancelButton = false;
    },
  },
};
</script>

<style>
/* Custom backdrop and blur */
.bg-gray-800 {
  background-color: rgba(0, 0, 0, 0.5);
}
.backdrop-blur-md {
  backdrop-filter: blur(15px);
}

/* Slide-up transition */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.2s ease-out;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
}
.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
}
</style>
