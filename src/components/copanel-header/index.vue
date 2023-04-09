<template>
  <base-header
    class="copanel-header">
    <h1
      class="copanel-header__title">
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_106_339)">
        <path d="M16.3333 3.33325H18.6666L15.6666 7.66659V4.66659H13.3333L16.3333 0.333252V3.33325Z" fill="#7F56D9"/>
        </g>
        <ellipse cx="16" cy="20" rx="16" ry="12" fill="#7F56D9"/>
        <rect x="4" y="12" width="24" height="12" rx="6" fill="white"/>
        <circle cx="11.2" cy="17.9999" r="1.6" fill="#7F56D9"/>
        <circle cx="20.8" cy="17.9999" r="1.6" fill="#7F56D9"/>
        <defs>
        <clipPath id="clip0_106_339">
        <rect width="8" height="8" fill="white" transform="translate(12)"/>
        </clipPath>
        </defs>
      </svg>

      <span
        class="copanel-header__site-name">
        CoPanel
      </span>
    </h1>
    
    <template
      #right>
      <base-button
        class="copanel-header__control-button"
        icon="ri-apps-line"
        size="small"
        type="text"
        @click="$emit('show-plugin-store')">
      </base-button>
      
      <base-button
        class="copanel-header__control-button"
        icon="ri-close-line"
        size="small"
        type="text"
        @click="$emit('hide-widget')">
      </base-button>
    </template>
  </base-header>
</template>

<script setup>
import { defineEmits } from 'vue';
import BaseHeader from '../base-header'
import BaseButton from '../base-button'

const emits = defineEmits([
  'hide-widget',
  'show-plugin-store'
])
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');

.copanel-header {
  &__title {
    display: flex;
    align-items: center;
    margin-bottom: 0;
  }
  
  &__site-name {
    margin-left: 8px;
    font-size: 18px;
    font-weight: 400;
    line-height: 1;
    font-family: 'Kanit', sans-serif !important;
  }
  
  &__control-button {
    &:hover {
      background: var(--copanel-color-primary-light);
      color: var(--copanel-color-primary);
    }
    
    .base-button__icon {
      font-size: 16px;
    }
  }
}
</style>