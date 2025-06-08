import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

exports.configureFirebase = () => {
    try {
        const firebaseConfig = {
                apiKey: "AIzaSyAddX4IiIRiXfIg0PgWy8-GHHqef-TX7xA",
                authDomain: "aidev-4e8de.firebaseapp.com",
                projectId: "aidev-4e8de",
                storageBucket: "aidev-4e8de.firebasestorage.app",
                messagingSenderId: "900147702181",
                appId: "1:900147702181:web:ed7297c0221adfe86ba04c",
                measurementId: "G-ZT6LCHD8ZZ"
        };
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        
        console.log('Firebase configured successfully');
    } catch (error) {
        console.error('Error configuring Firebase:', error.message);
    }
}
