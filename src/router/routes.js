const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/my-ticket",
        name: "my-ticket",
        component: () => import("pages/TicketDetails.vue"),
        meta: {
          requiresAuth: false,
          isBack: true,
        },
      },
      {
        path: "/book-ticket",
        name: "book-ticket",
        component: () => import("pages/BookTicket.vue"),
        meta: {
          requiresAuth: false,
          isBack: true,
        },
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("pages/ListView.vue"),
        meta: {
          requiresAuth: false,
          isBack: false,
        },
      },
      {
        path: "event-details",
        name: "event-details",
        component: () => import("pages/EventDetails.vue"),
        meta: {
          requiresAuth: false,
          isBack: true,
        },
      },
      {
        path: "news-feed",
        name: "news-feed",
        component: () => import("pages/NewsFeed.vue"),
        meta: {
          requiresAuth: false,
          isBack: true,
        },
      },
      {
        path: "news-details",
        name: "news-details",
        component: () => import("pages/NewsDetails.vue"),
        meta: {
          requiresAuth: false,
          isBack: true,
        },
      },
      {
        path: "/my-all-tickets",
        name: "my-all-tickets",
        component: () => import("pages/MyTicket.vue"),
        meta: {
          requiresAuth: false,
          isBack: false,
        },
      },
    ],
  },
  {
    path: "",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "/on-board",
        name: "on-board",
        component: () => import("pages/OnboardIndex.vue"),
        meta: {
          requiresAuth: false,
          isBack: false,
        },
      },
      {
        path: "",
        name: "sign-index",
        component: () => import("pages/SignIndex.vue"),
        meta: {
          requiresAuth: false,
          isBack: false,
        },
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () => import("pages/SignUp.vue"),
        meta: {
          requiresAuth: false,
          isBack: false,
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
