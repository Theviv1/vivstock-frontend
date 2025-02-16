<script>
export default {
  name: 'noTrade',
  data() {
    return {
      showCancelButton: false,  // Initially, the cancel button is hidden
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

<template>
  <div class="relative top-[-240px] left-[-15px]" @click="toggleCancelButton">
    <div class="flex justify-between items-center w-[350px] h-[40px] bg-transparent border-[#626060]">
      <div class="flex flex-col">
        <p class="text-white">
          MSFT <span class="text-green-500">buy</span>
        </p>
        <p class="flex gap-2">
          <span>$456</span>
          <span>22/03/2023</span>
        </p>
      </div>
      <div class="flex flex-col text-[#626060]">
        <p class="text-green-500 text-right">+0.1%</p>
      </div>
    </div>
    <div class="flex justify-between items-center mt-6 w-[350px] py-2 h-[40px] bg-transparent border-[#626060]">
      <div class="flex flex-col">
        <p class="text-white">
          MSFT <span class="text-red-500">Sell</span>
        </p>
        <p class="flex gap-2">
          <span>$456</span>
          <span>22/03/2023</span>
        </p>
      </div>
      <div class="flex flex-col text-[#626060]">
        <p class="text-red-500 text-right">-0.01%</p>
      </div>
    </div>

    <!-- Cancel Button Wrapper with slide-up transition -->
    <transition name="slide-up">
      <div v-if="showCancelButton" class="absolute top-[300px] right-[35%]">
        <!-- Background Overlay -->
        <div class="relative bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-lg w-[360px] h-[300px] left-[125px] z-50 p-4 flex flex-col justify-center items-center">
          <!-- Cancel X Icon at the top right -->
          <div
            class="absolute top-[-5px] right-2 cursor-pointer text-white text-4xl"
            @click.stop="cancelAction"
          >
            &times;
          </div>
          <transition name="slide-up">
            <div
              class="bg-red-600 text-white py-2 px-4 rounded-lg cursor-pointer flex justify-start items-start"
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

<style>
/* Optional: Customize the backdrop and blur styles if needed */
.bg-gray-800 {
  background-color: rgba(0, 0, 0, 0.5); /* Dark gray overlay */
}
.backdrop-blur-md {
  backdrop-filter: blur(15px); /* Blur effect for the background */
}

/* Slide-up transition (vertical slide from bottom to top) */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.1s ease-out;
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
