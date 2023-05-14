import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

// Your own translation file
import en from '@/locales/en';

export default createVuetify({
    components,
    directives,
    locale: {
        locale: 'en',
        messages: { en }
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    },
    theme: {
        variations: {
            colors: ['primary', 'secondary'],
        },
        defaultTheme: 'tripleTriadTheme',
        themes: {
            tripleTriadTheme: {
                colors: {
                    primary: '#5e548e',
                    secondary: '#9f86c0',
                    light: '#be95c4',
                    light2: '#e0b1cb',
                    dark: '#231942'
                }
            }
        }
    }
});
