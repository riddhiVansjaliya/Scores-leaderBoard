import styled from "styled-components";
import PlayerScore from "./PlayerScore";

// Interface for Player object
interface Player {
    userID: string;
    displayName: string;
    picture: string;
    lastScore: number; // Previous score of the player
    score: number; // Current score of the player
    translateY: number; // Vertical position of the player on the leaderboard
}

// PlayerList component renders a list of players with their scores
function PlayerList({ originalPlayers, sortedPlayers }: { originalPlayers: Player[], sortedPlayers: Player[] }) {
    // Rendering the list of players
    return (
        <PlayerListContainer>
            {originalPlayers.map((player, index) => {
                // Finding corresponding sorted player
                const sortedPlayer = sortedPlayers.find((p) => p.userID === player.userID);
                return (
                    <PlayerData key={player.userID} translateY={sortedPlayer?.translateY}>
                        {/* Rendering player position */}
                        <PlayerPosition>{sortedPlayers.findIndex((v) => v.userID === player.userID) + 1}</PlayerPosition>
                        <PlayerDetails>
                            {/* Rendering player picture and name */}
                            <ProfileImage src={player.picture} alt={player.displayName} />
                            <PlayerName>{player.displayName}</PlayerName>
                        </PlayerDetails>
                        {/* Rendering PlayerScore component */}
                        <PlayerScore lastScore={Number(sortedPlayer?.lastScore)} currentScore={Number(sortedPlayer?.score)} /> <PT>points</PT>
                    </PlayerData>
                )
            })}
        </PlayerListContainer>
    )
}

// Styled components for PlayerList

// Container for the player list
const PlayerListContainer = styled.div`
  overflow-y: auto; /* Enable vertical scrolling */
  position: relative; /* Positioning context for absolute positioning of player items */
`;

// Styling for each player item
const PlayerData = styled.div<{ translateY: any }>`
  display: flex; /* Display items in a row */
  align-items: center; /* Vertically center items */
  padding: 10px; /* Padding around each player item */
  height: 53px; /* Fixed height for each player item */
  background-color: #fff; /* Background color of each player item */

  /* Applying transition for smooth translateY animation */
  transform: translateY(${props => props.translateY}px); /* Apply vertical translation to animate player movement */

  transition: transform 1s ease; /* Smooth transition effect for player movement */
`;

// Styling for player position element
const PlayerPosition = styled.div`
  flex: 0 0 50px; /* Fixed width for player position */
  text-align: center; /* Center-align text */
  color:red; /* Red color for player position */
  font-weight:600; /* Bold font weight for player position */
`;

// Styling for player details container
const PlayerDetails = styled.div`
  flex: 1; /* Grow to fill remaining space */
  display: flex; /* Display items in a row */
  align-items: center; /* Vertically center items */
`;

// Styling for player picture
const ProfileImage = styled.img`
  width: 40px; /* Fixed width for player picture */
  height: 40px; /* Fixed height for player picture */
  border-radius: 50%; /* Apply border radius for circular shape */
  margin-right: 10px; /* Margin to separate picture from player name */
  background-color: aliceblue; /* Fallback background color */
  object-fit: cover; /* Maintain aspect ratio and cover container */
`;

// Styling for player name
const PlayerName = styled.div`
  font-weight: bold; /* Bold font weight for player name */
  color: #fe67ab; /* Pink color for player name */
`;

// Styling for "pt" indicator
const PT = styled.div`
  font-weight: bold; /* Bold font weight for "pt" indicator */
  color: #49297e; /* Purple color for "pt" indicator */
`;

export default PlayerList;
