import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
export const useCounterStore = defineStore("counter", {
  state: () => ({
    counter: 0,
    pageTitle: "Default Title",
    userAuthInfo: {},
    ticketBookingList: [],
    eventDetails: {},
    currentTicket: {},
    newsDetails: {},
    qrValue: "",
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    handleUserAuthInfo(res) {
      this.userAuthInfo = res;
      LocalStorage.set("userAuthInfo", { accessToken: this.userAuthInfo });
    },
    increment() {
      this.counter++;
    },
    setPageTitle(payload) {
      this.pageTitle = payload;
    },
  },
});
