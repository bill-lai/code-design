import type { PropType, ExtractPropTypes } from 'vue'

export type PopoverPlacement = 
| 'top'
| 'left'
| 'right'
| 'bottom'
| 'topLeft'
| 'topRight'
| 'bottomLeft'
| 'bottomRight'
| 'leftTop'
| 'leftBottom'
| 'rightTop'
| 'rightBottom';

export const placementMap = {
  top: "top-center",
  left: "center-left",
  right: "center-right",
  bottom: "bottom-center",
  topLeft: "top-left",
  topRight: "top-right",
  bottomLeft: "bottom-left",
  bottomRight: "bottom-right",
  leftTop: "top-left",
  leftBottom: "bottom-left",
  rightTop: "top-right",
  rightBottom: "bottom-right",
}

export const popoverProps = () => ({
  show: { type: Boolean, default: false },
  message: { type: String },
  placement: { type: String as PropType<PopoverPlacement>, default: 'bottom' }
})

export type PopverProps = ExtractPropTypes<ReturnType<typeof popoverProps>>