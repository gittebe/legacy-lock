import { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import useStore from "../store/store";
import { Header } from "../components/Header";
import { SideMenu } from "../components/SideMenu";
import { ArrowLeftIcon } from "../ui/ArrowLeftIcon";
import { CapsuleDetailCard } from "../components/CapsuleDetailCard";
import "./CapsuleDetailsPage.css";

export const CapsuleDetailsPage = () => {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();

  const getCapsuleById = useStore((state) => state.getCapsuleById);
  const [capsuleDetails, setCapsuleDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const capsule = await getCapsuleById(id);
        setCapsuleDetails(capsule);
      } catch (error) {
        console.error("Error fetching capsule details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCapsule();
    else setLoading(false);
  }, [id, getCapsuleById]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return <p>Loading capsule details...</p>;
  }

  if (!capsuleDetails) {
    return <p>Capsule not found.</p>;
  }

  const { title, openAt } = capsuleDetails.data;

  return (
    <>
      <Header />
      <SideMenu />
      <div className="capsule-details-page">
        {/* Back Button */}
          <ArrowLeftIcon />

        {/* Title and Unlock Date */}
        <div className="title-container">
          <h1 className="capsule-title">{title || "Untitled Capsule"}</h1>
          <p className="capsule-unlock-date">Unlocked {new Date(openAt).toLocaleDateString()}</p>
        </div>

        {/* Capsule Detail Card */}
        <CapsuleDetailCard capsule={capsuleDetails} />
      </div>
    </>
  );
};
