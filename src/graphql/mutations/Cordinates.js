import { extendType } from '@nexus/schema'

export const cordinates = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCordinates()
    t.crud.updateOneCordinates()
    t.crud.deleteOneCordinates()
  },
})
