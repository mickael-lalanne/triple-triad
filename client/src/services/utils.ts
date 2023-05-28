declare global {
    interface Window {
        chrome: any;
        opr: any;
    }
}

/**
 * Check user's browser to know if the app can be runned
 * At the moment, only Chrome browser is supported
 * @returns {boolean} true if the user's browser is Chrome
 */
export const isBrowserSupported = (): boolean => {
    // cf https://stackoverflow.com/a/13348618
    const isChromium = window.chrome;
    const winNav = window.navigator;
    const vendorName = winNav.vendor;
    const isOpera = typeof window.opr !== 'undefined';
    const isIEedge = winNav.userAgent.indexOf('Edg') > -1;
    const isIOSChrome = winNav.userAgent.match('CriOS');

    if (isIOSChrome) {
        // is Google Chrome on IOS
        return false;
    } else if(
        isChromium !== null &&
        typeof isChromium !== 'undefined' &&
        vendorName === 'Google Inc.' &&
        isOpera === false &&
        isIEedge === false
    ) {
        // is Google Chrome
        return true;
    } else { 
        // not Google Chrome
        return false
    }
};

/**
 * Check window resolution to know if the app can be runned
 * @returns {boolean} true if the window resolution match the supported width and height
 */
export const isResolutionSupported = (): boolean => {
    const SUPPORTED_WIDTH: number = 800;
    const SUPPORTED_HEIGHT: number = 850;

    const currentWidth: number = window.innerWidth ||
        document.documentElement.clientWidth || 
        document.body.clientWidth;
    const currentHeight: number = window.innerHeight||
        document.documentElement.clientHeight|| 
        document.body.clientHeight;
    
    return currentWidth >= SUPPORTED_WIDTH && currentHeight >= SUPPORTED_HEIGHT;
};
