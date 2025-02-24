<template>
  <q-page>
    <div class="row flex-center q-pt-lg">
      <q-avatar size="80px">
        <q-img src="/logo1.png" />
      </q-avatar>
    </div>
    <div class="row flex-center text-h4">Mymanu Events</div>
    <div
      class="q-pa-md text-h6"
      :class="$q.screen.gt.sm ? 'row flex-center' : ''"
    >
      Sign In
    </div>
    <q-form @submit="handleLogin" style="max-width: 450px; margin: 0 auto">
      <q-card-section class="q-py-none">
        <div>
          <q-input
            v-model="form.email"
            class="itc-input required q-mb-sm"
            stack-label
            outlined
            placeholder="Enter your email"
            type="email"
            clearable
            clear-icon="close"
            :rules="[
              (val) => !!val || 'Email is required',
              (val) => validateEmail(val) || 'Type a valid Email',
            ]"
          >
            <template #prepend> <q-icon name="email" /></template>
          </q-input>
          <q-input
            v-model="form.password"
            class="itc-input required"
            stack-label
            outlined
            placeholder="Enter your password"
            :type="isPwd ? 'password' : 'text'"
            :rules="[
              (val) => !!val || 'Password is required',
              (val) => val.length >= 6 || 'Minimum 6 characters required',
            ]"
          >
            <template #prepend> <q-icon name="lock" /></template>
            <template #append>
              <q-icon
                :name="isPwd ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>
      </q-card-section>
      <q-card-section class="q-py-none">
        <div class="row justify-between">
          <div class="row">
            <q-toggle
              size="md"
              @update:model-value="darkMode = !darkMode"
              v-model="darkMode"
              val="dark"
            />
            <div class="q-mt-sm">Remember Me</div>
          </div>
          <div class="q-mt-sm cursor-pointer" @click="showModal = true">
            Forgot Password
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="q-pt-none" align="center">
        <div class="text-center q-py-md">
          <q-btn class="book-btn" rounded type="submit">
            <div class="row text-white">
              <div class="q-mt-xs text-bold">Sign In</div>
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
    <div class="bg-color" style="max-width: 450px; margin: 0 auto">
      <q-card-section class="q-mx-lg q-py-none">
        <div class="text-center q-mb-lg">OR</div>
        <div class="q-pa-none">
          <q-btn
            unelevated
            no-caps
            outline
            @click="signInWithGoogle"
            class="full-width q-py-md"
          >
            <q-icon left size="2em" name="img:/google.png" />
            <div class="placeholder">Sign in with Google</div>
          </q-btn>
        </div>
        <!-- <div class="q-pa-none q-mt-md">
          <q-btn
            unelevated
            no-caps
            outline
            @click="signInWithFacebook"
            class="full-width q-py-md"
          >
            <q-icon left size="2em" name="img:/facebook.png" />
            <div class="placeholder">Sign in with Facebook</div>
          </q-btn>
        </div> -->
      </q-card-section>
      <div
        class="text-caption text-center q-py-md cursor-pointer"
        @click="$router.push({ name: 'sign-up' })"
      >
        Don't have an account?
        <span class="text-primary q-ml-sm">Sign up</span>
      </div>
    </div>
    <q-dialog v-model="showModal" persistent>
      <q-card>
        <q-form
          @submit="handleForgotPassword"
          style="max-width: 450px; margin: 0 auto"
        >
          <q-card-section class="q-pb-none q-mt-lg">
            <div>
              <q-input
                v-model="userEmail"
                class="itc-input required q-mb-sm"
                stack-label
                outlined
                placeholder="Enter your email"
                type="email"
                clearable
                clear-icon="close"
                :rules="[
                  (val) => !!val || 'Email is required',
                  (val) => validateEmail(val) || 'Type a valid Email',
                ]"
              >
                <template #prepend> <q-icon name="email" /></template>
              </q-input>
            </div>
          </q-card-section>
          <q-card-actions class="q-p-none" align="center">
            <div class="text-center q-py-md q-mx-xl">
              <q-btn class="book-btn" rounded type="submit">
                <div class="row text-white">
                  <div class="q-mt-xs text-bold">Submit</div>
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
      </q-card>
    </q-dialog>
    <!-- <div class="text-center text-bold">Logged in as {{ myinfo }}</div> -->
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCounterStore } from "../stores/example-store";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { auth } from "src/stores/firebase.js";
import { useQuasar } from "quasar";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
  FacebookAuthProvider,
  signInWithRedirect,
  signInWithCredential,
} from "firebase/auth";
const darkMode = ref(false);
const $q = useQuasar();
const showModal = ref(false);
const commonStore = useCounterStore();
const isPwd = ref(true);
const rememberPass = ref(false);
const form = ref({
  email: null,
  password: null,
});
const userEmail = ref(null);
const myinfo = ref(null);
const signInWithFacebook = async () => {
  const result = await FirebaseAuthentication.signInWithFacebook();
  myinfo.value = result;
  return result.user;
};
const handleForgotPassword = () => {
  let email = userEmail.value;
  sendPasswordResetEmail(auth, email)
    .then(() => {
      showModal.value = false;
      alert("Password reset email sent");
    })
    .catch((err) => {
      alert(err.message);
    });
};
const handleLogin = () => {
  console.log("Alamin Debugging: handleLogin called");
  let email = form.value.email;
  let password = form.value.password;
  signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      if (
        res != null &&
        res != undefined &&
        res.user.uid != null &&
        res.user.uid != undefined
      )
        commonStore.userAuthInfo = {
          accessToken: auth.currentUser.accessToken,
        };
      commonStore.handleUserAuthInfo(auth.currentUser.accessToken);
      router.push({ name: "dashboard" });
      $q.notify({
        color: "green",
        textColor: "white",
        icon: "emoji_emotions",
        message: "Logged in sucsessfully",
      });
    })
    .catch((err) => {
      alert(err.message);
    });
  onAuthStateChanged(auth, (currentUser) => {
    let user = currentUser.email;
    console.log(user, "user saved");
  });
};
const signInWithGoogle = async () => {
  const result = await FirebaseAuthentication.signInWithGoogle();
  console.log("google login result: ", result);
  const credential = GoogleAuthProvider.credential(result.credential?.idToken);
  console.log("google login credentials: ", credential);
  const auth = getAuth();
  console.log("google login auth: ", auth);

  // router.push({ name: "dashboard" });

  commonStore.userAuthInfo = {
    accessToken: result.credential,
  };
  commonStore.handleUserAuthInfo(result.credential);
  myinfo.value = result.user;
  router.push({ name: "dashboard" });
  $q.notify({
    color: "green",
    textColor: "white",
    icon: "emoji_emotions",
    message: "Logged in sucsessfully",
  });
  // await signInWithCredential(auth, credential).then(() => {

  // });
};
const router = useRouter();

const emailValidationRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validateEmail = (val) => {
  return emailValidationRegex.test(val);
};
</script>

<style>
.book-btn {
  width: 295px;
  height: 50.14px;
  background: rgb(211, 15, 15);
}
</style>
src/stores/firebase.js
