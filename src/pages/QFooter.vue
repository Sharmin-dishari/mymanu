<template>
  <div
    class="foot-btn row flex-center justify-around"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-2'"
  >
    <!--  <div
      class="mid-btn row flex-center"
      :style="
        $q.dark.isActive
          ? 'background: #96969640'
          : 'background: rgb(228, 226, 226);'
      "
    >
       <q-btn
        round
        unelevated
        dense
        icon="search"
        :style="$q.dark.isActive ? 'background: #1d2531' : 'background: white'"
        class="q-ml-sm"
        size="18px"
      />
      <q-btn
        round
        unelevated
        dense
        icon="event"
        :style="$q.dark.isActive ? 'background: #1d2531' : 'background: white'"
        class="q-mx-md"
        size="18px"
      />
      <q-btn
        round
        class="q-mr-sm"
        unelevated
        dense
        icon="location_on"
        :style="$q.dark.isActive ? 'background: #1d2531' : 'background: white'"
        size="18px"
      /> 
    </div>-->
    <div
      class="person-icon row flex-center"
      :style="
        $q.dark.isActive
          ? 'background: #96969640'
          : 'background: rgb(228, 226, 226)'
      "
    >
      <q-avatar class="q-pa-none q-ma-none">
        <q-icon
          name="dashboard"
          size="30px"
          @click="$router.push({ name: 'dashboard' })"
          :class="$q.dark.isActive ? 'text-white' : 'text-black'"
        />
      </q-avatar>
    </div>
    <ToggoleBtn />
  </div>
</template>

<script setup>
import ToggoleBtn from "./ToggoleBtn.vue";
</script>

<style>
.foot-btn {
  height: 71px;
  border-radius: 90px;
  opacity: 0px;
}
.mid-btn {
  border-radius: 90px;
  height: 54px;
}
.person-icon {
  width: 54px;
  height: 54px;
  border-radius: 90px;
  /* opacity: 0px; */
  /* background: rgb(228, 226, 226); */
}
</style>
