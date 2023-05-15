import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import BoardView from '../views/BoardView.vue';
import { Auth } from '@aws-amplify/auth';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/board',
            name: 'board',
            component: BoardView
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        }
    ]
});

// Authentication guard
router.beforeEach(async (to, from,) => {
    const isUserAuthenticated = await _isUserAuthenticated();

    // If user is not authenticated, redirect to the login page
    if (to.name !== 'login' && !isUserAuthenticated) {
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
