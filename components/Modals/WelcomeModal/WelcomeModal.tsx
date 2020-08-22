import React, { useState, useEffect } from 'react'
import { LanguagesFormDataQuery, useLanguagesFormDataQuery } from '@generated'
import Button from '@elements/Button'
import Modal from '@components/Modal'
import WelcomeModalBody from './WelcomeModalBody'

type Props = {
  show: boolean
  onClose: () => void
}

const WelcomeModal: React.FC<Props> = ({ show, onClose }) => {
  const [delayedShow, setDelayedShow] = useState(false)
  const { loading, data, error, refetch } = useLanguagesFormDataQuery()

  useEffect(() => {
    if (show && !loading && !error) {
      setTimeout(() => {
        setDelayedShow(true)
      }, 1000)
    } else {
      setDelayedShow(false)
    }
  }, [show, loading, error])

  return delayedShow ? (
    <Modal
      title="Welcome to Journaly!"
      body={
        <WelcomeModalBody languageFormData={data as LanguagesFormDataQuery} refetch={refetch} />
      }
      footer={<Button onClick={onClose}>Done</Button>}
      onClose={onClose}
    />
  ) : null
}

export default WelcomeModal
