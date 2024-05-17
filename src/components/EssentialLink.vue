<template>
  <div>
    <q-item class="q-pr-none">
      <div class="q-mt-xl col-grow">
        <div class="row">
          <q-avatar size="40px">
            <img src="/boy.png" />
          </q-avatar>
          <div>
            <div class="q-ml-sm text-bold">
              {{ auth.currentUser?.displayName }}
            </div>
            <div class="q-ml-sm text-caption">
              {{ auth.currentUser?.email }}
            </div>
          </div>
        </div>
        <div
          class="row q-mt-lg q-pa-sm click-event"
          v-for="(item, index) in navLinks"
          :key="index"
          @click="handleNavLink(item)"
        >
          <div>
            <q-icon :name="item.icon" size="25px" />
          </div>
          <div class="q-ml-md" style="font-size: 16px">{{ item.name }}</div>
          <!-- <div class="q-ml-md" style="font-size: 16px">{{ item.caption }}</div> -->
        </div>
        <div class="row q-mt-lg q-pa-sm click-event" @click="handleSignOut">
          <div>
            <q-icon name="login" size="25px" />
          </div>
          <div class="q-ml-md" style="font-size: 16px">Sign Out</div>
        </div>
        <div class="row q-mt-md q-ml-sm">
          <q-toggle
            size="md"
            @update:model-value="handleDarkMode"
            v-model="darkMode"
            val="dark"
            class="q-mt-md"
          />
          <div style="font-size: 16px; padding-top: 24px">Dark mode off</div>
        </div>
      </div>
      <div style="margin-left: -100px">
        <img src="/menuside.png" alt="" style="" />
      </div>
    </q-item>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Dark } from "quasar";
import { signOut } from "firebase/auth";
import { auth } from "src/stores/firebase.js";
import { useRouter } from "vue-router";

defineOptions({
  name: "EssentialLink",
});
const router = useRouter();
const darkMode = ref(false);
const handleDarkMode = () => {
  Dark.toggle();
};
const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      router.push({ name: "sign-index" });
    })
    .catch((error) => {
      alert(error.message);
    });
};
const handleNavLink = (item) => {
  if (item.hash) {
    router.push({ name: `${item.hash}` });
  } else {
    window.location.href = item.link;
  }
};
const navLinks = [
  {
    icon: "person_outline",
    name: "My Profile",
    hash: "settings",
  },
  {
    icon: "maps_ugc",
    name: "Message",
    hash: "chat-index",
  },
  {
    icon: "event",
    name: "Calendar",
    hash: "dashboard",
  },
  {
    icon: "mail_outline",
    name: "Contact Us",
    caption: "support@mymanu.co.uk",
    link: "mailto:support@mymanu.co.uk?subject= Event Query",
  },
  {
    icon: "settings",
    name: "Settings",
    hash: "settings",
  },
  {
    icon: "help_outline",
    name: "Helps & FAQs",
    hash: "settings",
  },
];
</script>
<style>
.click-event-blue:active,
.click-event-blue:focus {
  background-color: #efeded80;
  border-radius: 20px;
  transition: background-color 3s ease;
}
.click-event:hover {
  background-color: #dad7d780;
  border-radius: 20px;
}
</style>
