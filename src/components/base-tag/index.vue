<template>
  <div
    class="base-tag"
    :class="type ? `base-tag--${type}` : ''">
    <slot>
    </slot>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'default'
  }
})
</script>

<style lang="scss">
.base-tag {
  display: inline-flex;
  padding: 0 6px;
  border-radius: 9px;
  font-size: 10px;
  background: var(--copanel-color-primary-light);
  color: var(--copanel-color-primary);
  
  &--success {
    background: var(--copanel-color-success-light);
    color: var(--copanel-color-success);
  }
}
</style>