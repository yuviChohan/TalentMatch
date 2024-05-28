# Contexts Documentation
- [Theme Context](#theme-context-for-react-project)
- [Auth Context](#authentication-context-for-react-project)

## Theme Context for React Project

This code helps you change the appearance of your app between light and dark modes easily. It uses a context to manage the theme and provides a way to switch between the two themes.

### Code Explanation

1. **Imports and Setup**:
    - The code imports necessary tools from React to create a context, use the context, manage state, and define node types:

    ```javascript
    import React, { createContext, useContext, useState, ReactNode } from 'react';
    ```

    - It defines the properties our theme context will have using `ThemeContextProps`:

    ```javascript
    interface ThemeContextProps {
      isDarkMode: boolean;
      backgroundColor: string;
      frontColor: string;
      accentColor: string;
      textColor: string;
      accentTextColor: string;
      errorTextColor: string;
      toggleTheme: () => void;
    }
    ```

2. **Themes**:
    - Two theme objects, `lightTheme` and `darkTheme`, define the color properties for light and dark themes:

    ```javascript
    const lightTheme = {
      backgroundColor: '#f8f9fa',
      frontColor: '#ffffff',
      accentColor: '#007bff',
      textColor: '#333333',
      accentTextColor: '#007bff',
      errorTextColor: '#ff4d4f',
    };

    const darkTheme = {
      backgroundColor: '#121212',
      frontColor: '#1e1e1e',
      accentColor: '#bb86fc',
      textColor: '#e1e1e1',
      accentTextColor: '#bb86fc',
      errorTextColor: '#cf6679',
    };
    ```

3. **Theme Context**:
    - The `ThemeContext` is created to be used later in our components:

    ```javascript
    const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
    ```

4. **ThemeProvider Component**:
    - The `ThemeProvider` component provides theme values to all its children. It uses `useState` to manage whether the current theme is dark or light and defines a `toggleTheme` function to switch between themes:

    ```javascript
    export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
      const [isDarkMode, setIsDarkMode] = useState(false);

      const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
      };

      const theme = isDarkMode ? darkTheme : lightTheme;

      return (
        <ThemeContext.Provider value={{ ...theme, isDarkMode, toggleTheme }}>
          {children}
        </ThemeContext.Provider>
      );
    };
    ```

5. **useTheme Hook**:
    - The `useTheme` custom hook allows components to access the theme context and throws an error if used outside of `ThemeProvider`:

    ```javascript
    export const useTheme = () => {
      const context = useContext(ThemeContext);
      if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
      }
      return context;
    };
    ```

### Usage in a React Project

To use this theme context in a React project, follow these steps:

1. **Wrap Your App with ThemeProvider**

    First, wrap your main application component with `ThemeProvider` to provide theme values to your entire app:

    ```javascript
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';
    import { ThemeProvider } from './path/to/ThemeContext';

    ReactDOM.render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
      document.getElementById('root')
    );
    ```

2. **Access and Toggle the Theme in Your Components**

    Use the `useTheme` hook to get theme values and the `toggleTheme` function inside your components:

    ```javascript
    import React from 'react';
    import { useTheme } from './path/to/ThemeContext';

    // Button to switch themes
    const ThemeToggleButton: React.FC = () => {
      const { isDarkMode, toggleTheme } = useTheme();

      return (
        <button onClick={toggleTheme}>
          Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
      );
    };

    // Component that uses theme values
    const ThemedComponent: React.FC = () => {
      const { backgroundColor, textColor } = useTheme();

      return (
        <div style={{ backgroundColor, color: textColor }}>
          This component changes color based on the theme!
        </div>
      );
    };

    const App: React.FC = () => {
      return (
        <div>
          <ThemeToggleButton />
          <ThemedComponent />
        </div>
      );
    };

    export default App;
    ```

### Simple Example

Here’s a simple example to understand how to use the theme context.

1. **ThemeToggleButton Component**: This button lets the user switch between light and dark themes.

    ```javascript
    const ThemeToggleButton: React.FC = () => {
      const { isDarkMode, toggleTheme } = useTheme();

      return (
        <button onClick={toggleTheme}>
          Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
      );
    };
    ```

2. **ThemedComponent**: This component changes its background and text color based on the current theme.

    ```javascript
    const ThemedComponent: React.FC = () => {
      const { backgroundColor, textColor } = useTheme();

      return (
        <div style={{ backgroundColor, color: textColor }}>
          This component changes color based on the theme!
        </div>
      );
    };
    ```

3. **App Component**: This component combines the `ThemeToggleButton` and `ThemedComponent`.

    ```javascript
    const App: React.FC = () => {
      return (
        <div>
          <ThemeToggleButton />
          <ThemedComponent />
        </div>
      );
    };

    export default App;
    ```

### How It Works

- **Wrap the Application**: You wrap your entire application with `ThemeProvider` so that all components can access the theme context.
- **Toggle the Theme**: Use the `ThemeToggleButton` to switch between light and dark themes.
- **Apply the Theme**: The `ThemedComponent` changes its style based on the current theme values.

By following these steps, you can easily add theme switching functionality to your React project, making it more dynamic and user-friendly.

## Authentication Context for React Project

This code manages user authentication state in a React application using Firebase. It provides a context to share the authenticated user's ID across the application.

### Code Explanation

1. **Imports and Setup**:
    - The code imports necessary tools from React and Firebase to create a context, use the context, manage state, handle authentication state changes, and define user types:

      ```javascript
      import React, { createContext, useContext, useEffect, useState } from 'react';
      import { User, onAuthStateChanged } from "firebase/auth";
      import { auth } from '../firebase';
      ```

    - It defines the properties our authentication context will have using `AuthContextProps`:

      ```javascript
      interface AuthContextProps {
        uid: string | null;
      }
      ```

2. **AuthContext**:
    - The `AuthContext` is created to be used later in our components:

      ```javascript
      const AuthContext = createContext<AuthContextProps>({ uid: null });
      ```

3. **AuthProvider Component**:
    - The `AuthProvider` component provides the user's ID to all its children. It uses `useState` to manage the user ID and `useEffect` to handle changes in authentication state:

      ```javascript
      export const AuthProvider: React.FC = ({ children }) => {
        const [uid, setUid] = useState<string | null>(null);

        useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            if (user) {
              setUid(user.uid);
            } else {
              setUid(null);
            }
          });

          // Cleanup subscription on unmount
          return () => unsubscribe();
        }, []);

        return (
          <AuthContext.Provider value={{ uid }}>
            {children}
          </AuthContext.Provider>
        );
      };
      ```

4. **useAuth Hook**:
    - The `useAuth` custom hook allows components to access the authentication context:

      ```javascript
      export const useAuth = () => useContext(AuthContext);
      ```

### Usage in a React Project

To use this authentication context in a React project, follow these steps:

1. **Wrap Your App with AuthProvider**

    First, wrap your main application component with `AuthProvider` to provide authentication values to your entire app:

    ```javascript
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';
    import { AuthProvider } from './contexts/AuthContext';

    ReactDOM.render(
      <AuthProvider>
        <App />
      </AuthProvider>,
      document.getElementById('root')
    );
    ```

2. **Access the User ID in Your Components**

    Use the `useAuth` hook to get the user ID inside your components:

    ```javascript
    import React from 'react';
    import { useAuth } from './contexts/AuthContext';

    const UserProfile: React.FC = () => {
      const { uid } = useAuth();

      return (
        <div>
          {uid ? <p>User ID: {uid}</p> : <p>No user is logged in</p>}
        </div>
      );
    };

    const App: React.FC = () => {
      return (
        <div>
          <UserProfile />
        </div>
      );
    };

    export default App;
    ```

### Simple Example

Here’s a simple example to understand how to use the authentication context.

1. **UserProfile Component**: This component displays the user's ID if they are logged in.

    ```javascript
    const UserProfile: React.FC = () => {
      const { uid } = useAuth();

      return (
        <div>
          {uid ? <p>User ID: {uid}</p> : <p>No user is logged in</p>}
        </div>
      );
    };
    ```

2. **App Component**: This component combines the `UserProfile`.

    ```javascript
    const App: React.FC = () => {
      return (
        <div>
          <UserProfile />
        </div>
      );
    };

    export default App;
    ```

### How It Works

- **Wrap the Application**: You wrap your entire application with `AuthProvider` so that all components can access the authentication context.
- **Display User ID**: The `UserProfile` component displays the user's ID if they are logged in.
- **Manage Authentication State**: The `AuthProvider` manages the authentication state and updates the context when the user logs in or out.

By following these steps, you can easily manage user authentication in your React project using Firebase.

