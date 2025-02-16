<script>
export default {
  name: 'noTrade',
  data() {
    return {
      showCancelButton: false,
    };
  },
  methods: {
    toggleCancelButton() {
      this.showCancelButton = !this.showCancelButton;
    },
    cancelAction() {
      console.log('Action cancelled');
      this.showCancelButton = false;
    },
  },
};
</script>

<template>
  <div class="relative top-[-240px] left-[-15px]">
    <!-- Trade Entries -->
    <div 
      class="flex justify-between items-center w-[350px] h-[40px] bg-transparent border-[#626060] cursor-pointer"
      @click="toggleCancelButton"
    >
      <div class="flex flex-col">
        <p class="text-white">
          MSFT <span class="text-green-500">buy</span>
        </p>
        <p class="flex gap-2 text-[#626060]">
          <span>$456</span>
          <span>22/03/2023</span>
        </p>
      </div>
      <div class="flex flex-col">
        <p class="text-green-500 text-right">+0.1%</p>
      </div>
    </div>

    <div 
      class="flex justify-between items-center mt-6 w-[350px] py-2 h-[40px] bg-transparent border-[#626060] cursor-pointer"
      @click="toggleCancelButton"
    >
      <div class="flex flex-col">
        <p class="text-white">
          MSFT <span class="text-red-500">Sell</span>
        </p>
        <p class="flex gap-2 text-[#626060]">
          <span>$456</span>
          <span>22/03/2023</span>
        </p>
      </div>
      <div class="flex flex-col">
        <p class="text-red-500 text-right">-0.01%</p>
      </div>
    </div>

    <!-- Cancel Action Modal -->
    <transition name="slide-up">
      <div v-if="showCancelButton" class="fixed inset-0 flex items-center justify-center z-50">
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black bg-opacity-50" @click.stop="toggleCancelButton"></div>
        
        <!-- Modal Content -->
        <div class="relative bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-lg w-[90%] max-w-[400px] p-6 mx-auto">
          <!-- Close Button -->
          <div class="w-full flex justify-end mb-4">
            <button 
              class="text-white text-3xl hover:text-gray-300 transition-colors"
              @click.stop="cancelAction"
            >
              &times;
            </button>
          </div>
          
          <!-- Action Button -->
          <button
            class="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
            @click.stop="cancelAction"
          >
            Close Trade
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.backdrop-blur-md {
  backdrop-filter: blur(15px);
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .relative {
    top: -120px;
    left: -8px;
  }
  
  .w-[350px] {
    width: 95%;
    max-width: 350px;
  }
}
</style>
