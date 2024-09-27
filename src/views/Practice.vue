<template>
  <div class="image-container">
    <img
      :src="visibleImage.url"
      :class="{ visible: isImg1Visible, hidden: !isImg1Visible }"
      alt="Visible Image"
    />
    <img
      :src="hiddenImage.url"
      :class="{ visible: !isImg1Visible, hidden: isImg1Visible }"
      alt="Hidden Image"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
   objects: [
        { url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGZsb3dlcnxlbnwwfHx8fDE2Mjc1MDE2MzQ&ixlib=rb-1.2.1&q=80&w=800', alt: 'Image 0' },
        { url: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1vdW50YWlufGVufDB8fHx8MTYyNzUwMTY0Nw&ixlib=rb-1.2.1&q=80&w=800', alt: 'Image 1' },
        { url: 'https://images.unsplash.com/photo-1513938709626-033611b8cc03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZvcmVzdHxlbnwwfHx8fDE2Mjc1MDE2NDc&ixlib=rb-1.2.1&q=80&w=800', alt: 'Image 2' },
        { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fHdhdGVyfGVufDB8fHx8MTYyNzUwMTY1OQ&ixlib=rb-1.2.1&q=80&w=800', alt: 'Image 3' },
        { url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGJlYWNoJTIwd2F0ZXJ8ZW58MHx8fHwxNjI3NTAxNjg0&ixlib=rb-1.2.1&q=80&w=800', alt: 'Image 4' },
        { url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGJlYWNoJTIwbWFydmVsfGVufDB8fHx8MTYyNzUwMTcwMA&ixlib=rb-1.2.1&q=80&w=800', alt: 'Image 5' },
        { url: 'https://images.unsplash.com/photo-1514986888952-8cd320577b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDd8fGNhbXAlMjBmaXJlfGVufDB8fHx8MTYyNzUwMTc3MA&ixlib=rb-1.2.1&q=80&w=800', alt: 'Image 6' },
        { url: 'https://images.unsplash.com/photo-1452418949794-1a9c99e7e8fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDh8fGZpcnVzdGxha2V8ZW58MHx8fHwxNjI3NTAxNzg5&ixlib=rb-1.2.1&q=80&w=800', alt: 'Image 7' },
      ],
      visibleIndex: 0,
      hiddenIndex: 1,
      isImg1Visible: true,
      intervalTime: 3000, // Change visibility every 3 seconds
      interval: null,
    };
  },
  computed: {
    visibleImage() {
      return this.objects[this.visibleIndex % this.objects.length];
    },
    hiddenImage() {
      return this.objects[this.hiddenIndex % this.objects.length];
    },
  },
  mounted() {
    this.startImageTransition();
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    startImageTransition() {
      this.interval = setInterval(() => {
        this.toggleVisibility();
      }, this.intervalTime);
    },
    toggleVisibility() {
      // First toggle visibility
      this.isImg1Visible = !this.isImg1Visible;

      // Set the index change for the hidden image after the fade-out is done
      setTimeout(() => {
        if (this.isImg1Visible) {
          this.hiddenIndex = (this.hiddenIndex + 2) % this.objects.length; // Next hidden image
        } else {
          this.visibleIndex = (this.visibleIndex + 2) % this.objects.length; // Next visible image
        }
      }, 500); // Match this delay to your CSS transition duration
    },
  },
};
</script>

<style>

.image-container {
  position: relative;
  width: 100%; /* Set your desired width */
  height: auto; /* Adjust height accordingly */
}

img {
  height: 100px;
  width: 100px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0; /* Start invisible */
  animation-duration: 2s; /* Animation duration */
  animation-fill-mode: forwards; /* Keep final state after animation */
}

.hidden {
  animation-name: fadeOut; /* Animation for fading out */
}

.visible {
  animation-name: fadeIn; /* Animation for fading in */
}

/* Keyframes for fade-in effect */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Keyframes for fade-out effect */
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
