<template>
  <q-page>
    <q-carousel
      v-model="slide"
      swipeable
      animated
      :padding="true"
      :vertical="false"
      :arrows="false"
      :navigation="true"
      ref="carousel"
      :dark="$q.dark.isActive"
      :control-color="$q.dark.isActive ? 'white' : 'black'"
      :navigation-position="navPos"
      style="object-fit: fill; height: calc(100vh - 100px); padding: 0"
      :class="$q.dark.isActive ? 'text-white' : 'text-black'"
    >
      <q-carousel-slide name="style" class="column no-wrap q-pa-none q-ma-none">
        <div class="full-width">
          <q-img
            src="/carousel3.png"
            :style="$q.screen.gt.md ? 'height:600px' : ''"
          />
        </div>
        <div :class="$q.dark.isActive ? 'black-gradiant' : 'gradiant'"></div>
        <div class="text-center text-h5 q-pa-md">
          Explore Upcoming and Nearby Events
        </div>
        <div class="text-center text-body1 q-pa-md">
          In publishing and graphic design, Lorem is a placeholder text commonly
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="tv" class="column no-wrap q-pa-none q-ma-none">
        <div class="full-width">
          <q-img
            src="/carousel2.png"
            :style="$q.screen.gt.md ? 'height:600px' : ''"
          />
        </div>
        <div :class="$q.dark.isActive ? 'black-gradiant' : 'gradiant'"></div>
        <div class="text-center text-h5 q-pa-md">
          We Have Modern Events Calendar Feature
        </div>
        <div class="text-center text-body1 q-pa-md">
          In publishing and graphic design, Lorem is a placeholder text commonly
        </div>
      </q-carousel-slide>
      <q-carousel-slide
        name="layers"
        class="column no-wrap q-pa-none q-ma-none"
        :class="$q.dark.isActive ? 'text-white' : 'text-black'"
      >
        <div class="full-width">
          <q-img
            src="/carousel1.png"
            :style="$q.screen.gt.md ? 'height:600px' : ''"
          />
        </div>
        <div :class="$q.dark.isActive ? 'black-gradiant' : 'gradiant'"></div>
        <div class="text-center text-h5 q-pa-md">
          To Look Up More Events or Activities Nearby By Map
        </div>
        <div class="text-center text-body1 q-pa-md">
          In publishing and graphic design, Lorem is a placeholder text commonly
        </div>
      </q-carousel-slide>

      <template v-slot:control>
        <q-carousel-control position="bottom-right" :offset="[18, 18]">
          <q-btn
            flat
            label="Next"
            :class="$q.dark.isActive ? 'text-white' : 'text-black'"
            @click="
              slide === 'layers'
                ? $router.push({ name: 'dashboard' })
                : $refs.carousel.next()
            "
          />
        </q-carousel-control>
        <q-carousel-control position="bottom-left" :offset="[18, 18]">
          <q-btn
            flat
            label="Skip"
            :class="$q.dark.isActive ? 'text-white' : 'text-black'"
            @click="onClickSkip"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      slide: "style",
      navPos: "bottom",
      navigationPositions: [
        { value: "top", label: "top" },
        { value: "right", label: "right" },
        { value: "bottom", label: "bottom (default)" },
        { value: "left", label: "left" },
      ],
    };
  },
  methods: {
    onClickSkip() {
      return this.$router.push({ name: "dashboard" });
    },
  },
  watch: {
    vertical(val) {
      this.navPos = val === true ? "right" : "bottom";
    },
  },
};
</script>

<style scoped>
.gradiant {
  height: 100px;
  margin-top: -70px;
  z-index: 1;
  background: linear-gradient(
    177.68deg,
    rgba(0, 0, 0, 0.06) 9.74%,
    #ffffff 57.69%
  );
}
.black-gradiant {
  height: 100px;
  margin-top: -70px;
  z-index: 1;
  background: linear-gradient(
    177.68deg,
    rgba(0, 0, 0, 0.06) 9.74%,
    #0a111c 58.66%
  );
}
</style>
