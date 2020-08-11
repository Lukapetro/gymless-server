import { schema } from 'nexus'

export const Cordinates = schema.objectType({
  name: 'Cordinates',
  definition(t) {
    t.model.id()
    t.model.city()
    t.model.address()
    t.model.latitude()
    t.model.longitude()
    t.model.workout()
  },
})
