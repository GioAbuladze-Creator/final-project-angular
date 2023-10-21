import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class LocalStorageService {
    get(key: string) {
        try {
            const value = localStorage.getItem(key);
            if (value) {
                return decodeURIComponent(value);
            }
            return null;
            
        } catch (error) {
            throw new Error('Error while getting data from localStorage');
        }
    }
    set(key: string, value: any) {
        try {
            const encodedValue = encodeURIComponent(value);
            localStorage.setItem(key, encodedValue);
        } catch (error) {
            console.error('Error while setting data in localStorage:', error);
        }
    }
    remove(key: string) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error while removing data from localStorage:', error);
        }
    }
    clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error while clearing localStorage:', error);
        }
    }
}