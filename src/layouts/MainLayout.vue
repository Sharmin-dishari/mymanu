<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      unelevated
      class="q-pa-sm q-pt-md"
      :class="!$q.dark.isActive ? 'bg-white text-black' : 'bg-dark text-white'"
    >
      <q-toolbar v-if="!$route.meta.isBack">
        <q-avatar size="44px">
          <img src="/boy.png" />
        </q-avatar>
        <q-toolbar-title>
          <div class="text-caption text-bold">
            {{ auth.currentUser?.displayName }}
          </div>
          <div class="text-caption">{{ auth.currentUser?.email }}</div>
          <!-- <div class="text-caption">Paris, FR</div> -->
        </q-toolbar-title>

        <q-btn
          round
          @click="toggleLeftDrawer"
          unelevated
          dense
          :class="$q.dark.isActive ? 'bg-secondary' : 'bg-grey-2'"
        >
          <q-avatar class="q-ma-xs">
            <q-icon name="menu" />
          </q-avatar>
        </q-btn>
      </q-toolbar>
      <q-toolbar v-else>
        <q-btn
          size="16px"
          icon="chevron_left"
          round
          unelevated
          :class="!$q.dark.isActive ? 'bg-grey-3 text-black' : 'bg-grey-10'"
          @click="handleBackRoute"
        />
        <q-toolbar-title
          :class="!$q.dark.isActive ? 'text-black' : 'text-grey-3'"
          class="text-center"
          >{{ commonStore.pageTitle }}</q-toolbar-title
        >
        <q-btn
          round
          @click="toggleLeftDrawer"
          unelevated
          dense
          :class="$q.dark.isActive ? 'bg-secondary' : 'bg-grey-2'"
        >
          <q-avatar class="q-ma-xs">
            <q-icon name="menu" />
          </q-avatar>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      width="300"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      side="right"
    >
      <q-list>
        <EssentialLink />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCounterStore } from "../stores/example-store";
import EssentialLink from "components/EssentialLink.vue";
import { auth } from "src/stores/firebase.js";
import { db, collection } from "src/stores/firebase.js";
import { onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    router.push({ name: "sign-index" });
  }
});
const commonStore = useCounterStore();
defineOptions({
  name: "MainLayout",
});

onMounted(() => {
  const appliedbookings = collection(db, "booking");
  commonStore.ticketBookingList = [];
  onSnapshot(appliedbookings, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      commonStore.ticketBookingList.push({ ...doc.data(), id: doc.id });
    });
  });
});
const route = useRoute();
const router = useRouter();
const handleBackRoute = () => {
  if (route.name === "my-ticket") {
    router.push({ name: "event-details" });
  } else if (route.name === "event-details") {
    router.push({ name: "dashboard" });
  } else {
    router.back();
  }
};

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
<style></style>
