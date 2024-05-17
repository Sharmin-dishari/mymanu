<template>
  <div class="q-mt-md">
    <div class="row justify-between">
      <div class="q-mb-md q-mt-sm">Upcoming Events</div>
      <!-- <div class="row">
        <span class="q-mt-sm">Sort by</span>
        <q-select
          v-model="model"
          borderless
          :options="options"
          style="height: 10px"
          dense
          label-color="black"
          stack-label="Standard"
        />
      </div> -->
    </div>
    <div class="scroll-wrapper" v-if="eventList.length > 1">
      <div class="horizontal-scroll-container">
        <div
          v-for="item in eventList"
          :key="item.id"
          @click="
            $router.push({ name: 'event-details', query: item.id });
            commonStore.eventDetails = item;
          "
        >
          <section
            class="art-event-gallery"
            :class="
              $q.dark.isActive ? 'dark-card text-white' : 'bg-white text-black'
            "
          >
            <div class="row justify-between q-mt-sm">
              <div class="text-h6">{{ item.eventTitle }}</div>
              <q-btn
                round
                unelevated
                dense
                icon="north_east"
                @click="
                  $router.push({ name: 'event-details', query: item.id });
                  commonStore.eventDetails = item;
                "
                class="text-black"
                color="grey-3"
              />
            </div>
            <div class="container q-mt-md">
              <q-img
                :src="item.eventImg"
                alt="Snow"
                style="border-radius: 20px; max-width: 270px; height: 185px"
              />
              <!-- <div class="top-right">
                <q-btn icon="bookmark" unelevated dense class="button-border" />
              </div> -->

              <div class="bottom-left">
                <!-- <div class="avatar-group">
                  <div
                    class="avatar"
                    v-for="(user, index) in users?.slice(0, 3)"
                    :key="index"
                  >
                    <img :src="user.avatar" />
                  </div>
                  <div class="hidden-avatars">+10</div>
                </div>-->
                <div
                  class="avatar-group"
                  v-if="commonStore.ticketBookingList?.length"
                >
                  <span class="q-mt-md text-bold"
                    >+
                    {{ commonStore.ticketBookingList.length }} interested</span
                  >
                </div>
              </div>
              <div class="bottom-right">
                <div no-caps class="date-mark">
                  <div>
                    <div>{{ item.eventDate.split("/")[0] }}</div>
                    <div style="font-size: 12px">
                      {{ monthName(item.eventDate.split("/")[1]) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <q-item class="q-pa-none row justify-between">
              <q-item-section class="q-mt-sm">
                <div class="title-font ellipsis">
                  {{ item.eventSummary.substring(0, 20) }}...
                </div>
                <div style="font-size: 9px">
                  {{ item.eventLocation }}
                </div>
              </q-item-section>
              <q-item-section class="q-mr-sm q-mt-md" side>
                <!-- <div class="title-font">$125</div> -->
                <!-- <div
                  style="font-size: 9px" 
                >
                 1/Person
                </div> -->
              </q-item-section>
            </q-item>
          </section>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        v-for="item in eventList"
        :key="item.id"
        @click="
          $router.push({ name: 'event-details', query: item.id });
          commonStore.eventDetails = item;
        "
      >
        <section
          class="art-event-gallery-single"
          :class="
            $q.dark.isActive ? 'dark-card text-white' : 'bg-white text-black'
          "
        >
          <div class="row justify-between q-mt-sm">
            <div class="text-h6">{{ item.eventTitle }}</div>
            <q-btn
              round
              unelevated
              dense
              icon="north_east"
              @click="
                $router.push({ name: 'event-details', query: item.id });
                commonStore.eventDetails = item;
              "
              class="text-black"
              color="grey-3"
            />
          </div>
          <div class="container q-mt-md">
            <q-img
              :src="item.eventImg"
              alt="Snow"
              style="border-radius: 20px; max-width: 450px"
            />
            <!-- <div class="top-right">
                <q-btn icon="bookmark" unelevated dense class="button-border" />
              </div> -->

            <div class="bottom-left">
              <!-- <div class="avatar-group">
                  <div
                    class="avatar"
                    v-for="(user, index) in users?.slice(0, 3)"
                    :key="index"
                  >
                    <img :src="user.avatar" />
                  </div>
                  <div class="hidden-avatars">+10</div>
                </div>-->
              <div
                class="avatar-group"
                v-if="commonStore.ticketBookingList?.length"
              >
                <span class="q-mt-md text-bold"
                  >+ {{ commonStore.ticketBookingList.length }} interested</span
                >
              </div>
            </div>
            <div class="bottom-right">
              <div no-caps class="date-mark">
                <div>
                  <div>{{ item.eventDate.split("/")[0] }}</div>
                  <div style="font-size: 9px">
                    {{ monthName(item.eventDate.split("/")[1]) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <q-item class="q-pa-none row justify-between">
            <q-item-section class="q-mt-sm">
              <div class="title-font ellipsis">
                {{ item.eventSummary.substring(0, 20) }}...
              </div>
              <div style="font-size: 9px">
                {{ item.eventLocation }}
              </div>
            </q-item-section>
            <q-item-section class="q-mr-sm q-mt-md" side>
              <!-- <div class="title-font">$125</div> -->
              <!-- <div
                  style="font-size: 9px" 
                >
                 1/Person
                </div> -->
            </q-item-section>
          </q-item>
        </section>
      </div>
    </div>
    <div class="row justify-between">
      <div
        class="q-mb-sm q-mt-md cursor-pointer click-event"
        @click="$router.push({ name: 'news-feed' })"
      >
        News & Feed
      </div>
      <!-- <div class="row">
        <span class="q-mt-sm">Sort all</span>
        <q-select
          v-model="model"
          borderless
          :options="options"
          style="height: 10px"
          dense
          label-color="black"
          stack-label="Standard"
        />
      </div> -->
    </div>
    <VideoIndex v-if="videoList.length" :video-list="videoList[0].videolist" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db, collection } from "src/stores/firebase.js";
import { onSnapshot } from "firebase/firestore";
import { useCounterStore } from "../stores/example-store";
import VideoIndex from "../components/VideoIndex.vue";
const commonStore = useCounterStore();
const options = ref(["1", "2"]);
const model = ref(null);
const monthName = (monthNumber) => {
  return new Date(2000, monthNumber - 1, 1).toLocaleString("en-US", {
    month: "long",
  });
};

const list = ref([
  {
    id: 1,
    title: "Birthday Card",
  },
]);
const users = ref([
  {
    id: 1,
    avatar: "boy.png",
  },
  {
    id: 2,
    avatar: "boy.png",
  },
  {
    id: 3,
    avatar: "boy.png",
  },
  {
    id: 4,
    avatar: "boy.png",
  },
]);
const eventList = ref([]);
const bookedList = ref([]);
const videoList = ref([]);
onMounted(() => {
  const catsRef = collection(db, "RSVPEvents");
  const appliedbookings = collection(db, "booking");
  onSnapshot(catsRef, (snapshot) => {
    eventList.value = [];
    snapshot.docs.forEach((doc) => {
      eventList.value.push({ ...doc.data(), id: doc.id });
    });
  });

  const videos = collection(db, "NewsnFeedvideo");
  videoList.value = [];
  onSnapshot(videos, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      videoList.value.push({ ...doc.data(), id: doc.id });
    });
  });
  onSnapshot(appliedbookings, (snapshot) => {
    bookedList.value = [];
    snapshot.docs.forEach((doc) => {
      bookedList.value.push({ ...doc.data(), id: doc.id });
    });
  });
});
</script>

<style scoped>
.bookmark-button {
  position: absolute;
  top: 70px;
  right: 7px;
}
.title-font {
  font-size: 17px;
  font-weight: 500;
  line-height: 21.31px;
}

.date-mark {
  width: 31px;
  height: 42px;
  background: rgb(211, 10, 10);
  border-radius: 8px;
  opacity: 0px;
}
.top-right {
  position: absolute;
  top: 8px;
  right: 10px;
}
.container {
  position: relative;
  text-align: center;
  color: white;
}
.bottom-right {
  position: absolute;
  bottom: -10px;
  right: 10px;
}
.bottom-left {
  position: absolute;
  bottom: 8px;
  left: 25px;
}
.art-event-gallery {
  border: 1px solid #ddd; /* Add a 1px solid border in light gray */
  position: relative; /* This allows us to position the button relatively inside the container */
  border-radius: 25px;
  width: 300px;
  height: 329px;
  padding: 15px;
  opacity: 0px;
}
.art-event-gallery-single {
  border: 1px solid #ddd; /* Add a 1px solid border in light gray */
  position: relative; /* This allows us to position the button relatively inside the container */
  border-radius: 25px;
  max-width: 450px;
  padding: 15px;
  opacity: 0px;
}
.dark-card {
  background: #1d2531;
}
.vedio-event {
  width: 164.09px;
  height: 189px;
  border: 1px solid #ddd;
  padding: 10px;
  position: relative;
  border-radius: 25px;
}
.button-border {
  border-radius: 12px;
  padding: 7px;
  background: rgb(179, 172, 172);
  opacity: 0.8;
  border: 1px solid rgba(15, 15, 15, 0.18);
}
.option {
  display: inline-block;
  padding: 5px 5px 5px 0;
}
.click-event-blue:active,
.click-event-blue:focus {
  background-color: #efeded80;
  border-radius: 20px;
  /* padding: 5px; */
  transition: background-color 3s ease;
}
.click-event:hover {
  background-color: #dad7d780;
  border-radius: 20px;
  /* padding: 5px; */
}
</style>
