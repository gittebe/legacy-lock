
const CapsuleCard = ({ capsule }) => {
  const { title, message, media } = capsule;
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{capsule.title}</h5>
        <p className="card-message">{capsule.message}</p>
        <p className="card-media">{capsule.media}</p>
        <Link to={`/capsules/${capsule.id}`} className="btn btn-primary">
          View Capsule
        </Link>
      </div>
    </div>
  );
}