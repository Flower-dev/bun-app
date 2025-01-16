export interface Translation {
    auth: {
      login: {
        title: string;
        description: string;
        emailPlaceholder: string;
        passwordPlaceholder: string;
        submitButton: string;
        switchToRegister: string;
      };
      register: {
        title: string;
        description: string;
        usernamePlaceholder: string;
        emailPlaceholder: string;
        passwordPlaceholder: string;
        confirmPasswordPlaceholder: string;
        submitButton: string;
        switchToLogin: string;
      };
      validation: {
        required: string;
        passwordMismatch: string;
        invalidEmail: string;
      };
    };
    dashboard: {
      title: string;
      welcome: string;
      logoutButton: string;
    };
  }
  