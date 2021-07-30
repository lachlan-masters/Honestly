import createAuth0Client from '@auth0/auth0-spa-js';
import { computed } from 'vue'
import { useStore } from 'vuex'

import config from '../../auth_config.json'

export default function useAuth() {
    const store = useStore();

    let authenticated = computed(function() {
        return store.getters.authenticated
    })

    let user = computed(function() {
        return store.state.user
    })

    async function buildAuth0Client() {
        const client = await createAuth0Client({
            domain: config.domain,
            client_id: config.clientId
        });

        return client;
    }

    async function login(client) {
        try {
            await client.loginWithPopup({});

            let userData = await client.getUser();
            store.commit("setUser", userData);
        } catch (e) {
            console.error(e);
        }
    }

    function logout(client) {
        return client.logout();
    }

    return {
        authenticated,
        user,
        buildAuth0Client,
        login,
        logout
    }
}