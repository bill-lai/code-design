<template>
  <div :class="className" class="popover">
    <slot></slot>
    <p class="message">{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { popoverProps, placementMap } from './props'
import { withInstall } from '../_util'

export type { PopverProps } from './props'

export default withInstall(defineComponent({
  name: 'CPopver',
  props: popoverProps(),
  setup(props) {
    const position = computed(() => placementMap[props.placement].split('-'))
    const className = computed(() => {
      const [vertical, horizontal] = position.value
      return [
        `vertical-${vertical}`,
        `horizontal-${horizontal}`,
        { show: props.show }
      ]
    })
    const style = computed(() => ({ transformOrigin: position.value.join(' ') }))

    return { className, style }
  }
}))
</script>

<style lang="less" src="./style/style.less"></style>