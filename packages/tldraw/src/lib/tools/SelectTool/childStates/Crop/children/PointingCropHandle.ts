import { StateNode, TLEventHandlers, TLImageShape, TLPointerEventInfo } from '@tldraw/editor'
import { CursorTypeMap } from '../../PointingResizeHandle'

type TLPointingCropHandleInfo = TLPointerEventInfo & {
	target: 'selection'
}

export class PointingCropHandle extends StateNode {
	static override id = 'pointing_crop_handle'

	private info = {} as TLPointingCropHandleInfo

	override onEnter = (info: TLPointingCropHandleInfo) => {
		this.info = info
		const cursorType = CursorTypeMap[this.info.handle!]
		this.editor.setCursor({
			type: cursorType,
			rotation: this.editor.getSelectionRotation(),
		})
	}

	override onExit = () => {
		this.editor.setCursor({ type: 'default', rotation: 0 })
	}

	override onPointerMove: TLEventHandlers['onPointerMove'] = () => {
		const isDragging = this.editor.inputs.isDragging

		if (isDragging) {
			this.parent.transition('cropping', {
				shape: this.editor.getOnlySelectedShape() as TLImageShape,
				handle: this.info.handle,
			})
		}
	}

	override onPointerUp: TLEventHandlers['onPointerUp'] = () => {
		this.parent.transition('idle')
	}

	override onCancel: TLEventHandlers['onCancel'] = () => {
		this.cancel()
	}

	override onComplete: TLEventHandlers['onComplete'] = () => {
		this.cancel()
	}

	override onInterrupt = () => {
		this.cancel()
	}

	private cancel() {
		this.parent.transition('idle')
	}
}
