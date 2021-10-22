import React, { useState, useRef, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from '@/config/i18n'
import FormError from '@/components/FormError'
import SettingsForm from '@/components/Dashboard/Settings/SettingsForm'
import SettingsFieldset from '@/components/Dashboard/Settings/SettingsFieldset'
import useAvatarImageUpload from '@/hooks/useAvatarImageUpload'
import Button, { ButtonVariant } from '@/components/Button'
import theme from '@/theme'
import {
  User as UserType,
  useResendEmailVerificationEmailMutation,
  useUpdateUserMutation,
} from '@/generated/graphql'
import BlankAvatarIcon from '@/components/Icons/BlankAvatarIcon'
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
  city: string
  country: string
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

  const [image, uploadingImage, onFileInputChange] = useAvatarImageUpload()
  const profileImage = image?.finalUrl || currentUser.profileImage

  const updateUserProfileImage = async (e: HTMLInputEvent): Promise<void> => {
    const image = await onFileInputChange(e)
    if (image) {
      updateUser({
        variables: {
          profileImage: image.finalUrl,
        },
      })
    }
  }

  const { handleSubmit, register, errors, setError } = useForm<FormData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  const addServerErrors = (apolloError: ApolloError): void => {
    const graphQLErrors = apolloError.graphQLErrors
    if (!graphQLErrors) {
      toast.error(t('profile.error.updateError'))
      return
    }

    const badRequest = graphQLErrors[0].extensions

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
      try {
        await updateUser({
          variables: {
            name: formData.name,
            email: formData.email,
            handle: formData.handle,
            city: formData.city,
            country: formData.country,
            profileImage: profileImage,
          },
        })
      } catch (err) {
        addServerErrors(err)
      }
    }
  }

  const invalidFields = Object.values(errors)

  const [resendEmailVerificationEmailMutation, { loading: resendingEmailVerification }] =
    useResendEmailVerificationEmailMutation({
      onCompleted: () => {
        toast.success(t('resendEmailVerificationToastSuccess'))
      },
      onError: () => {
        toast.error(t('resendEmailVerificationToastError'))
      },
    })

  const resendEmailVerificationEmail = useCallback(() => {
    resendEmailVerificationEmailMutation()
  }, [])

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
                      value: 3,
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
                <div className="email-label-container">
                  <label className="settings-label" htmlFor="email">
                    {t('profile.details.emailLabel')}
                  </label>
                  <span
                    className={`email-${
                      currentUser.emailAddressVerified ? 'verified' : 'unverified'
                    }-badge`}
                  >
                    {currentUser.emailAddressVerified
                      ? t('profile.details.emailVerifiedBadgeText')
                      : t('profile.details.emailUnverifiedBadgeText')}
                  </span>
                </div>
                <input
                  type="text"
                  name="email"
                  className={`j-field ${errors.email ? 'is-invalid' : ''}`}
                  defaultValue={currentUser.email || ''}
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
                {!currentUser.emailAddressVerified && (
                  <span>
                    <Button
                      variant={ButtonVariant.Link}
                      loading={resendingEmailVerification}
                      onClick={resendEmailVerificationEmail}
                    >
                      {t('profile.details.resendEmailVerificationButtonText')}
                    </Button>{' '}
                    {t('profile.details.resendEmailVerificationText')}
                  </span>
                )}
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
                <label className="settings-label" htmlFor="city">
                  {t('profile.details.cityLabel')}
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="j-field"
                  placeholder={t('profile.details.cityPlaceholder')}
                  defaultValue={currentUser.city || ''}
                  ref={register()}
                />
              </div>
              <div className="details-form-field">
                <label className="settings-label" htmlFor="country">
                  {t('profile.details.countryLabel')}
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  className="j-field"
                  placeholder={t('profile.details.countryPlaceholder')}
                  defaultValue={currentUser.country || ''}
                  ref={register()}
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

        .email-verified-badge {
          font-weight: 700;
          color: ${theme.colors.greenDark};
        }

        .email-unverified-badge {
          font-weight: 700;
          color: ${theme.colors.red};
          font-style: italic;
        }
        .email-label-container {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </SettingsForm>
  )
}

export default DetailsForm
