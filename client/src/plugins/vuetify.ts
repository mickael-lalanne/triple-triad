import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader

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
                    primary: '#2CD3E1',
                    secondary: '#F266AB',
                    tertiary: '#FFB84C',
                    black: '#222831',
                    cardStar: '#E9D440'
                }
            }
        }
    }
});
