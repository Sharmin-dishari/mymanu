<template>
  <q-page padding>
    <div>
      <div id="event-details">
        <div
          class="container q-mt-md q-mx-sm"
          :style="$q.screen.gt.sm ? 'width: 450px; margin: 0 auto' : ''"
        >
          <q-carousel
            swipeable
            animated
            v-model="slide"
            :autoplay="autoplay"
            style="border-radius: 20px; height: 300px"
            ref="carousel"
            infinite
          >
            <q-carousel-slide
              v-for="(item, index) in commonStore.eventDetails.imageslide1"
              :name="index"
              :key="index"
              :img-src="item"
            />

            <template v-slot:control>
              <q-carousel-control
                position="top-right"
                :offset="[10, 10]"
                class="q-gutter-xs"
              >
                <q-btn
                  push
                  round
                  dense
                  color="orange"
                  text-color="black"
                  icon="arrow_left"
                  @click="$refs.carousel.previous()"
                />
                <q-btn
                  push
                  round
                  dense
                  color="orange"
                  text-color="black"
                  icon="arrow_right"
                  @click="$refs.carousel.next()"
                />
              </q-carousel-control>
            </template>
          </q-carousel>
          <div class="top-right">
            <!-- <q-btn icon="bookmark" unelevated dense class="button-bg" /> -->
          </div>
          <!-- <div class="top-left">
            <q-btn
              icon="share"
              @click="captureAndShare"
              unelevated
              dense
              class="button-bg"
            />
          </div> -->
          <div class="content">
            <div class="bottom-left">
              <!-- <div class="text-bold text-h6" style="margin-left: -40px">
              {{ commonStore.eventDetails.eventTitle }}
            </div>
            <div class="avatar-group">
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
              <div no-caps class="date-mark">
                <div>
                  <div class="text-bold text-h6">
                    {{ commonStore.eventDetails?.eventDate?.split("/")[0]
                    }}<sup>th</sup>
                  </div>
                  <div style="font-size: 11px" class="q-mt-xs">
                    {{
                      monthName(
                        commonStore.eventDetails?.eventDate?.split("/")[1]
                      )
                    }}
                  </div>
                </div>
              </div>
              <!-- <div class="text-bold text-h6">$125</div> -->
              <!-- <div style="font-size: 9px">1/person</div> -->
              <div style="font-size: 11px" class="q-mt-sm text-right">
                {{
                  commonStore.eventDetails.totalseat -
                  commonStore.ticketBookingList?.length
                }}
                / +Available
              </div>
            </div>
          </div>
        </div>
        <div class="title-font q-my-md q-px-sm">
          {{ commonStore.eventDetails.eventTitle }}
        </div>
        <div class="q-ma-sm row q-py-md">
          <q-btn icon="calendar_month" unelevated dense class="button-border" />
          <div class="q-ml-md">
            <div>
              {{ changeDateFormat(commonStore.eventDetails.eventDate) }}
            </div>
            <div class="text-caption">
              {{ commonStore.eventDetails.eventTime }}
            </div>
          </div>
        </div>
        <div class="q-ma-sm row" @click="shareLocation">
          <q-btn icon="pin_drop" unelevated dense class="button-border" />
          <div class="q-ml-md">
            <div class="text-caption q-mt-sm">
              {{ commonStore.eventDetails.eventLocation }}
            </div>
          </div>
        </div>
        <div class="divider div-transparent q-mt-lg"></div>
      </div>
      <div class="text-center q-py-md text-h6 text-bold">Event Sponsors</div>
      <div
        class="row justify-between flex-center q-px-sm"
        :style="$q.screen.gt.sm ? 'width: 450px; margin: 0 auto' : ''"
      >
        <img src="/Indonesia.png" class="image-brand" />
        <img src="/Indonesia (1).png" class="image-brand2 q-mt-sm" />
        <img
          :src="$q.dark.isActive ? '/Indonesia.svg' : '/Indonesia (2).png'"
          class="image-brand3 q-mt-sm"
        />
      </div>
      <div class="divider div-transparent q-mt-xl q-mb-lg"></div>
      <q-item>
        <q-item-section avatar>
          <q-item-label>
            <img src="/user.png" style="border-radius: 15px" />
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="header-title">{{
            commonStore.eventDetails.contactPerson
          }}</q-item-label>
          <q-item-label class="text-caption">Organizer</q-item-label>
        </q-item-section>
        <!-- <q-item-section top>
          <q-item-label class="q-mt-sm">
            <q-badge class="badge-color q-pa-xs q-px-md">Follow</q-badge>
          </q-item-label>
        </q-item-section> -->
        <q-item-section side top>
          <q-item-label class="q-mt-sm">
            <q-btn
              round
              icon="maps_ugc"
              size="sm"
              color="grey-3"
              unelevated
              class="text-black"
            />

            <q-btn
              clickable
              round
              size="sm"
              unelevated
              color="grey-3"
              class="text-black q-ml-sm"
            >
              <a
                clickable
                :href="`tel:+88${commonStore.eventDetails.contactPhone}`"
                style="color: black; text-decoration: none"
              >
                <q-icon size="22px" name="phone" />
              </a>
              <q-tooltip content-class="bg-primary" :offset="[10, 10]">
                {{ commonStore.eventDetails.contactPhone }}
              </q-tooltip>
            </q-btn>
            <!-- <q-btn
              round
              icon="phone_forwarded"
              size="sm"
              text-black
              unelevated
              color="grey-3"
              class="text-black"
            /> -->
          </q-item-label>
        </q-item-section>
      </q-item>
      <div class="q-pa-sm">
        <div>About Event</div>
        <div class="text-caption">
          {{ commonStore.eventDetails.eventSummary }}
          <!-- <span class="text-blue-4">Read More...</span> -->
        </div>
      </div>
      <div class="text-center q-py-md">
        <q-btn
          class="book-btn"
          rounded
          @click="$router.push({ name: 'book-ticket' })"
        >
          <div class="row text-white">
            <div class="q-mt-xs text-bold">Book ticket</div>
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
    </div>
    <q-dialog v-model="inviteFrnds" full-width>
      <InviteFriends />
    </q-dialog>
  </q-page>
</template>

<script setup>
import { date as qdate } from "quasar";
import { ref, onMounted } from "vue";
import { useCounterStore } from "../stores/example-store";
import InviteFriends from "../components/InviteFriends.vue";
import html2canvas from "html2canvas";
const commonStore = useCounterStore();
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import { StartNavigation } from "@proteansoftware/capacitor-start-navigation";
const slide = ref(1);
const autoplay = ref(true);
const carousel = ref();
onMounted(() => {
  commonStore.pageTitle = "Event Details";
});
const monthName = (monthNumber) => {
  return new Date(2000, monthNumber - 1, 1).toLocaleString("en-US", {
    month: "long",
  });
};
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
const baseImage = ref();
const captureAndShare = async () => {
  try {
    const contentToCapture = document.getElementById("event-details");

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
const shareLocation = () => {
  StartNavigation.launchMapsApp({
    address: {
      street: commonStore.eventDetails.eventLocation,
      city: "",
      postalCode: "",
      Country: "",
    },
    name: "Navigate to Event location",
  });
};
const inviteFrnds = ref(false);
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
const changeDateFormat = (date, format = "MM/DD/YYYY") => {
  return qdate.formatDate(date, format);
};
const changeTimeFormat = (date, format = "HH:mm a") => {
  return qdate.formatDate(date, format);
};
</script>

<style scoped>
.badge-color {
  background: rgb(217, 220, 238);
  color: rgba(86, 105, 255, 1);
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
  width: 31%;
}
.image-brand2 {
  width: 30%;
}
.image-brand3 {
  width: 31%;
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
  bottom: 28px;
  right: 10px;
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
  bottom: 30px;
  left: 20px;
}
</style>
