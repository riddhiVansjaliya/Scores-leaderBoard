import styled, { keyframes } from "styled-components";

// Interface defining props for PlayerScore component
interface PlayerScoreProps {
    lastScore: number; // Previous score of the player
    currentScore: number; // Current score of the player
}

// PlayerScore component renders a container with animated score transition
function PlayerScore({ lastScore, currentScore }: PlayerScoreProps) {
    // Rendering the score container with scores
    return (
        <ScoreContainer>
            <Score lastScore={lastScore} currentScore={currentScore}></Score>
        </ScoreContainer>
    )
}

// Defining keyframes for score animation
const counter = (lastScore: number, currentScore: number) => keyframes`
  0% {
    --num: ${lastScore}; // Starting score is the last score
  }
  100% {
    --num:  ${currentScore}; // Ending score is the current score
  }
`;

// Styled components for PlayerScore component

// Container for the score component
const ScoreContainer = styled.div`
  width: 100px; // Fixed width for the score container
  overflow: hidden; // Hide overflowing score content
`;

// Styling for the score component
const Score = styled.div<{ lastScore: number, currentScore: number }>`
  /* Defining custom property for the animation */
  ${`@property --num {
      syntax: "<integer>"; // Syntax for the custom property
      initial-value: 0; // Initial value for the custom property
      inherits: false; // Custom property does not inherit from parent elements
    }`
  }
  width: auto; // Automatically adjust width based on content
  text-align: end; // Align score text to the end of the container
  font-size: 16px; // Font size for the score text
  font-weight: bolder; // Bold font weight for emphasis
  color: #49297e; // Color for the score text

  /* Applying animation with keyframes */
  animation: 1s forwards normal ease-in-out ${props => counter(props.lastScore, props.currentScore)}; // Apply animation with defined keyframes
  counter-reset: number var(--num); // Reset the counter to the current score

  /* Rendering the score value */
  &::after {
    content: counter(number); // Display the score value using the counter
  }
`;

export default PlayerScore;
