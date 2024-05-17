<template>
  <q-page>
    <q-form @submit="onSubmit">
      <q-card-section class="q-pb-none q-px-md">
        <div>
          <q-input
            v-model="form.AttendeeName"
            class="itc-input required q-mb-sm"
            stack-label
            outlined
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type your full name',
            ]"
            label="Enter your name *"
          >
            <template #prepend> <q-icon name="lock" /></template>
          </q-input>
          <q-input
            v-model="form.Personemail"
            class="itc-input required q-mb-sm"
            stack-label
            outlined
            label="Enter your email *"
            type="email"
            :rules="[
              (val) => !!val || 'Email is required',
              (val) => validateEmail(val) || 'Type a valid Email',
            ]"
            clearable
            clear-icon="close"
          >
            <template #prepend> <q-icon name="email" /></template>
          </q-input>
          <q-select
            v-model="form.Gender"
            class="itc-input required q-mb-lg"
            stack-label
            outlined
            label="Gender"
            :options="['Male', 'Female', 'Other']"
          >
            <template #prepend> <q-icon name="people" /></template>
          </q-select>
          <q-input
            v-model="form.PhoneNumber"
            class="itc-input required q-mb-sm"
            stack-label
            outlined
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Please type your contact number',
            ]"
            label="Contact Number"
          >
            <template #prepend> <q-icon name="call" /></template>
          </q-input>
          <q-input
            v-model="form.Dietpreference"
            class="itc-input required q-mb-lg"
            stack-label
            outlined
            label="Don you have any diet preference?"
            :type="isPwd ? 'password' : 'text'"
          >
            <template #prepend><q-icon name="coffee" /></template>
          </q-input>
          <q-input
            v-model="form.AccompaniedBy"
            class="itc-input required"
            stack-label
            outlined
            :rules="[
              (val) =>
                val < 5 || 'Maximum of 4 people can be accompanied with.',
            ]"
            label="How many accompanying with you? *"
          >
            <template #prepend><q-icon name="groups" /></template>
          </q-input>
        </div>
      </q-card-section>
      <q-card-section class="q-py-none q-py-none">
        <q-item class="row q-pa-none">
          <q-toggle
            size="md"
            @update:model-value="isAgree = !isAgree"
            v-model="isAgree"
            val="dark"
          />
          <div>I agree & consent to receiving update about the event</div>
        </q-item>
      </q-card-section>
      <q-card-actions class="q-pt-none" align="center">
        <div class="text-center q-py-md">
          <q-btn class="book-btn" rounded type="submit">
            <div class="row text-white">
              <div class="q-mt-xs text-bold">Book A Ticket</div>
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
    </q-form>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useCounterStore } from "../stores/example-store";
import { db, collection } from "src/stores/firebase.js";
import { addDoc } from "firebase/firestore";
const commonStore = useCounterStore();
const $q = useQuasar();
import { useRouter } from "vue-router";
const isAgree = ref(false);
const form = ref({
  AttendeeName: "",
  Personemail: "",
  Gender: "",
  Dietpreference: "",
  PhoneNumber: "",
  AccompaniedBy: "",
  EventId: "",
  EventTitle: "",
});
onMounted(() => {
  commonStore.pageTitle = "Book Ticket";
  form.value.EventId = commonStore.eventDetails.id;
  form.value.EventTitle = commonStore.eventDetails.eventTitle;
});
const emailValidationRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validateEmail = (val) => {
  return emailValidationRegex.test(val);
};
const onSubmit = () => {
  let AttendeeName = form.value.AttendeeName;
  if (isAgree.value !== true) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "Please accept the terms first.",
    });
  } else {
    const EventsDocRef = collection(db, "booking");
    addDoc(EventsDocRef, form.value)
      .then((result) => {
        if (result._key.path != null && result._key.path != undefined) {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: `Ticket booked successfully for event: ${commonStore.eventDetails.eventTitle}`,
          });

          isAgree.value = false;
          const form = ref({
            AttendeeName: "",
            Personemail: "",
            Gender: "",
            Dietpreference: "",
            PhoneNumber: "",
            AccompaniedBy: "",
            EventId: "",
            EventTitle: "",
          });
          commonStore.currentTicket = result?._key.path?.segments[1];
          commonStore.qrValue =
            result._key.path.segments[1] +
            "@" +
            AttendeeName +
            "@" +
            commonStore.eventDetails.eventTitle +
            "@" +
            commonStore.eventDetails.id;
          router.push({ name: "my-ticket" });
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
};
const router = useRouter();
const handleLogin = () => {
  router.push({ name: "my-ticket" });
};
</script>

<style>
.book-btn {
  width: 295px;
  height: 50.14px;
  background: rgb(211, 15, 15);
}
</style>
