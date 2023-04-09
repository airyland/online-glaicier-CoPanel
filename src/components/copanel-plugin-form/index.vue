<template>
  <el-form
    class="copanel-plugin-form"
    label-position="top"
    :model="form"
    :show-message="false"
    @submit.native.prevent>
    <el-form-item
      v-for="item in fields"
      :key="item.prop"
      :label="item.label"
      :prop="item.prop"
      :required="item.required">
      <el-input
        v-if="item.type === 'textarea'"
        v-model="form[item.prop]"
        :placeholder="item.placeholder"
        resize="none"
        :rows="2"
        type="textarea">
      </el-input>
      
      <el-input
        v-else
        v-model="form[item.prop]"
        :placeholder="item.placeholder">
      </el-input>
    </el-form-item>
    
    <div
      class="copanel-plugin-form__footer">
      <base-button
        size="small"
        @click="$emit('cancel')">
        Cancel
      </base-button>
      
      <base-button
        :disabled="!form.name"
        size="small"
        type="primary"
        @click="emitForm">
        Save
      </base-button>
    </div>
  </el-form>
</template>

<script setup>
import { defineEmits, reactive } from 'vue'
import { ElForm, ElFormItem, ElInput } from 'element-plus'
import BaseButton from '../base-button'

const emits = defineEmits([
  'cancel',
  'save'
])

const form = reactive({
  name: 'AI beats',
  desc: 'A test plugin',
  match: document.location.href
})

const fields = [{
  label: 'Name',
  prop: 'name',
  required: true
}, {
  label: 'Description',
  prop: 'desc',
  type: 'textarea'
}, {
  label: 'URL Match',
  prop: 'match',
  placeholder: 'Exec the plugin on which page(s)?'
}]

const emitForm = () => {
  emits('save', {
    ...form
  })
}
</script>

<style lang="scss">
.copanel-plugin-form {
  .el-form-item {
    margin-bottom: 8px;
    
    &__label {
      margin-bottom: 4px !important;
      font-size: 12px;
      color: var(--copanel-text-color-secondary);
    }
  }
  
  .el-input__wrapper,
  .el-textarea__inner {
    border-radius: 8px;
    font-size: 12px;
  }
  
  &__footer {
    display: flex;
    margin: 16px 0 8px;
    
    .el-form-item__content {
      justify-content: flex-end;
    }
    
    .base-button {
      height: 32px;
      flex: 1;
    }
  }
}
</style>