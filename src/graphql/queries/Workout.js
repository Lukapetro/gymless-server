import { extendType } from '@nexus/schema'

export const workout = extendType({
  type: 'Query',
  definition(t) {
    t.crud.workout()
    t.crud.workouts({
      filtering: true,
      sorting: true,
    })
  },
})
