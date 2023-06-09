import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RoadmapView from '../views/RoadmapView.vue';
import { Auth } from '@aws-amplify/auth';

export const BASE_PATH: string = import.meta.env.PROD ? '/triple-triad' : '';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: BASE_PATH + '/',
            name: 'home',
            component: HomeView
        },
        {
            path: BASE_PATH + '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: BASE_PATH + '/roadmap',
            name: 'roadmap',
            component: RoadmapView
        }
    ]
});

// Authentication guard
router.beforeEach(async (to, from,) => {
    const isUserAuthenticated = await _isUserAuthenticated();

    // If user is not authenticated, redirect to the login page
    if (to.name !== 'login' && to.name !== 'roadmap' && !isUserAuthenticated) {
        return { name: 'login' };
    }
    // // If user is ahtenticated, don't display the login view
    else if (to.name === 'login' && isUserAuthenticated) {
        return { name: 'home' };
    }
    return true;
});

/**
 * Check if user is authenticated or not
 * @returns {Promise<boolean>} true if user is authenticated
 */
const _isUserAuthenticated = async (): Promise<boolean> => {
    try {
        await Auth.currentAuthenticatedUser();
        return true;
    } catch (e) {
        return false;
    }
};

export default router;
