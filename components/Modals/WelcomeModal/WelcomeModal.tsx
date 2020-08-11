import React, { useState, useEffect } from 'react'
import Modal from '../../../components/Modal'
import WelcomeModalBody from './WelcomeModalBody'
import Button from '../../../elements/Button'

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
      }, 1000)
    } else {
      setDelayedShow(false)
    }
  }, [show])

  return delayedShow ? (
    <Modal
      title="Welcome to Journaly!"
      body={<WelcomeModalBody />}
      footer={<Button onClick={onClose}>Done</Button>}
      onClose={onClose}
    />
  ) : null
}

export default WelcomeModal
