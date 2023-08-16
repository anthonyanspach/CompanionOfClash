import AsyncStorage from '@react-native-async-storage/async-storage';

const DARK_MODE_KEY = 'darkMode';

export const saveDarkModeSetting = async (enabled) => {
  try {
    await AsyncStorage.setItem(DARK_MODE_KEY, enabled ? 'true' : 'false');
  } catch (error) {
    console.error('Error saving dark mode setting:', error);
  }
};

export const loadDarkModeSetting = async () => {
  try {
    const darkModeSetting = await AsyncStorage.getItem(DARK_MODE_KEY);
    return darkModeSetting === 'true';
  } catch (error) {
    console.error('Error loading dark mode setting:', error);
    return false;
  }
};