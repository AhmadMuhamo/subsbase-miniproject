export default function({ $axios, redirect }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
  })

  // Set baseURL to something different
  api.setBaseURL('https://www.alphavantage.co/')

  // Inject to context as $api
  inject('api', api)
}
