import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      primary: {
        [key: number]: string;
      };
      secondary: {
        [key: number]: string;
      };
      text: string | {
        [key: number]: string;
      };
      textLight: string | {
        [key: number]: string;
      };
      background: string | {
        [key: number]: string;
      };
      border: string;
      error: string;
      success: string;
      warning: string;
      info: string;
    };
    typography: {
      fontSize: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        xxl: number;
      };
      fontFamily: {
        regular: string;
        medium: string;
        bold: string;
      };
    };
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    borderRadius: {
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
  }
} 