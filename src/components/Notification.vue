<template>
  <div 
    :class="{'p0': !notification.isShown}" 
    class="notification" 
    v-show-slide="notification.isShown"
  >
    <div class="level">
      <span>{{ notification.title }}</span>
      <span v-if="checkProperty">{{ checkProperty }}</span>
      <a 
        v-else 
        target="_blank" 
        :href="notification.link"
        >
        {{ notification.link }}
      </a>
    </div>
    <div 
      :class="{'spaced-between' : notification.image}" 
      class="type"
    >
      <img 
        v-if="notification.image" 
        :src="notification.image" 
        alt="Icon image."
      >
      <span>
        <span>type:</span>
        {{ notification.type }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object
    }
  },
  computed: {
    checkProperty () {
      return this.notification.text || this.notification.requirement
    }
  }
};
</script>

<style lang="scss" scoped>
.notification {
  padding: 2rem 1rem 1rem;
  position: relative;
	transition: all 1s ease;
	&.p0 {
		padding: 0 1rem;
		opacity: 0;
	}
  &:before {
    content: "";
    display: block;

    position: absolute;
    bottom: 0;
    left: 1rem;
    right: 1rem;
    height: 0.1rem;
    background-color: $background-color;
  }
  &:last-of-type {
    &:before {
      display: none;
    }
  }
  .level {
    display: flex;
    justify-content: space-between;
  }
  .type {
    margin-top: 1.5rem;
    text-align: right;
    &.spaced-between {
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 3rem;
      }
    }
    span {
      font-weight: 300;
      span {
        font-weight: 500;
      }
    }
  }
  span, a {
    font-size: 1.3rem;
  }
}
</style>