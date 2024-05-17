<template>
  <q-page>
    <div :style="$q.screen.gt.sm ? 'margin: 0 auto' : 'row q-gutter-md'"></div>
    <div style="padding-bottom: 60px" v-if="OtherBookedTicket.length">
      <div
        class="q-pb-md row items-start q-gutter-md"
        v-for="(obj, index) in OtherBookedTicket"
        :key="obj.id"
      >
        <q-card
          flat
          @click="draftcanvasticket(index, obj)"
          aria-label="please click to view QR tickets"
          class="my-card"
        >
          <div class="header-title q-pa-md">
            {{ obj.EventTitle }}
          </div>
          <div
            class="q-px-md q-mx-sm"
            :class="$q.dark.isActive ? 'bg-card' : 'bg-grey-2'"
            style="border-radius: 20px"
          >
            <div class="row q-pa-sm q-pt-md justify-between">
              <div>
                <div class="q-mt-sm">Name</div>
                <div class="text-bold text-h6">
                  {{ obj.AttendeeName }}
                </div>
              </div>
            </div>
            <div class="q-mt-sm" id="qr-code">
              <qrcode-vue
                id="qr-code"
                :value="getQrValue(obj.id, obj.AttendeeName)"
                :size="200"
                level="H"
              />
            </div>
            <div class="row q-pa-sm justify-between">
              <div class="q-mt-sm">
                <div>Phone Number</div>
                <div class="text-bold text-h6">
                  {{ obj.PhoneNumber }}
                </div>
              </div>
              <div class="q-mt-sm">
                <div class="text-right">Gender</div>
                <div class="text-bold text-h6">
                  {{ obj.Gender }}
                </div>
              </div>
            </div>
            <div class="row q-pa-sm justify-between">
              <div class="q-mt-sm">
                <div>Email</div>
                <div class="">
                  {{ obj.Personemail }}
                </div>
              </div>
              <div class="q-mt-sm">
                <div>Accompanied By</div>
                <div class="text-bold text-right q-mr-sm text-h6">
                  {{ obj.AccompaniedBy }}
                </div>
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>
    <div v-else class="row flex-center q-mt-xl">
      No ticket available for this user
    </div>
    <QFooter class="footer" v-if="$q.screen.lt.md" />
  </q-page>
</template>

<script setup>
import { date as qdate } from "quasar";
import QFooter from "../pages/QFooter.vue";
import QrcodeVue from "qrcode.vue";
import { ref, onMounted, computed } from "vue";
import { db, collection } from "src/stores/firebase.js";
import { addDoc, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { useCounterStore } from "../stores/example-store";
import { auth } from "src/stores/firebase.js";
const bookedList = ref([]);
const commonStore = useCounterStore();
onMounted(() => {
  commonStore.pageTitle = "My Ticket";
  const appliedbookings = collection(db, "booking");
  onSnapshot(appliedbookings, (snapshot) => {
    bookedList.value = [];
    snapshot.docs.forEach((doc) => {
      bookedList.value.push({ ...doc.data(), id: doc.id });
    });
  });
});
const getQrValue = (id, AttendeeName) => {
  return (
    id +
    "@" +
    AttendeeName +
    "@" +
    commonStore.eventDetails.eventTitle +
    "@" +
    commonStore.eventDetails.id
  );
};
const OtherBookedTicket = computed(() =>
  bookedList.value?.filter((item) => {
    return item.Personemail === auth.currentUser.email;
  })
);
const changeDateFormat = (date, format = "DD MMM , YYYY") => {
  return qdate.formatDate(date, format);
};
const changeTimeFormat = (date, format = "HH:mm a") => {
  return qdate.formatDate(date, format);
};
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
</script>

<style scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 1;
}
.badge-color {
  background: rgb(217, 220, 238);
  color: rgba(86, 105, 255, 1);
}
.bg-card {
  background: #1d2531;
  padding: 5px 10px;
}
.header-title {
  font-size: 18px;
  font-weight: 500;
  line-height: 34px;
  text-align: left;
}
.divider {
  position: relative;
  height: 1px;
}

.book-btn {
  width: 295px;
  height: 50.14px;
  background: rgb(211, 15, 15);
}
.top-left {
  position: absolute;
  top: 8px;
  left: 10px;
}
.button-bg {
  border-radius: 12px;
  padding: 7px;
  background: rgb(88, 86, 86);
  opacity: 0.9;
  border: 1px solid rgba(15, 15, 15, 0.18);
}
.red-line {
  width: 100%;
  height: 10px;

  /* border: 1px;
  opacity: 0px; */
  /* border: 1px solid; */

  border-image-source: linear-gradient(
    90deg,
    #ffffff 0%,
    #ff8484 48.5%,
    #ffffff 100%
  );
}
.image-brand {
  width: 101px;
  height: 31px;
}
.image-brand2 {
  width: 97px;
  height: 20px;
}
.image-brand3 {
  width: 101px;
  height: 20px;
}
.title-font {
  font-family: Clash Display;
  font-size: 30px;
  font-weight: 600;
  line-height: 36.9px;
  text-align: left;
}
.top-right {
  position: absolute;
  top: 8px;
  right: 10px;
}
.button-border {
  border-radius: 12px;
  padding: 7px 10px;
  border: 1px solid rgba(79, 77, 77, 0.18);
}
.container .content {
  position: absolute;
  bottom: 0;
  background: rgb(0, 0, 0); /* Fallback color */
  background: rgba(0, 0, 0, 0.5); /* Black background with 0.5 opacity */
  color: #f1f1f1;
  border-radius: 20px;
  width: 100%;
  padding: 40px;
}
.container {
  position: relative;
  text-align: center;
  color: white;
}
.bottom-right {
  position: absolute;
  bottom: 15px;
  right: 30px;
}
.bookmark-button {
  position: absolute;
  top: 70px;
  right: 7px;
}
.date-mark {
  width: 65px;
  height: 65px;
  background: rgb(248, 105, 105);
  border-radius: 8px;
  opacity: 0px;
}
.bottom-left {
  position: absolute;
  bottom: 20px;
  left: 40px;
}
.my-card {
  width: 450px;
}
</style>
