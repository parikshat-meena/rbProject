Firebase Authentication and Product Management
Description
This app demonstrates a simple yet functional example of Firebase integration for authentication, along with a product management system. The app includes the following features:

Firebase Authentication:

Users can sign up using an email and password.
Users can log in and log out securely.
Firebase ensures robust backend support for user authentication.

Home Screen:
Displays a list of products fetched from a predefined dataset or backend.
Search functionality to find products by name or other attributes.
Delete functionality to remove products from the list.

Product Details Screen:
Displays detailed information about a selected product, including images, descriptions, prices, etc.
User-friendly UI for better product insights.

State Management:
Redux is used for centralized state management to manage user authentication and product data efficiently.

Features
1. Firebase Authentication
User sign-up with email and password.
User login/logout functionality.
Secure user session management.

2. Redux Integration
Centralized state management for authentication and product data.
Separate slices for authentication and product management.

3. Home Screen
Product Listing: Displays a scrollable list of products.
Search: Real-time product search functionality.
Delete: Ability to remove products from the list with confirmation.

4. Product Details Screen
Detailed view of selected product information.
Tech Stack
Frontend: React Native
Backend: Firebase Authentication, Firebase Firestore (optional for dynamic product data)
State Management: Redux Toolkit
UI Library: React Native Elements/Custom Components

Installation and Setup
1. Clone the Repository

git clone https://github.com/your-repo-name.git
cd your-repo-name

2. Install Dependencies
npm install

3. Set Up Firebase
Follow the steps outlined earlier to configure Firebase for Android and iOS.

4. Set Up Redux
Install Redux and Redux Toolkit:
npm install @reduxjs/toolkit react-redux
Create a redux folder in your project:

src/redux/
├── store.js
├── slices/
    ├── authSlice.js
    └── productSlice.js
    
Configure the store in store.js:

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});
export default store;

Set up authSlice.js for authentication:
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

Wrap your app with the Redux Provider in App.js:
import { Provider } from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      {/* App Components */}
    </Provider>
  );
};

export default App;

Usage
1. Firebase Authentication
Sign Up:
import { auth } from './firebaseConfig';

const signUp = async (email, password) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    console.log('User account created!');
  } catch (error) {
    console.error(error);
  }
};

Log In:
import { auth } from './firebaseConfig';
import { setUser } from './redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const logIn = async (email, password) => {
  const dispatch = useDispatch();

  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    dispatch(setUser(userCredential.user));
    console.log('User signed in!');
  } catch (error) {
    console.error(error);
  }
};

Log Out:
import { auth } from './firebaseConfig';
import { clearUser } from './redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const logOut = async () => {
  const dispatch = useDispatch();

  try {
    await auth().signOut();
    dispatch(clearUser());
    console.log('User signed out!');
  } catch (error) {
    console.error(error);
  }
};

2. Home Screen
Browse the list of products.
Use the search bar to filter products.
Delete products by swiping or using the delete button.

3. Product Details Screen
Tap on any product to view detailed information.
