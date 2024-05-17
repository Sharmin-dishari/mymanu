<template>
  <q-page padding class="q-py-lg">
    <div v-if="videoList.length">
      <div class="row justify-between">
        <div class="q-ml-md row">
          <div>
            <q-avatar size="42px">
              <img src="/boy.png" />
            </q-avatar>
          </div>
          <div class="q-ml-sm">
            <div class="text-bold">
              {{ auth.currentUser.displayName }}
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
            <div class="text-caption">{{ auth.currentUser.email }}</div>
          </div>
        </div>
        <!-- <div>
          <span><q-btn label="4" outline size="8px" round /></span>
          <span class="q-ml-sm">14 Feb, 2024</span>
          <span><q-btn flat round icon="more_horiz" /></span>
        </div> -->
      </div>
      <div
        class="q-mt-md"
        v-if="videoList?.length && videoList[0]?.news1imagelist"
      >
        <q-carousel
          style="border-radius: 20px"
          animated
          v-model="slide1"
          arrows
          height="350px"
          navigation
          infinite
        >
          <q-carousel-slide
            :name="index1 + 1"
            @click="handleDetails(1)"
            v-for="(image, index1) in videoList[0]?.news1imagelist"
            :key="index1"
            :img-src="image"
          />
        </q-carousel>
      </div>
      <div
        class="text-h6 q-ma-sm"
        v-if="!readMore && videoList[0].news1.length > 40"
      >
        {{ videoList[0].news1.substring(0, 40) }}
        <span class="text-caption text-blue q-ml-sm" @click="readMore = true"
          >Read More</span
        >
      </div>
      <div v-else class="text-h6 q-ma-sm" @click="readMore = false">
        {{ videoList[0].news1 }}
      </div>
      <q-separator class="q-my-md" />
      <div
        class="q-mt-md"
        v-if="videoList?.length && videoList[0]?.news2imagelist"
      >
        <q-carousel
          style="border-radius: 20px"
          animated
          v-model="slide2"
          arrows
          height="350px"
          navigation
          infinite
        >
          <q-carousel-slide
            :name="index2 + 1"
            @click="handleDetails(2)"
            v-for="(image, index2) in videoList[0]?.news2imagelist"
            :key="index2"
            :img-src="image"
          />
        </q-carousel>
      </div>
      <div
        class="text-h6 q-ma-sm"
        v-if="!readMore2 && videoList[0].news2.length > 40"
      >
        {{ videoList[0].news2.substring(0, 40) }}
        <span class="text-caption text-blue q-ml-sm" @click="readMore2 = true"
          >Read More</span
        >
      </div>
      <div v-else class="text-h6 q-ma-sm" @click="readMore2 = false">
        {{ videoList[0].news2 }}
      </div>
      <q-separator class="q-my-md" />
      <div
        class="q-mt-md"
        v-if="videoList?.length && videoList[0]?.news3imagelist"
      >
        <q-carousel
          style="border-radius: 20px"
          animated
          v-model="slide3"
          arrows
          height="350px"
          navigation
          infinite
        >
          <q-carousel-slide
            :name="index3 + 1"
            @click="handleDetails(3)"
            v-for="(image, index3) in videoList[0]?.news3imagelist"
            :key="index3"
            :img-src="image"
          />
        </q-carousel>
      </div>
      <div
        class="text-h6 q-ma-sm"
        v-if="!readMore3 && videoList[0].news3.length > 40"
      >
        {{ videoList[0].news3.substring(0, 40) }}
        <span class="text-caption text-blue q-ml-sm" @click="readMore3 = true"
          >Read More</span
        >
      </div>
      <div v-else class="text-h6 q-ma-sm" @click="readMore3 = false">
        {{ videoList[0].news3 }}
      </div>
      <q-separator class="q-my-md" />
      <div
        class="q-mt-md"
        v-if="videoList?.length && videoList[0]?.news4imagelist"
      >
        <q-carousel
          style="border-radius: 20px"
          animated
          v-model="slide4"
          arrows
          height="350px"
          navigation
          infinite
        >
          <q-carousel-slide
            :name="index4 + 1"
            @click="handleDetails(4)"
            v-for="(image, index4) in videoList[0]?.news4imagelist"
            :key="index4"
            :img-src="image"
          />
        </q-carousel>
      </div>
      <div
        class="text-h6 q-ma-sm"
        v-if="!readMore4 && videoList[0].news4.length > 40"
      >
        {{ videoList[0].news4.substring(0, 40) }}
        <span class="text-caption text-blue q-ml-sm" @click="readMore4 = true"
          >Read More</span
        >
      </div>
      <div v-else class="text-h6 q-ma-sm" @click="readMore4 = false">
        {{ videoList[0].news4 }}
      </div>
      <q-separator class="q-my-md" />
      <div
        class="q-mt-md"
        v-if="videoList?.length && videoList[0]?.news5videolist"
      >
        <video-list
          :video-list="videoList[0]?.news5videolist"
          title="Event Galary"
        />
      </div>
      <div
        class="text-h6 q-ma-sm"
        @click="handleDetails(5)"
        v-if="!readMore5 && videoList[0].news5.length > 40"
      >
        {{ videoList[0].news5.substring(0, 40) }}
        <span class="text-caption text-blue q-ml-sm" @click="readMore5 = true"
          >Read More</span
        >
      </div>
      <div v-else class="text-h6 q-ma-sm" @click="readMore5 = false">
        {{ videoList[0].news5 }}
      </div>
      <!-- <div class="row justify-between q-mt-sm">
        <div class="row">
          <q-btn round icon="favorite_border" flat />
          <q-btn round icon="maps_ugc" class="rotate-270" flat />
          <q-btn
            icon="send"
            round
            flat
            @click="$router.push({ name: 'news-details' })"
            class="rotate-320"
          />
        </div>
        <div class="q-mt-sm">
          <q-btn icon="bookmark" round flat />
        </div>
      </div>
      <div class="row q-pa-sm">
        <q-avatar size="20px">
          <img src="/boy.png" />
        </q-avatar>
        <span class="q-ml-sm">Liked by craig_love and 44,686 others</span>
      </div> -->
      <!-- <div class="text-caption text-grey-6 q-ma-sm">
        joshua_l The game in Japan was amazing and I want to share some photos
      </div> -->
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCounterStore } from "../stores/example-store";
import { auth } from "src/stores/firebase.js";
import { useRouter } from "vue-router";
import { db, collection } from "src/stores/firebase.js";
import { onSnapshot } from "firebase/firestore";
import VideoList from "../components/VideoIndex.vue";
const videoList = ref([]);
const router = useRouter();
const commonStore = useCounterStore();
onMounted(() => {
  commonStore.pageTitle = "All News  & Feed";
  const videos = collection(db, "NewsnFeedvideo");
  videoList.value = [];
  onSnapshot(videos, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      videoList.value.push({ ...doc.data(), id: doc.id });
    });
  });
});
const handleDetails = (index) => {
  commonStore.newsDetails = {
    [`news${index}`]: videoList.value[0][`news${index}`],
    [`news${index}imagelist`]: videoList.value[0][`news${index}imagelist`],
    [`news${index}videolist`]: videoList.value[0][`news${index}videolist`],
  };
  // router.push({ name: "news-details" });
};
const readMore = ref(false);
const readMore2 = ref(false);
const readMore3 = ref(false);
const readMore4 = ref(false);
const readMore5 = ref(false);
const slide1 = ref(1);
const slide2 = ref(1);
const slide3 = ref(1);
const slide4 = ref(1);
</script>

<style>
.rotate-270 {
  transform: rotate(270deg);
}

.rotate-320 {
  transform: rotate(320deg);
}
</style>
