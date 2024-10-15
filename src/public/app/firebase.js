// ./src/public/app/firebase.js

let _messagesDb = null;

let username = 'elzahaby '+ Math.floor(Math.random() * 1000);
class Firebase {
    constructor() {
        firebase.initializeApp( {
            apiKey: "AIzaSyACk8ZLrFyPWKuL0sjbG3x1_Cswh8HH26M",
            authDomain: "lockers-1b6ad.firebaseapp.com",
            projectId: "lockers-1b6ad",
            storageBucket: "lockers-1b6ad.appspot.com",
            messagingSenderId: "905375774280",
            appId: "1:905375774280:web:9f15d954a4b290d3e94a7d",
            measurementId: "G-FSRMG8160R"
        });

        const appCheck = firebase.appCheck();


        // initialize Firestore through Firebase
        _messagesDb = firebase.firestore();

        // disable deprecated features
        _messagesDb.settings({
            timestampsInSnapshots: true
        });
    }

    async addMessage(message) {
        // #messages
        // - datetime
        // - order_id
        // - user_id (user,supplier,driver)
        // - username
        // - message
        // - message_type (image,text)
        const createdAt = new Date();
        const message_type = 'text';
        const order_id = '123';
        const user_id = '123';
        return await _messagesDb.collection('chats').add({
            createdAt,
            message,
            message_type,
            order_id,
            user_id,
            username
        });
    }

    getCurrentUser() {
        return firebase.auth().currentUser;
    }

    async updateProfile(profile) {
        if (!firebase.auth().currentUser) return;
        await firebase.auth().currentUser.updateProfile({
            displayName: profile.name,
            photoURL: profile.picture,
        });
    }

    async signOut() {
        await firebase.auth().signOut();
    }

    setAuthStateListener(listener) {
        firebase.auth().onAuthStateChanged(listener);
    }

    setMessagesListener(listener) {
        _messagesDb.collection('chats').orderBy('createdAt', 'desc').limit(10).onSnapshot(listener);
    }
}

const firebaseClient = new Firebase();