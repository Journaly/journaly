import { objectType } from 'nexus'

const Notification = objectType({
  name: 'Notification',
  definition(t) {
    t.model.id()
  },
})

export default [Notification]
