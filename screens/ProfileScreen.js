import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDarkMode, toggleDarkMode } from '../components/DarkModeContext';
import { loadDarkModeSetting, saveDarkModeSetting } from '../store/DarkModeStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';



import ClashOfClansPlayer from '../components/ClashOfClansPlayer';

//Need to continue attempting to get the dark mode theme set to be on all screens. 

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { isDarkModeEnabled } = useDarkMode();

  const containerStyle = isDarkModeEnabled
    ? [styles.container, styles.darkContainer]
    : styles.container;

  const titleStyle = isDarkModeEnabled
    ? [styles.title, styles.darkTitle]
    : styles.title;

  const playerNameStyle = isDarkModeEnabled
    ? [styles.playerName, styles.darkPlayerName]
    : styles.playerName;

  const playerInfoStyle = isDarkModeEnabled
    ? [styles.playerInfo, styles.darkPlayerInfo]
    : styles.playerInfo;

  // dummy info, should either come from API
  const playerName = 'John Doe';
  const playerExp = '123';
  const playerTH = '11';
  const playerClanName = 'Khronic Klashers';
  const playerTrophies = '2500';
  const playerBuilderTrophies = '2500';
  const playerTag = '%23QUYYJYJJQ'; // Pretty sure %23 is the correct way to represent '#' for the api call. check when starting to test out the API.

  const GoSettingsScreen = () => {
    navigation.navigate('Settings');
  };


  return (
    <View style={isDarkModeEnabled ? styles.darkContainer : styles.container}>
      <ClashOfClansPlayer playerTag={playerTag} />
      <Text style={titleStyle}>Profile</Text>
      <Text style={playerNameStyle}>{playerName}</Text>
      <Text style={playerInfoStyle}>Experience: {playerExp}</Text>
      <Text style={playerInfoStyle}>Town Hall Level: TH{playerTH}</Text>
      <Text style={playerInfoStyle}>Clan: {playerClanName}</Text>

      <Button title="Settings" onPress={GoSettingsScreen} />
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
  playerName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  darkPlayerName: {
    color: 'white',
  },
  playerInfo: {
    fontSize: 16,
    marginTop: 10,
  },
  darkPlayerInfo: {
    color: 'white',
  },
});

export default ProfileScreen;