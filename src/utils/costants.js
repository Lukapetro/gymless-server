export const tokens = {
  access: {
    name: 'ACCESS_TOKEN',
    expiry: '1d',
  },
}

export const isDev = () => process.env.NODE_ENV === 'development'
