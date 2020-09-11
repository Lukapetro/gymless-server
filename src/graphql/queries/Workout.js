import { extendType } from '@nexus/schema'

export const workout = extendType({
  type: 'Query',
  definition(t) {
    t.crud.workout({
      filtering: true,
      ordering: true,
    })
    t.crud.workouts({
      filtering: true,
      ordering: true,
    })
  },
})
