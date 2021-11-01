import { objectType } from 'nexus'

const InAppNotification = objectType({
  name: 'InAppNotification',
  definition(t) {
    t.model.id()
  },
})

export default [InAppNotification]
