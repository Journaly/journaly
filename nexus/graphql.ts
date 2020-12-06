import {
  objectType,
} from '@nexus/schema'

const Location = objectType({
  name: 'Location',
  definition(t) {
    t.model.id()
    t.model.country()
    t.model.city()
  },
})

export default [Location]
