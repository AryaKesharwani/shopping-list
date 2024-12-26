import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import {TokenCache} from '@clerk/clerk-expo/dist/cache'


const createTokenCache = ():TokenCache => {
    return {
        getToken: async (key:string) => {
            try{
                const item = await SecureStore.getItemAsync(key);
                if(item){
                    console.log(`TokenCache: Retrieved token for key ${key}`);
                }else{
                    console.log(`TokenCache: No token found for key ${key}`);
                }
                return item
            }catch(e){
                console.error(e);
            }
        },
        saveToken: (key: string, token: string) => {
            console.log(`TokenCache: Saved token for key ${key}`);
            return SecureStore.setItemAsync(key, token).catch(e => {
                console.error(e);
            });
        }
}
}

export const tokenCache = Platform.OS !== 'web' ? createTokenCache() :undefined;