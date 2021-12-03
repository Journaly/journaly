import React, { useEffect } from 'react'
import { findEventTargetParent, isChildOf } from '@/utils'

const useOnClickOut = (containerRef: React.RefObject<HTMLElement>, onClickOut: () => void) => {
  useEffect(() => {
    const onDocumentMouseDown = (e: MouseEvent) => {
      if (!e.target || !containerRef.current || isChildOf(e.target as Node, containerRef.current)) {
        return
      }

      // Mouse/touch events in modals shouldn't close the thread popover
      if (findEventTargetParent(e, (el) => el.id === 'modal-root')) {
        return
      }

      onClickOut()
    }

    document.addEventListener('mousedown', onDocumentMouseDown)

    return () => {
      document.removeEventListener('mousedown', onDocumentMouseDown)
    }
  }, [containerRef, onClickOut])
}

export default useOnClickOut
