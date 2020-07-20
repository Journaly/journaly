import React, { useState, useEffect } from 'react'
import Modal from '../../components/Modal'

type Props = {
  show: boolean
  onClose: () => void
}

const WelcomeModal: React.FC<Props> = ({ show, onClose }) => {
  const [delayedShow, setDelayedShow] = useState(false)

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setDelayedShow(true)
      }, 3000)
    } else {
      setDelayedShow(false)
    }
  }, [show])

  return delayedShow ? (
    <Modal title="Welcome to Journaly!" body={<div>Welcome, yo!</div>} onClose={onClose} />
  ) : null
}

export default WelcomeModal
