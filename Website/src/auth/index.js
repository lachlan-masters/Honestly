import createAuth0Client from '@auth0/auth0-spa-js'
import { computed, reactive, watchEffect } from 'vue'

let client
const state = reactive({
  loading: true,
  isAuthenticated: false,
  user: {},
  popupOpen: false,
  error: null,
})

/**
 * Authenticates the user using a popup window
 *
 * @param {Object} o
 */
async function loginWithPopup() {
  state.popupOpen = true

  try {
    await client.loginWithPopup(0)
  } catch (e) {
    console.error(e)
  } finally {
    state.popupOpen = false
  }

  state.user = await client.getUser()
  state.isAuthenticated = true
}

/**
 * Handles the callback when logging in using a redirect
 *
 * @param {Object} o
 */
async function handleRedirectCallback() {
  state.loading = true

  try {
    await client.handleRedirectCallback()
    state.user = await client.getUser()
    state.isAuthenticated = true
  } catch (e) {
    state.error = e
  } finally {
    state.loading = false
  }
}

/**
 * Authenticates the user using the redirect method
 *
 * @param {Object} o
 */
function loginWithRedirect(o) {
  return client.loginWithRedirect(o)
}

/**
 * Returns all the claims present in the ID token
 *
 * @param {Object} o
 */
function getIdTokenClaims(o) {
  return client.getIdTokenClaims(o)
}

/**
 * Returns the access token. If the token is invalid or missing,
 * a new one is retrieved
 *
 * @param {Object} o
 */
function getTokenSilently(o) {
  return client.getTokenSilently(o)
}

/**
 * Gets the access token using a popup window
 *
 * @param {Object} o
 */
function getTokenWithPopup(o) {
  return client.getTokenWithPopup(o)
}

/**
 * Logs the user out and removes their session on the authorization server
 *
 * @param {Object} o
 */
function logout(o) {
  return client.logout(o)
}

const authPlugin = {
  isAuthenticated: computed(() => state.isAuthenticated),
  loading: computed(() => state.loading),
  user: computed(() => state.user),
  getIdTokenClaims,
  getTokenSilently,
  getTokenWithPopup,
  handleRedirectCallback,
  loginWithRedirect,
  loginWithPopup,
  logout,
}

/**
 * Authorization guard to protect routes in our app from unauthorized users
 *
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
const routeGuard = (to, from, next) => {
  const { isAuthenticated, loading, loginWithRedirect } = authPlugin

  const verify = () => {
    // If the user is authenticated, continue with the route
    if (isAuthenticated.value) {
      return next()
    }

    // Otherwise, log in
    loginWithRedirect({ appState: { targetUrl: to.fullPath } })
  }

  // If loading has already finished, check our auth state using `fn()`
  if (!loading.value) {
    return verify()
  }

  // Watch for the loading property to change before we check isAuthenticated
  watchEffect(() => {
    if (loading.value === false) {
      return verify()
    }
  })
}

async function init(options) {
  const { onRedirectCallback, redirectUri = window.location.origin } = options

  client = await createAuth0Client({
    domain: process.env.VUE_APP_AUTH0_DOMAIN,
    client_id: process.env.VUE_APP_AUTH0_CLIENT_KEY,
    audience: options.audience,
    redirect_uri: redirectUri,
  })

  try {
    // If the user is returning to the app after authentication
    if (
      window.location.search.includes('code=') &&
      window.location.search.includes('state=')
    ) {
      // handle the redirect and retrieve tokens
      const { appState } = await client.handleRedirectCallback()

      // Notify subscribers that the redirect callback has happened, passing the appState
      // (useful for retrieving any pre-authentication state)
      onRedirectCallback(appState)
    }
  } catch (e) {
    state.error = e
  } finally {
    // Initialize our internal authentication state
    state.isAuthenticated = await client.isAuthenticated()
    state.user = await client.getUser()
    state.loading = false
  }

  return {
    install: (app) => {
      app.provide('Auth', authPlugin)
    },
  }
}

export default {
  init,
  routeGuard,
}