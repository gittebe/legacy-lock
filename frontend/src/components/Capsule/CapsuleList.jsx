
const CapsuleCard = ({ capsule }) => {
  const { id, name, description } = capsule;
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{capsule.name}</h5>
        <p className="card-text">{capsule.description}</p>
        <Link to={`/capsules/${capsule.id}`} className="btn btn-primary">
          View Capsule
        </Link>
      </div>
    </div>
  );
}