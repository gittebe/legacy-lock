import React, { useState } from "react";
import "./LearnMore.css";

export const LearnMoreButton = () => {
  const [showLearnMore, setShowLearnMore] = useState(false);

  const toggleLearnMore = () => {
    setShowLearnMore(!showLearnMore);
  };

  return (
    <>
      <button 
      className="learn-more-button" 
      onClick={toggleLearnMore}
      aria-expanded={showLearnMore}
      aria-controls="learn-more-content"
      >
        + Learn more
      </button>
      {showLearnMore && (
        <div className="learn-more-overlay" onClick={toggleLearnMore}>
          <div
            className="learn-more-container"
            onClick={(e) => e.stopPropagation()}
          >
            <p>
              Imagine sneaking a note into a secret vault that only opens in the
              future—no spoilers allowed! That’s the magic of our Virtual Time
              Capsule: lock away your photos and words of wisdom (or whimsy)
              today, and let them emerge exactly when they’re meant to. Ready to
              share a slice of tomorrow’s nostalgia? Dive in and start
              time-traveling… minus any space-time paradoxes!
            </p>
          </div>
        </div>
      )}
    </>
  );
};