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
import { ApolloError } from '@apollo/client'
import { toast } from 'react-toastify'

type DetailsFormProps = {
  currentUser: UserType
}

interface HTMLInputEvent extends React.FormEvent {
  target: HTMLInputElement & EventTarget
}

type FormData = {
  name: string
  email: string
  handle: string
}

const DetailsForm: React.FC<DetailsFormProps> = ({ currentUser }) => {
  const { t } = useTranslation('settings')
  const [previousState, setPreviousFormData] = useState<FormData>()
  const fileInput = useRef<HTMLInputElement>(null)

  const [updateUser, { loading: loadingUpdateUser }] = useUpdateUserMutation({
    onCompleted: () => {
      toast.success(t('profile.details.updateSuccess'))
    },
  })

  const [image, uploadingImage, onFileInputChange] = useImageUpload()
  const profileImage = image?.secure_url || currentUser.profileImage

  const updateUserProfileImage = async (e: HTMLInputEvent): Promise<void> => {
    const image = await onFileInputChange(e)
    if (image) {
      updateUser({
        variables: {
          profileImage: image.secure_url,
        },
      })
    }
  }

  const { handleSubmit, register, errors, setError } = useForm<FormData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  const addServerErrors = (apolloError: ApolloError): void => {
    const badRequest = (apolloError.networkError as any).result.errors[0].extensions
    if (!badRequest || badRequest.statusCode !== 400) {
      toast.error(t('profile.error.updateError'))
      return
    }

    badRequest.validationErrors.forEach((err: any): void => {
      setError(err.name, 'server', t(err.message))
    })
  }

  const handleDetailsSubmit = async (formData: FormData): Promise<void> => {
    if (!loadingUpdateUser && Object.keys(errors).length === 0) {
      setPreviousFormData(formData)
      await updateUser({
        variables: {
          name: formData.name,
          email: formData.email,
          handle: formData.handle,
          profileImage: profileImage,
        },
      }).catch((err) => {
        addServerErrors(err)
      })
    }
  }

  const invalidFields = Object.values(errors)

  return (
    <SettingsForm onSubmit={handleSubmit(handleDetailsSubmit)}>
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
            <FormError error={invalidFields} />

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
                  className={`j-field ${errors.handle ? 'is-invalid' : ''}`}
                  defaultValue={currentUser.handle}
                  ref={register({
                    required: `${t('profile.details.displayNameError')}`,
                    pattern: {
                      value: /^[a-zA-Z0-9_-]+$/,
                      message: `${t('profile.error.handleValidationErrorMessage')}`,
                    },
                    minLength: {
                      value: 6,
                      message: `${t('profile.error.handleMinimumErrorMessage')}`,
                    },
                    validate: {
                      server: (val): string | true => {
                        return (
                          errors?.handle?.type !== 'server' ||
                          val !== previousState?.handle ||
                          `${t('profile.error.handleAlreadyinUseError')}`
                        )
                      },
                    },
                  })}
                />
              </div>
              <div className="details-form-field">
                <label className="settings-label" htmlFor="email">
                  {t('profile.details.emailLabel')}
                </label>
                <input
                  type="text"
                  name="email"
                  className={`j-field ${errors.email ? 'is-invalid' : ''}`}
                  defaultValue={currentUser.email}
                  ref={register({
                    required: `${t('profile.details.emailError')}`,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: `${t('profile.error.emailValidationErrorMessage')}`,
                    },
                    validate: {
                      server: (val): string | true =>
                        errors?.email?.type !== 'server' ||
                        val !== previousState?.email ||
                        `${t('profile.error.emailAlreadyinUseError')}`,
                    },
                  })}
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
                  className={`j-field ${errors.name ? 'is-invalid' : ''}`}
                  defaultValue={currentUser.name || ''}
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
                  placeholder="Coming soon..."
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
