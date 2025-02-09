import { ClockIcon } from "../ui/ClockIcon";

export const LocketCountdown = ({ nextLocket, timeLeft }) => {
  return (
    <div className="locket-content">
      {nextLocket ? (
        <>
          <p>Your latest locket is opening on</p>
          <div className="locket-date">
            <ClockIcon />
            <span>{new Date(nextLocket.openAt).toLocaleString()}</span>
          </div>
          <p className="countdown-text">{timeLeft}</p>
        </>
      ) : (
        <p className="countdown-text">No upcoming lockets</p>
      )}
    </div>
  );
};