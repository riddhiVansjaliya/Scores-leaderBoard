import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PlayerList from "./PlayerList";
import playersJson from '../data/data.json'

// Constants
const TRANSLATE_FACTOR = 75; // Factor to determine vertical spacing between players
const SCORE_UPDATE_INTERVAL = 1000; // Interval for updating player scores

// Interface for Player object
interface Player {
  userID: string;
  displayName: string;
  picture: string;
  lastScore: number; // Previous score of the player
  score: number; // Current score of the player
  translateY: number; // Vertical position of the player on the leaderboard
}

// Function to update scores of players randomly
const updateScores = (players: Player[]): Player[] => {
  return players.map((player) => ({
    ...player,
    lastScore: player.score,
    score: player.score + Math.floor(Math.random() * 10000) // Incrementing score randomly
  }));
};

// Function to sort leaderboard based on scores
const rearrangeLeaderboard = (players: Player[]): Player[] => {
  return [...players].sort((a, b) => b.score - a.score); // Sorting players based on their scores in descending order
};

// Function to calculate translateY for sorted players
const sortedPlayersWithTranslate = (sortedPlayers: Player[], originalPlayers: Player[]) => {
  const updatedSortedPlayers = sortedPlayers.map((sortedPlayer, sortedIndex) => {
    const originalIndex = originalPlayers.findIndex(originalPlayer => originalPlayer.userID === sortedPlayer.userID);
    if (originalIndex !== -1) {
      // Calculate vertical position based on the difference between original and sorted indices
      const translateY = originalPlayers[originalIndex].translateY + ((sortedIndex - originalIndex) * TRANSLATE_FACTOR);
      return { ...sortedPlayer, translateY };
    } else {
      return sortedPlayer;
    }
  });

  return updatedSortedPlayers;
}

function LeaderBoard() {
  const [players, setPlayers] = useState<Player[]>([]); // State for storing player data
  const [originalPlayers, setOriginalPlayers] = useState<Player[]>([]); // State for storing original player data
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]); // State for storing sorted player data

  // useEffect hook to initialize players
  useEffect(() => {
    const initialPlayers: Player[] = [
      ...playersJson
    ];
    setOriginalPlayers(initialPlayers);
    setSortedPlayers(initialPlayers);
    setPlayers(initialPlayers);
  }, []);

  // useEffect hook to update scores and rearrange leaderboard at intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setOriginalPlayers(sortedPlayers); // Update original players with the latest sorted players
      const updatedPlayers = updateScores(sortedPlayers); // Update player scores randomly
      const rearrangedPlayers = rearrangeLeaderboard(updatedPlayers); // Rearrange players based on updated scores
      const sortedPlayersWithTranslateY = sortedPlayersWithTranslate(rearrangedPlayers, originalPlayers); // Calculate translateY for sorted players
      setSortedPlayers(sortedPlayersWithTranslateY); // Update state with sorted players and translateY values
    }, SCORE_UPDATE_INTERVAL);

    return () => clearInterval(interval); // Cleanup function to clear the interval
  });

  return (
    <LeaderboardContainer>
      <LeaderBoardHeader>Leaderboard</LeaderBoardHeader>
      <PlayerList originalPlayers={players} sortedPlayers={sortedPlayers}></PlayerList>
    </LeaderboardContainer>
  )
}

// Styled components
const LeaderboardContainer = styled.div`
  margin: 0 auto;
`;

const LeaderBoardHeader = styled.div`
text-align: center;
text-transform: uppercase;
font-weight: 500;
font-size: 36px;
color: #8b00ff; /* Header title color */
margin: 24px 0px;
background-color: #7FFF00; /* Header background color */
padding: 16px;
`;

export default LeaderBoard;
