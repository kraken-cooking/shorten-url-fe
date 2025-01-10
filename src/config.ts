const env = import.meta.env
export const config = {
  beApiUrl: env.VITE_APP_BE_URL,
  feUrl: env.VITE_APP_FE_URL,
  environment: env.MODE,
}

export const apiUrls = {
  signUp: `${config.beApiUrl}/sign-up`,
  login: `${config.beApiUrl}/login`,
  links: `${config.beApiUrl}/protected/links`,
  shorten: `${config.beApiUrl}/links`,
}
