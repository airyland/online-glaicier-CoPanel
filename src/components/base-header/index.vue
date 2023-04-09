<template>
  <header
    class="base-header">
    <div
      class="base-header__left">
      <slot>
        <base-button
          class="base-header__back-button"
          icon="ri-arrow-left-line"
          size="small"
          type="text"
          @click="$emit('back')">
        </base-button>
        
        <h1
          class="base-header__title">
          {{ title }}
        </h1>
      </slot>
    </div>
    
    <div
      class="base-header__right">
      <slot
        name="right">
      </slot>
    </div>
  </header>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import BaseButton from '../base-button'

const props = defineProps({
  title: {
    type: String
  }
})

const emits = defineEmits([
  'back'
])
</script>

<style lang="scss">
.base-header {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 0 16px;
  border-bottom: 1px solid var(--copanel-border-color-dark);
  background: white;
  
  &__left {
    flex: 1;
    display: flex;
    align-items: center;
  }
  
  &__back-button {
    margin-right: 8px;
    
    &:hover {
      background: var(--copanel-color-primary-light);
      color: var(--copanel-color-primary);
    }
    
    .base-button__icon {
      font-size: 18px;
    }
  }
  
  &__title {
    margin-bottom: 0;
    font-size: 16px;
    font-weight: 500;
    line-height: 1;
  }
  
  &__right {
    display: flex;
    align-items: center;
  }
}
</style>