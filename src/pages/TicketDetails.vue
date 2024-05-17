<template>
  <q-page>
    <div
      style="padding-bottom: 100px"
      :style="$q.screen.gt.sm ? 'width: 450px; margin: 0 auto' : ''"
    >
      <div>
        <div class="container q-mt-sm q-mx-sm" style="border-radius: 20px">
          <!-- <q-img src="/bg1.png" alt="Snow" style="border-radius: 20px" /> -->
          <q-img
            :src="commonStore.eventDetails.eventImg"
            alt="Snow"
            style="border-radius: 20px"
          />
          <div class="content">
            <div class="bottom-left">
              <div class="text-bold text-h6">
                {{ currentTicket?.EventTitle }}
              </div>
              <!-- <div class="avatar-group">
              <div
                class="avatar"
                v-for="(user, index) in users?.slice(0, 3)"
                :key="index"
              >
                <img :src="user.avatar" />
              </div>
              <div class="q-mt-sm q-pl-sm">10+ interested</div>
            </div> -->
            </div>
            <div class="bottom-right">
              <div class="text-bold">Accompanied By</div>
              <div style="font-size: 14px">
                {{ currentTicket?.AccompaniedBy }}/person
              </div>
            </div>
          </div>
        </div>
        <div
          class="q-px-md q-mx-sm"
          :class="$q.dark.isActive ? 'bg-card' : 'bg-grey-2'"
          style="
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            margin-top: -15px;
          "
        >
          <div class="row q-pa-sm q-pt-md justify-between">
            <div>
              <div class="q-mt-sm">Name</div>
              <div class="text-bold text-h6">
                {{ currentTicket?.AttendeeName }}
              </div>
            </div>
            <div class="q-mt-sm" id="qr-code">
              <qrcode-vue :value="commonStore.qrValue" :size="120" level="H" />
            </div>
          </div>
          <div class="row q-pa-sm justify-between">
            <div class="q-mt-sm">
              <div>Date</div>
              <div class="text-bold text-h6">
                {{ commonStore.eventDetails.eventDate }}
              </div>
            </div>
            <div class="q-mt-sm" v-if="commonStore.eventDetails?.eventTime">
              <div class="text-right">Time</div>
              <div class="text-bold text-h6">
                {{ commonStore.eventDetails.eventTime }}
              </div>
            </div>
          </div>
          <div class="row q-pa-sm justify-between">
            <div class="q-mt-sm">
              <div>Section</div>
              <div class="text-bold text-h6">---</div>
            </div>
            <div class="q-mt-sm">
              <div>Seat</div>
              <div class="text-bold text-h6">
                {{ commonStore.eventDetails.totalseat }}
              </div>
            </div>
          </div>
        </div>
        <hr class="dashed q-mx-lg q-mt-md" />
      </div>
      <q-card-actions class="q-pt-none" align="center">
        <div class="text-center q-pt-sm" @click="captureAndShare">
          <q-btn class="book-btn" rounded>
            <div class="row text-white">
              <div class="q-mt-xs text-bold">Save as Image</div>
              <div class="q-ml-md">
                <q-btn
                  round
                  icon="east"
                  size="sm"
                  text-black
                  unelevated
                  color="red-5"
                  class="text-white"
                />
              </div>
            </div>
          </q-btn>
        </div>
      </q-card-actions>
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
import { onSnapshot } from "firebase/firestore";
import { useCounterStore } from "../stores/example-store";
import html2canvas from "html2canvas";
import { Share } from "@capacitor/share";
import { Filesystem, Directory } from "@capacitor/filesystem";
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
const baseImage = ref();
async function createFileFromBase64(base64Data, fileName) {
  try {
    const result = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      mimeType: "image/png",
      directory: Directory.Documents,
    });
    return result.uri;
  } catch (error) {
    return null;
  }
}
const captureAndShare = async () => {
  try {
    const contentToCapture = document.getElementById("qr-code");

    const canvas = await html2canvas(contentToCapture, {
      backgroundColor: null,
      scale: 2,
    });
    const imageDataUrl = canvas.toDataURL("image/png");
    baseImage.value = imageDataUrl;
    createFileFromBase64(imageDataUrl, "qr-code.png").then(async (result) => {
      console.log(result, "result");
      await Share.share({
        title: "Shared Image",
        url: result,
        mimeType: "image/png",
      });
    });
  } catch (error) {
    console.error("Error capturing and sharing image:", error);
  }
};

const saveImage = () => {
  const element = document.getElementById("qr-code");

  html2canvas(element).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const fileName = "qr-code.jpeg";
    downloadBlobImage(imgData, fileName);
  });
};

function downloadBlobImage(blob, fileName) {
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
const currentTicket = computed(() =>
  bookedList.value.find((item) => {
    return item.id === commonStore.currentTicket;
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
hr.dashed {
  border-top: 2px dashed #bbb;
}
.divider {
  position: relative;
  height: 1px;
}

.div-transparent:before {
  content: "";
  position: absolute;
  top: 0;
  left: 5%;
  right: 5%;
  width: 90%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    transparent,
    rgb(201, 22, 22),
    transparent
  );
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
  border-radius: 0 0 20px 20px;
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
  left: 20px;
}
.my-card {
  max-width: 450px;
}
</style>
