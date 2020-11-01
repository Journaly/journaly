import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from '../../../config/i18n'
import FormError from '../../../components/FormError'
import SettingsForm from '../../../components/Dashboard/Settings/SettingsForm'
import SettingsFieldset from '../../../components/Dashboard/Settings/SettingsFieldset'
import useImageUpload from '../../../hooks/useImageUpload'
import Button, { ButtonVariant } from '../../../elements/Button'
import theme from '../../../theme'
import { User as UserType, useUpdateUserMutation } from '../../../generated/graphql'
import BlankAvatarIcon from '../../Icons/BlankAvatarIcon'

type DetailsFormProps = {
  currentUser: UserType
}

interface HTMLInputEvent extends React.FormEvent {
  target: HTMLInputElement & EventTarget
}

const DetailsForm: React.FC<DetailsFormProps> = ({ currentUser }) => {
  const [handle, setHandle] = useState(currentUser.handle)
  const [email, setEmail] = useState(currentUser.email)
  const [name, setName] = useState(currentUser.name || '')
  const fileInput = useRef<HTMLInputElement>(null)

  const [updateUser, { loading: loadingUpdateUser }] = useUpdateUserMutation()

  const [image, uploadingImage, onFileInputChange] = useImageUpload()
  const profileImage = image?.secure_url || currentUser.profileImage

  const updateUserProfileImage = async (e: HTMLInputEvent) => {
    const image = await onFileInputChange(e)
    if (image) {
      updateUser({
        variables: {
          profileImage: image.secure_url,
        },
      })
    }
  }

  const { t } = useTranslation('settings')
  const { handleSubmit, register, errors } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  const fieldErrorName = Object.keys(errors)[0] || ''
  const fieldError = errors[fieldErrorName]

  const handleDetailsSubmit = (): void => {
    if (!loadingUpdateUser && Object.keys(errors).length === 0) {
      updateUser({
        variables: {
          name,
          email,
          profileImage,
        },
      })
    }
  }

  return (
    <SettingsForm onSubmit={handleSubmit(handleDetailsSubmit)} errorInputName={fieldErrorName}>
      <SettingsFieldset legend={t('profile.details.legend')}>
        <div className="details-wrapper">
          <div className="profile-image-wrapper">
            {profileImage ? (
              <img src={profileImage} alt="" />
            ) : (
              <BlankAvatarIcon className="blank-avatar" size={130} />
            )}

            <Button
              onClick={(e) => {
                e.preventDefault()
                if (fileInput && fileInput.current) {
                  fileInput.current.click()
                }
              }}
              type="button"
              className="settings-submit-button"
              variant={ButtonVariant.Secondary}
              loading={uploadingImage}
            >
              {t('profile.details.submitImage')}
            </Button>
          </div>

          <div className="details-form-fields-wrapper">
            {fieldError && <FormError error={fieldError.message as string} />}

            <div className="details-form-fields">
              <input
                className="image-upload-input"
                onChange={updateUserProfileImage}
                type="file"
                name="profile-image"
                ref={fileInput}
              />
              <div className="details-form-field">
                <label className="settings-label" htmlFor="handle">
                  {t('profile.details.displayNameLabel')}
                </label>
                <input
                  type="text"
                  name="handle"
                  value={handle}
                  className="j-field"
                  onChange={(e) => setHandle(e.target.value)}
                  ref={register({ required: t('profile.details.displayNameError') as string })}
                  disabled={true}
                />
              </div>
              <div className="details-form-field">
                <label className="settings-label" htmlFor="email">
                  {t('profile.details.emailLabel')}
                </label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  className="j-field"
                  onChange={(e) => setEmail(e.target.value)}
                  ref={register({ required: t('profile.details.emailError') as string })}
                />
              </div>
              <div className="details-form-field">
                <label className="settings-label" htmlFor="name">
                  {t('profile.details.nameLabel')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  className="j-field"
                  onChange={(e) => setName(e.target.value)}
                  ref={register()}
                />
              </div>
              <div className="details-form-field">
                <label className="settings-label" htmlFor="location">
                  Location (optional)
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="j-field"
                  ref={register()}
                  disabled={true}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="settings-submit-button"
              variant={ButtonVariant.Secondary}
              loading={loadingUpdateUser}
            >
              {t('updateButton')}
            </Button>
          </div>
        </div>
      </SettingsFieldset>

      <style jsx>{`
        .details-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 16px;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .details-wrapper {
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
          }
        }

        .profile-image-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          width: 150px;
          margin: 0 50px;
        }
        @media (min-width: ${theme.breakpoints.LG}) {
          .profile-image-wrapper {
            margin-top: 30px;
          }
        }

        .profile-image-wrapper :global(img) {
          width: 100%;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
        }
        .profile-image-wrapper :global(.blank-avatar) {
          border-radius: 50%;
          background-color: ${theme.colors.blueLight};
        }

        .details-form-fields-wrapper {
          width: 100%;
          margin-top: 40px;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .details-form-fields-wrapper {
            margin: 0 25px;
          }
        }

        .details-form-fields-wrapper :global(.form-error) {
          margin-bottom: 24px;
        }

        .details-form-fields {
          display: grid;
          grid-gap: 24px;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .details-form-fields {
            grid-template-columns: 320px;
            margin-top: 0;
          }
        }
        @media (min-width: ${theme.breakpoints.LG}) {
          .details-form-fields {
            grid-template-columns: 320px 320px;
          }
        }

        .details-form-field {
          display: flex;
          flex-direction: column;
        }

        .image-upload-input {
          display: none;
        }
      `}</style>
    </SettingsForm>
  )
}

export default DetailsForm
