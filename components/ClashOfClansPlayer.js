import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const ClashOfClansPlayer = ({ playerTag }) => {
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    /*const fetchPlayerData = async () => {
      try {
        const response = await fetch(`https://api.clashofclans.com/v1/players/${playerTag}`, {
          headers: {
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImU1YjAyMGNkLTFlOGMtNGZmMi1iYTgzLWJmMjAyNjU1YjAxYiIsImlhdCI6MTY5MTQ2Mzk3MSwic3ViIjoiZGV2ZWxvcGVyL2VmZjJhNWVhLTIwZWUtNWU0OS00ODlkLTFmZDk2MjY1MzgwYyIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjI1NS4yNTUuMjU1LjAiXSwidHlwZSI6ImNsaWVudCJ9XX0.uVNYdcUnci_2GCosntKCnysRGpLMsukiEr97HeQE1cCtiCEbqJNyULN83nKcocoPeQ8cMYGfMRNix-qqNqly2g',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPlayerData(data);
        } else {
          console.error('API request failed');
        }
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    };

    fetchPlayerData();
    */
  }, [playerTag]);

  if (!playerData) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <Text>Name: {playerData.name}</Text>
      <Text>Level: {playerData.expLevel}</Text>
      {/* Display other player data */}
    </View>
  );
};

export default ClashOfClansPlayer;