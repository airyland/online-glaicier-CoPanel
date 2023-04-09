<template>
  <div
    class="copanel-plugin-store">
    <base-header
      title="Plugins"
      @back="$emit('hide-plugin-store')">
      <template
        #right>
        <base-button
          icon="ri-add-line"
          size="small">
        </base-button>
      </template>
    </base-header>
    
    <div
      class="copanel-plugin-store__body">
      <base-tabs
        v-model="activeTab"
        :tabs="tabs">
        <base-tab-pane
          value="store">
          <copanel-plugin-item
            v-for="item in plugins"
            :key="item.id"
            :data="item">
          </copanel-plugin-item>
        </base-tab-pane>
        
        <base-tab-pane
          value="installed">
          <copanel-plugin-item-lite
            :data="coPanel"
            @update_enabled="updateEnabled">
          </copanel-plugin-item-lite>
          
          <copanel-plugin-item-lite
            v-for="item in installedPlugins"
            :key="item.id"
            :data="item"
            @update_enabled="updateEnabled">
          </copanel-plugin-item-lite>
        </base-tab-pane>
      </base-tabs>
    </div>
  </div>
</template>

<script setup>
import{ ref, reactive, onMounted, inject, watch } from 'vue'
import BaseButton from '../base-button'
import BaseHeader from '../base-header'
import BaseTabs from '../base-tabs'
import BaseTabPane from '../base-tab-pane'
import CopanelPluginItem from '../copanel-plugin-item'
import CopanelPluginItemLite from '../copanel-plugin-item-lite'

watch(inject('pluginStoreVisible'), async (val) => {
  if (val) {
    await getPlugins() 
  }
})

const activeTab = ref('store')
const tabs = [{
  label: 'Plugins Store',
  value: 'store'
}, {
  label: 'Installed Plugins',
  value: 'installed'
}]

const coPanel = {
  id: '1',
  name: 'CoPanel built-in',
  desc: 'Translate, Summarize, Polishing',
  used_by: '8',
  created_by: 'CoPanel',
  is_dev: false,
  is_enabled: true,
  is_installed: true
}

const updateEnabled = function (data, value) {
  installedPlugins.forEach(async one => {
    if (one.name === data.name) {
      one.enabled = value
      one.is_enabled = value
    }
    await chrome.storage.local.set({
      plugins: JSON.stringify(installedPlugins)
    })
  })
}

const plugins = reactive([coPanel, {
  id: 'midjourney',
  name: 'Midjourney',
  is_dev: true,
  price: '$5.88/mo',
  created_by: 'Airyland',
  desc: 'Create images with Midjourney',
  used_by: '--'
}])

const installedPlugins = reactive([])

async function getPlugins () {
  installedPlugins.length = 0
  // installedPlugins.push(coPanel)
  try {
    const rs = await chrome.storage.local.get(['plugins'])
    if (rs.plugins) {
      try {
        const list = JSON.parse(rs.plugins)
        for (const one of list) {
          console.log('local plugin', one)
          installedPlugins.push({
            ...one,
            is_dev: true,
            is_enabled: one.enabled
          })
        }
      } catch (e) {console.log(e)}
    }
  } catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  getPlugins()
})
</script>

<style lang="scss">
.copanel-plugin-store {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  &__body {
    flex: 1;
    overflow: hidden;
  }
}
</style>