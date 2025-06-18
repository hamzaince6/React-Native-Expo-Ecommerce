import { StyleSheet } from 'react-native';

// Modern spacing system with consistent scale
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius system
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
};

// Shadow styles
export const shadows = {
  sm: {
    shadowColor: '#374151',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#374151',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  lg: {
    shadowColor: '#374151',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
};

// Color palette
export const colors = {
  primary: {
    50: '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#FF7600',
    600: '#EA580C',
    700: '#C2410C',
    800: '#9A3412',
    900: '#B33F00',
  },
  secondary: {
    500: '#F4B400',
  },
  text: {
    500: '#374151',
    600: '#2D2D2D',
  },
  textLight: {
    500: '#4B5563',
  },
  background: {
    50: '#FFFFFF',
    100: '#F9FAFB',
    200: '#F3F4F6',
    300: '#FDF9DB',
  },
};

// Global styles that can be reused across components
export const globalStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.background[50],
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text[600],
    letterSpacing: -0.2,
  },
  card: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: colors.background[50],
    ...shadows.lg,
    borderWidth: 1,
    borderColor: colors.background[300],
  },
  itemSpacing: {
    marginRight: spacing.sm,
  },
  verticalSpacing: {
    marginTop: spacing.sm,
  },
});

export default {
  spacing,
  borderRadius,
  shadows,
  colors,
  globalStyles,
};