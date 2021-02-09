import React, { useState, useEffect } from 'react'
import Modal from '@/components/Modal'
import WelcomeModalBody from './WelcomeModalBody'
import Button from '@/components/Button'
import {
  LanguagesFormDataQuery,
  useLanguagesFormDataQuery,
  LanguageLevel,
} from '@/generated/graphql'

const welcomeModalKey = 'welcome-modal-july-2020'

const WelcomeModal: React.FC = () => {
  const hasSeenModalBefore =
    typeof window !== 'undefined' ? localStorage.getItem(welcomeModalKey) : false
  const [shouldShow, setShouldShow] = useState(!hasSeenModalBefore)
  const [delayedShow, setDelayedShow] = useState(false)
  const { loading, data, error, refetch } = useLanguagesFormDataQuery()

  const handleClose = () => {
    setShouldShow(false)
    localStorage.setItem(welcomeModalKey, 'seen')
  }

  useEffect(() => {
    const hasChosenLanguages =
      (data?.currentUser?.languages || []).reduce(
        (acc, { level }) => acc | (level === LanguageLevel.Native ? 1 : 2),
        0,
      ) === 3

    // If the user has native and learning languages already, don't show the modal. This also
    // prevents the modal from showing on new devices and browsers which don't have a stored
    // local storage value yet.
    if (shouldShow && !loading && !error && !hasChosenLanguages) {
      setTimeout(() => {
        setDelayedShow(true)
      }, 1000)
    } else {
      setDelayedShow(false)
    }
  }, [shouldShow, loading, error])

  return delayedShow ? (
    <Modal
      title="Welcome to Journaly!"
      body={
        <WelcomeModalBody languageFormData={data as LanguagesFormDataQuery} refetch={refetch} />
      }
      footer={<Button onClick={handleClose}>Done</Button>}
      onClose={handleClose}
    />
  ) : null
}

export default WelcomeModal
