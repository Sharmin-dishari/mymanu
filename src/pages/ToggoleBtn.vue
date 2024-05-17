<template>
  <label class="switch" @click="$router.push({ name: 'my-all-tickets' })">
    <input type="checkbox" id="togBtn" v-model="togBtn" />
    <div class="slider round">
      <span class="on">Off</span>
      <span class="off">My Tickets</span>
    </div>
  </label>
</template>

<script setup>
import { ref } from "vue";
const togBtn = ref(false);
</script>

<style>
.switch {
  position: relative;
  display: inline-block;
  width: 113px;
  height: 54px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(223, 23, 23);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider.round {
  border-radius: 50px;
}

.slider.round::before {
  position: absolute;
  content: "";
  height: 43px;
  width: 43px;
  left: 5px;
  bottom: 6px;
  border-radius: 50%;
  right: 4px;
  background-color: white;
  background-image: url("compass.png"); /* Specify the path to your icon */
  background-size: 60%;
  background-position: center;
  background-repeat: no-repeat;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
input:checked + .slider {
  background-color: rgb(208, 202, 202);
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(60px);
  -ms-transform: translateX(60px);
  transform: translateX(60px);
}

/*------ ADDED CSS ---------*/

.on {
  display: none;
}

.on,
.off {
  color: white;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50px;
  left: 50%;
  font-weight: 400;
  font-size: 10px;
  font-family: Verdana, sans-serif;
}

.on {
  top: 26px;
  left: 25px;
  font-size: 14px;
}

.off {
  left: 76px;
  right: -5px;
  top: 26px;
  font-size: 11px;
}

input:checked + .slider .on {
  display: block;
}

input:checked + .slider .off {
  display: none;
}
</style>
