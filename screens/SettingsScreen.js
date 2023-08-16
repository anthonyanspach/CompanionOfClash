import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadDarkModeSetting, saveDarkModeSetting } from '../store/DarkModeStorage';
import { useDarkMode, toggleDarkMode } from '../components/DarkModeContext';



const SettingsScreen = () => {
  const [isDarkModeEnabled, toggleDarkMode] = useDarkMode();

  const handleToggleDarkMode = async () => {
    try {
      toggleDarkMode();
      await saveDarkModeSetting(!isDarkModeEnabled);
    } catch (error) {
      console.error('Error toggling Dark Mode:', error);
    }
  };

  // Dark Mode setting
  const containerStyle = isDarkModeEnabled
    ? [styles.container, styles.darkContainer]
    : styles.container;

  const titleStyle = isDarkModeEnabled
    ? [styles.title, styles.darkTitle]
    : styles.title;

  const settingRowStyle = isDarkModeEnabled
    ? [styles.settingRow, styles.darkSettingRow]
    : styles.settingRow;

  const settingTextStyle = isDarkModeEnabled
    ? [styles.settingText, styles.darkSettingText]
    : styles.settingText;

  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>Settings</Text>
      <View style={settingRowStyle}>
        <Text style={settingTextStyle}>Dark Mode</Text>
        <Switch
          value={isDarkModeEnabled}
          onValueChange={toggleDarkModeEnabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkContainer: {
    backgroundColor: '#1c1c1c', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  darkTitle: {
    color: 'white', 
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  darkSettingRow: {
    borderColor: 'white', 
  },
  settingText: {
    fontSize: 16,
    marginRight: 10,
  },
  darkSettingText: {
    color: 'white', 
  },
});

export default SettingsScreen;