<template>
  <div
    class="base-menu-item">
    <i
      class="base-menu-item__icon"
      :class="icon"
      v-if="icon">
    </i>
    
    <span
      class="base-menu-item__label">
      <slot>
      </slot>
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String
  }
})
</script>

<style lang="scss">
.base-menu-item {
  display: flex;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 12px;
  cursor: pointer;
  transition: all .3s ease;
  
  &:hover {
    background: var(--copanel-bg-color-light);
  }
  
  &__label {
    
  }
}
</style>