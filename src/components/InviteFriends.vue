<template>
  <q-card>
    <q-card-section style="flex: 1; overflow-y: auto">
      <div style="height: 700px">
        <div class="text-h6">Invite Friends</div>
        <div>
          <q-input
            dark
            rounded
            outlined
            label="Search"
            v-model="text"
            class="q-my-md"
          >
            <template v-slot:append>
              <q-icon name="search " />
            </template>
          </q-input>
        </div>
        <div style="height: 700px">
          <div v-for="(item, index) in 20" :key="index">
            <div class="row justify-between">
              <div class="q-ml-md row q-ma-md">
                <div>
                  <q-avatar size="42px">
                    <img src="/boy.png" />
                  </q-avatar>
                </div>
                <div class="q-ml-sm">
                  <div class="text-bold">Cameroon</div>
                  <div class="text-caption">Paris, FR</div>
                </div>
              </div>
              <div class="q-mt-md">
                <q-checkbox
                  v-model="inviteFrnd"
                  checked-icon="check_circle_outline"
                  unchecked-icon="radio_button_unchecked"
                  indeterminate-icon="help"
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-actions align="center">
      <q-btn class="book-btn" rounded>
        <div class="row text-white">
          <div class="q-mt-xs text-bold">Invite</div>
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
    </q-card-actions>
  </q-card>
  <q-card class="q-pa-sm"> </q-card>
</template>

<script setup>
import { ref } from "vue";
const text = ref("");
const inviteFrnd = ref(false);
</script>

<style>
.btnPosition {
  position: absolute;
  top: 450;
}
.book-btn {
  width: 295px;
  height: 50.14px;
  background: rgb(211, 15, 15);
}
</style>
