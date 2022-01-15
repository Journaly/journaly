import React from 'react'
import { JournalySSRContext } from '@/lib/apollo'

// Used to perform an auth check during SSR. Callback will only be called on
// the server, and if `ready` is true (useful for waiting for data to load. If
// callback return false, the request will redirect to the login page.
// Otherwise SSR continues as normal.
const useAuthCheck = (callback: () => boolean, ready: boolean) => {
  const ssrContext = React.useContext(JournalySSRContext)

  if (typeof window === 'undefined' && ready) {
    if (!callback()) {
      ssrContext.redirectTarget = '/login'
    }
  }
}

export default useAuthCheck
