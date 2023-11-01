import { LogLevel, PublicClientApplication } from '@azure/msal-browser'

export const msalConfig = {
    auth: {
        clientId: '38891eca-cec0-4b67-943f-fcc22fdc43f9',
        authority: 'https://login.microsoftonline.com/1a3889b2-f76f-4dd8-831e-b2d5e716c986',
    },
    cache: {
        cacheLocation: 'sessionStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    scopes: ['api://3c926c2e-6b26-4c17-9087-5e2852f6309b/Users.Read'],
    system: {
        loggerOptions: {
            loggerCallback: (level: any, message: any, containsPii: any) => {
                if (containsPii) {
                    return
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message)
                        return
                    case LogLevel.Info:
                        console.info(message)
                        return
                    case LogLevel.Verbose:
                        console.debug(message)
                        return
                    case LogLevel.Warning:
                        console.warn(message)
                        return
                    default:
                        return
                }
            },
        },
    },
}

export const pca = new PublicClientApplication(msalConfig)
