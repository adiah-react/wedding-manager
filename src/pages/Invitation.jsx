import { collection, getDocs, query, where } from "firebase/firestore";
import { HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import InvitationDetails from "../components/InvitationDetails";
import PhotoUpload from "../components/PhotoUpload";
import { db } from "../firebase";

export default function Invitation() {
  const { inviteCode } = useParams();
  const [guest, setGuest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  // Get the current date for checking if it's the wedding day
  const currentDate = new Date();
  // Set your wedding date here (YYYY, MM-1, DD) - Month is 0-indexed
  const weddingDate = new Date(2024, 5, 15); // Example: June 15, 2024
  // Check if today is the wedding day
  const isWeddingDay =
    currentDate.toDateString() === weddingDate.toDateString();
  // For testing purposes, you can uncomment this line to simulate the wedding day
  // const isWeddingDay = true;
  useEffect(() => {
    async function fetchGuestData() {
      if (!inviteCode) {
        setError("Invalid invitation code");
        setLoading(false);
        return;
      }
      try {
        const guestsRef = collection(db, "guests");
        const q = query(guestsRef, where("invitationCode", "==", inviteCode));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setError("Invitation not found");
        } else {
          const guestData = {
            id: querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data(),
          };
          setGuest(guestData);
        }
      } catch (error) {
        console.error("Error fetching invitation:", error);
        setError("Failed to load invitation");
      } finally {
        setLoading(false);
      }
    }
    fetchGuestData();
  }, [inviteCode]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="text-center">
          <HeartIcon className="h-12 w-12 text-rose-500 mx-auto animate-pulse" />
          <p className="mt-4 text-gray-600">Loading your invitation...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-md transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }
  if (!guest) {
    return <Navigate to="/" />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <HeartIcon className="h-16 w-16 text-rose-500 mx-auto" />
          <h1 className="mt-4 text-4xl font-serif font-bold text-gray-800">
            Our Wedding
          </h1>
          <p className="mt-2 text-xl text-gray-600">
            We're delighted to have you join us!
          </p>
          <div className="mt-4">
            <p className="text-lg font-medium text-rose-600">
              Welcome, {guest.name}!
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === "details"
                  ? "text-rose-600 border-b-2 border-rose-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("details")}
            >
              Invitation Details
            </button>
            {isWeddingDay && (
              <button
                className={`flex-1 py-4 px-6 text-center font-medium ${
                  activeTab === "share"
                    ? "text-rose-600 border-b-2 border-rose-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("share")}
              >
                Share Photos & Messages
              </button>
            )}
          </div>
          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "details" && <InvitationDetails guest={guest} />}
            {activeTab === "share" && isWeddingDay && (
              <PhotoUpload guestId={guest.id} guestName={guest.name} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
