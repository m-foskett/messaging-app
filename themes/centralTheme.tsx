import { lightColors, createTheme } from '@rneui/themed'
import { Platform } from 'react-native';
export const centralTheme = createTheme({
  components: {
    Button: {
      buttonStyle: {
        width: 200,
      }
    },
  },
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
  },
  darkColors: {
    primary: '#000',
  },
  mode: 'light',
  });