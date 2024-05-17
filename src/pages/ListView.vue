<template>
  <q-page padding>
    <!-- future use -->
    <!-- <div class="row q-gutter-x-sm q-px-sm">
      <div class="col-grow q-mt-sm" style="border-radius: 12px">
        <q-input
          dense
          v-model="search"
          outlined
          hide-bottom-space
          label="Search event"
          label-color="label-color"
          ><template v-slot:prepend> <q-icon name="search" /> </template
        ></q-input>
      </div>
      <div class="q-mt-sm">
        <q-btn icon="tune" unelevated dense class="button-border" />
      </div>
      <div class="q-mt-sm">
        <q-btn icon="calendar_month" unelevated dense class="button-border" />
      </div>
    </div> 
    <div class="scroll-wrapper">
      <div class="horizontal-scroll-container q-mt-md">
        <div v-for="(item, index) in buttonList" :key="index" class="option">
          <button
            :class="{
              selected: optionSelected(item.label),
              'dark-selected': $q.dark.isActive && optionSelected(item.label),
              btn: !optionSelected(item.label),
              darkbtn: $q.dark.isActive && !optionSelected(item.label),
            }"
            @click="selectedEvent = item.label"
          >
            {{ item.label }}
          </button>
        </div>
      </div>
    </div> -->
    <!-- future use -->
    <EventCard style="margin-bottom: 80px" />
    <QFooter class="footer" v-if="$q.screen.lt.md" />
  </q-page>
</template>

<script setup>
import QFooter from "../pages/QFooter.vue";
import { ref } from "vue";
import EventCard from "./EventCard.vue";
const search = ref(null);
const buttonList = ref([
  {
    id: 0,
    label: "View all",
  },
  {
    id: 1,
    label: "Tech Event",
  },
  {
    id: 2,
    label: "Music Tours",
  },
  {
    id: 3,
    label: "Exhibitions",
  },
  {
    id: 4,
    label: "Party",
  },
]);
const selectedEvent = ref("View all");
const optionSelected = (item) => {
  if (item === selectedEvent.value) {
    return true;
  } else {
    return false;
  }
};
</script>

<style>
.label-color {
  color: rgba(15, 15, 15, 0.18);
}
.button-border {
  border-radius: 12px;
  padding: 7px 10px;
  border: 1px solid rgba(15, 15, 15, 0.18);
}
.darkbtn {
  background: #1d2531;
  color: white;
  border: 1px solid rgba(15, 15, 15, 0.18);
}
.btn {
  height: 35px;
  top: 196px;
  border-radius: 24px;
  opacity: 0px;
  padding: 5px 15px;
  border: 1px solid #96969640;
}
.selected {
  height: 35px;
  top: 196px;
  border-radius: 24px;
  opacity: 0px;
  color: #ffffff;
  padding: 5px 15px;
  background: #101211;
  border: 1px solid #101211;
}
.dark-selected {
  height: 35px;
  top: 196px;
  border-radius: 24px;
  opacity: 0px;
  color: #ffffff;
  padding: 5px 15px;
  background: rgb(211, 15, 15);
  border: rgb(211, 15, 15);
}
.option {
  display: inline-block;
  padding: 5px 5px 5px 0;
}
.horizontal-scroll-container {
  overflow-x: auto;
  position: relative;
  white-space: nowrap;
}
.scroll-wrapper {
  overflow: hidden; /* Hide the scrollbar */
}
</style>
<style>
.q-field--dense .q-field__control {
  border-radius: 12px;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 1;
}
</style>
