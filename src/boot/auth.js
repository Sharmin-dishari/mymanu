import { boot } from "quasar/wrappers";
import { useCounterStore } from "../stores/example-store";

export default boot(({ router }) => {
  if (!router) {
    console.error("Router is not available.");
    return;
  }

  router.afterEach((to, from) => {
    console.log("Navigated to:", to.fullPath, "from=", from);
    const commonStore = useCounterStore();
    if (commonStore) {
      commonStore.setPageTitle(to.meta.title);
    } else {
      console.error("Counter store is not available.");
    }
  });
});
