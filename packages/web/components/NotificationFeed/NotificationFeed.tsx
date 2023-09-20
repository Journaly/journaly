import React, { useState, useRef, useCallback, useEffect } from 'react'
import {
  CurrentUserDocument,
  CurrentUserQuery,
  CurrentUserQueryVariables,
  NotificationFragmentFragmentDoc as NotificationFragmentDoc,
  NotificationFragmentFragment as NotificationType,
  NotificationReadStatus,
  useDeleteInAppNotificationMutation,
  useUpdateInAppNotificationMutation,
} from '@/generated/graphql'
import NotificationLevelOne from './NotificationLevelOne'
import theme from '@/theme'
import BackArrowIcon from '../Icons/BackArrowIcon'
import Button, { ButtonVariant } from '../Button'
import GenericErrorBoundary from '@/components/GenericErrorBoundary'
import XIcon from '../Icons/XIcon'
import { useNotificationContext } from './NotificationContext'
import NotificationLevelTwo from './NotificationLevelTwo'
import { useTranslation } from '@/config/i18n'
import useOnClickOut from '@/hooks/useOnClickOut'
import { findEventTargetParent } from '@/utils'

type NotificationFeedProps = {
  onClose: () => void
  dataTestId?: string
}

type FallbackProps = {
  notificationId: number
}

const FallbackComponent = ({ notificationId }: FallbackProps) => (
  <div className="error-container">
    <span>
      Could not render notification with id {notificationId}. Please contact
      support
    </span>
    <style jsx>{`
      .error-container {
        padding: 16px;
        border-bottom: 1px solid #757575;
        background-color: rgba(255, 0, 0, 0.3);
      }
    `}</style>
  </div>
)

const NotificationFeed: React.FC<NotificationFeedProps> = ({ onClose }) => {
  const { t } = useTranslation('common')
  const [notificationLevelTranslation, setNotificationLevelTranslation] = useState(0)
  const [activeNotification, setActiveNotification] = useState<NotificationType | null>(null)

  // Close notification feed if user clicks out of it
  const feedContainerRef = useRef<HTMLDivElement>(null)

  const onClickOut = useCallback(
    (e: MouseEvent) => {
      if (findEventTargetParent(e, (el) => el.id === 'notification-feed')) {
        return
      } else {
        onClose()
      }
    },
    [onClose],
  )

  useOnClickOut(feedContainerRef, onClickOut)

  const { notifications } = useNotificationContext() || {}

  if (!notifications) return null

  const handleGoToLevelTwo = (notification: NotificationType) => {
    setActiveNotification(notification)
    setNotificationLevelTranslation(-50)
  }

  const handleGoToLevelOne = () => {
    setActiveNotification(null)
    setNotificationLevelTranslation(0)
  }

  const [updateInAppNotification] = useUpdateInAppNotificationMutation()
  const [deleteInAppNotification] = useDeleteInAppNotificationMutation()

  const handleMarkNotificationRead = (notificationId: number) => {
    updateInAppNotification({
      variables: {
        notificationId,
        readStatus: NotificationReadStatus.Read,
      },
      optimisticResponse: {
        updateInAppNotification: {
          id: notificationId,
          __typename: 'InAppNotification',
          readStatus: NotificationReadStatus.Read,
        },
      },
      update: (cache, mutationResult) => {
        if (!mutationResult.data?.updateInAppNotification) return

        const data = cache.readQuery<CurrentUserQuery, CurrentUserQueryVariables>({
          query: CurrentUserDocument,
          variables: {},
        })

        if (!data?.currentUser) return

        cache.modify({
          id: cache.identify(data.currentUser),
          fields: {
            notifications: (oldNotifications) => {
              const newNotifications = [...oldNotifications].sort((aRef, bRef) => {
                const a = cache.readFragment<NotificationType>({
                  id: cache.identify(aRef),
                  fragment: NotificationFragmentDoc
                })!

                const b = cache.readFragment<NotificationType>({
                  id: cache.identify(bRef),
                  fragment: NotificationFragmentDoc
                })!

                if (
                  a.readStatus === NotificationReadStatus.Read &&
                  b.readStatus === NotificationReadStatus.Unread
                ) {
                  return 1
                }
                if (
                  a.readStatus === NotificationReadStatus.Unread &&
                  b.readStatus === NotificationReadStatus.Read
                ) {
                  return -1
                }

                if (a.bumpedAt > b.bumpedAt) {
                  return -1
                }
                if (a.bumpedAt < b.bumpedAt) {
                  return 1
                }
                return 0
              })

              return newNotifications
            }
          }
        })
      },
    })
  }
  const handleDeleteNotification = (notificationId: number) => {
    deleteInAppNotification({
      variables: {
        notificationId,
      },
      optimisticResponse: {
        deleteInAppNotification: {
          id: notificationId,
          __typename: 'InAppNotification',
        },
      },
      update: (cache, mutationResult) => {
        if (!mutationResult.data?.deleteInAppNotification) return

        const data = cache.readQuery<CurrentUserQuery, CurrentUserQueryVariables>({
          query: CurrentUserDocument,
          variables: {},
        })

        if (!data?.currentUser) return

        const deletedNotificationIdentity = cache.identify(
          mutationResult.data.deleteInAppNotification
        )
        cache.modify({
          id: cache.identify(data.currentUser),
          fields: {
            notifications: (oldNotifications) => {
              return oldNotifications.filter((notification: NotificationType) => {
                return cache.identify(notification) !== deletedNotificationIdentity
              })
            }
          }
        })
      },
    })
  }

  useEffect(() => {
    document.getElementById('close-notif-feed')?.focus()
  }, [])

  return (
    <div className="container" ref={feedContainerRef}>
      <div className="level-one">
        <div className="top">
          <p>Notifications</p>
          <Button variant={ButtonVariant.Icon} onClick={onClose} id="close-notif-feed">
            <XIcon color={theme.colors.white} />
          </Button>
        </div>
        {(!notifications || notifications.length === 0) && (
          <p className="feed-empty-state">{t('notifications.emptyFeed')}</p>
        )}
        <div className="content">
          {notifications.map((notification) => (
            <GenericErrorBoundary
              key={notification.id}
              FallbackComponent={FallbackComponent}
              fallbackProps={{ notificationId: notification.id }}
            >
              <NotificationLevelOne
                notification={notification}
                handleNotificationLevelChange={handleGoToLevelTwo}
                handleDeleteNotification={handleDeleteNotification}
                handleMarkNotificationRead={handleMarkNotificationRead}
              />
            </GenericErrorBoundary>
          ))}
        </div>
      </div>
      <div className="level-two">
        <div className="top">
          <Button variant={ButtonVariant.Icon} onClick={handleGoToLevelOne}>
            <BackArrowIcon />
          </Button>
          <span>Notifications</span>
        </div>
        <div className="content">
          {activeNotification && (
            <NotificationLevelTwo
              notification={activeNotification}
              handleCloseNotificationFeed={onClose}
            />
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .container {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 100;
          width: 200%;
          overflow-x: hidden;
          height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          transform: translateX(${notificationLevelTranslation}%);
          transition: transform 0.2s ease;
          background: ${theme.colors.charcoal};
          color: ${theme.colors.white};
        }

        .level-one,
        .level-two {
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .level-one .content {
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }

        .top {
          display: flex;
          gap: 16px;
          padding: 16px;
          border-bottom: 1px solid ${theme.colors.gray600};
        }

        .level-one > .top {
          font-weight: 600;
          font-size: 20px;
          justify-content: space-between;
        }

        .level-two > .content {
          padding: 16px;
        }

        .feed-empty-state {
          margin-top: 25px;
          text-align: center;
        }
      `}</style>
    </div>
  )
}

export default NotificationFeed
