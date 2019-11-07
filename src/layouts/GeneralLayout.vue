<template>
  <div class="container">
    <div class="content">
      <div 
        class="icon" 
        @click="toggleNotifications" 
        @click.once="runExpirationTime"
      >
        <span class="active-notifications">{{ activeNotifications }}</span>
        <img src="@/assets/images/icons/notification-icon.png" alt="Notification icon."/>
      </div>
      <div v-show-slide="showNotifications" class="notifications-holder">
        <div class="top-holder">
          <h2>notifications</h2>
          <span class="triangle"></span>
        </div>
        <notification
          v-for="notification in notifications"
          :key="notification.id"
          :notification="notification"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Notification from "@/components/Notification";
import notificationsJson from "@/assets/jsonData/notification.json";

export default {
  components: {
    Notification
  },
  data() {
    return {
      showNotifications: false,
      baseUrl: process.env.VUE_APP_BASE_URL,
      notifications: [],
      activeNotifications: 0
    };
  },
  created() {
    this.fetchNotifications();
  },
  methods: {
    countActiveNotifications() {
      this.notifications.forEach(notification => {
        if (notification.type !== "bonus") {
          this.activeNotifications++;
        }
      });
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
    },
    runExpirationTime() {
      this.notifications.forEach(notification => {
        if (notification.expires) {
          setTimeout(() => {
            notification.isShown = false;
            if (notification.type !== "bonus") {
              this.activeNotifications--;
            }
          }, notification.expires);
        }
      });
    },
    fetchNotifications() {
      this.$api
        .get(this.baseUrl + "notifications.json")
        .then(response => {
          for (const index in response.data) {
            let notificationCopy = {
              ...response.data[index],
              isShown: true
            };
            response.data[index] = notificationCopy;
          }
          this.notifications = [...response.data];
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  watch: {
    notifications: {
      handler: "countActiveNotifications",
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  margin-top: 20rem;
  .content {
    width: 25%;
    position: relative;
    .icon {
      position: absolute;
      top: -5rem;
      right: 2.1rem;
      padding: 1rem;
      background-color: $white;
      display: inline-block;
      border-radius: 0.5rem;
      cursor: pointer;
      .active-notifications {
        position: absolute;
        top: -1rem;
        right: -1rem;
        padding: 0.7rem;
        border-radius: 1rem;
        width: auto;
        background: $notification-count-bg;
        height: 0.7rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.4rem;
        color: $white;
      }
      img {
        width: 2rem;
      }
    }
    .notifications-holder {
      background-color: $white;
      border-radius: 0.7rem;
      box-shadow: 11px 15px 20px -15px;
      .top-holder {
        height: 5.7rem;
        position: relative;
        display: flex;
        align-items: flex-end;
        background: $background-color;
        h2 {
          width: 100%;
          text-transform: uppercase;
          padding: 1.5rem 2rem;
          background: $notifications-header-bg;
          color: $white;
          font-size: 1.4rem;
          border-top-right-radius: 0.7rem;
          border-top-left-radius: 0.7rem;
        }
        .triangle {
          position: absolute;
          top: 0.1rem;
          right: 3rem;
          width: 0;
          height: 0;
          border-left: 1.1rem solid transparent;
          border-right: 1.1rem solid transparent;
          border-bottom: 1.2rem solid $notifications-header-bg;
        }
      }
    }
  }
}
</style>