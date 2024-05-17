<template>
  <q-page padding>
    <div>
      <div class="row justify-between">
        <div class="q-ml-md row">
          <div>
            <q-avatar size="42px">
              <img src="/boy.png" />
            </q-avatar>
          </div>
          <div class="q-ml-sm">
            <div class="text-bold">
              Cameroon
              <span>
                <q-btn
                  size="5px"
                  dense
                  color="primary"
                  round
                  icon="done"
                  class="q-ml-xs"
                >
                </q-btn
              ></span>
            </div>
            <div class="text-caption">Paris, FR</div>
          </div>
        </div>
        <div>
          <span><q-btn label="4" outline size="8px" round /></span>
          <span class="q-ml-sm">14 Feb, 2024</span>
          <span><q-btn flat icon="more_horiz" /></span>
        </div>
      </div>
      <div class="q-mt-md">
        <q-carousel
          style="border-radius: 20px"
          animated
          v-model="slide"
          arrows
          navigation
          height="250px"
          infinite
        >
          <q-carousel-slide
            :name="1"
            img-src="https://cdn.quasar.dev/img/mountains.jpg"
          />
          <q-carousel-slide
            :name="2"
            img-src="https://cdn.quasar.dev/img/parallax1.jpg"
          />
          <q-carousel-slide
            :name="3"
            img-src="https://cdn.quasar.dev/img/parallax2.jpg"
          />
          <q-carousel-slide
            :name="4"
            img-src="https://cdn.quasar.dev/img/quasar.jpg"
          />
        </q-carousel>
      </div>

      <div class="text-h6 q-ma-sm">News and feed title goes here</div>
      <div class="text-caption text-grey-6 q-ma-sm">
        joshua_l The game in Japan was amazing and I want to share some photos
        ,joshua_l The game in Japan was amazing and I want to share some photos
        . joshua_l The joshua_l The game in Japan was amazing and I want to
        share some photos ,joshua_l The game in Japan was amazing and I want to
        share some photos . joshua_l The
      </div>
      <div class="q-ma-sm text-h6">Media Gallary</div>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="photos" label="Photos" />
        <q-tab name="videos" label="Videos" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="photos">
          <div class="text-h6 row q-col-gutter-xs">
            <div v-for="(item, index) in 15" :key="index" class="col-4">
              <q-img src="https://cdn.quasar.dev/img/mountains.jpg" />
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="videos">
          <div class="text-h6">Movies</div>
          <div class="text-h6 row q-col-gutter-xs">
            <div v-for="(item, index) in 6" :key="index" class="col-4">
              <q-video
                :ratio="16 / 9"
                style="border-radius: 12px"
                src="/video1.mp4"
              />
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCounterStore } from "../stores/example-store";
import { useRouter } from "vue-router";
const router = useRouter();
const commonStore = useCounterStore();
onMounted(() => {
  commonStore.pageTitle = "All News  & Feed";
});
const slide = ref(1);
const tab = ref("photos");
</script>

<style>
.container {
  position: relative;
  text-align: center;
  color: white;
}
</style>
