import { extendType } from '@nexus/schema'

export const cordinates = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cordinates()
  },
})
