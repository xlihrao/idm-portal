export const URL = {
  push: (router, url) => {
    // router.push(`${URL.ROOT}/${url}`)
    router.push(url)
  },

  ROOT: '/',
  LOGIN: '/login',
}
