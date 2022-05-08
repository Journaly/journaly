import React, { useEffect } from 'react'
import modalConstants from './modalConstants'
import theme from '@/theme'

interface Props {
  title: React.ReactNode
  ariaLabelledBy?: string
  children: React.ReactNode
  onScroll: (event: Event) => void
}

const ModalBody: React.FC<Props> = (props) => {
  const { title, ariaLabelledBy, children, onScroll } = props

  const handleScroll = (event: Event): void => {
    onScroll(event)
  }

  useEffect(() => {
    const modalBody = document.getElementById('modal-body') as HTMLDivElement
    modalBody.addEventListener('scroll', handleScroll)

    return () => modalBody.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div id="modal-body">
      <h1 id={ariaLabelledBy}>{title}</h1>

      {children}

      <style jsx>{`
        #modal-body {
          flex-grow: 1;
          max-height: 100vh;
          padding: 0 24px 48px;
          overflow: auto;
        }
        @media (min-width: ${modalConstants.modalBreakpoint}) {
          #modal-body {
            padding: 0 64px 64px;
          }
        }

        h1 {
          margin-bottom: 16px;
          ${theme.typography.fontFamilySansSerif};
          font-size: 24px;
          text-align: center;
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}

export default ModalBody
