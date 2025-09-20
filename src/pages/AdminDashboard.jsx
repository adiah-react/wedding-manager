import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { LogOutIcon, UserPlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GuestForm from "../components/GuestForm";
import GuestList from "../components/GuestList";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

const AdminDashboard = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGuest, setEditingGuest] = useState(null);

  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    fetchGuests();
  }, []);

  async function fetchGuests() {
    try {
      setLoading(true);
      const guestsSnapshot = await getDocs(collection(db, "guests"));
      const guestsList = guestsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGuests(guestsList);
    } catch (error) {
      console.error("Error fetching guests: ", error);
    } finally {
      setLoading(false);
    }
  }

  async function addGuest(guestData) {
    try {
      //  Generate a unique invitation code
      const invitationCode = Math.random().toString(36).substring(2, 10);
      // Add the guest with the invitation code
      await addDoc(collection(db, "guests"), {
        ...guestData,
        invitationCode,
        rsvpStatus: "pending",
        createdAt: new Date(),
      });
      fetchGuests();
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding guest:", error);
    }
  }

  async function updateGuest(id, guestData) {
    try {
      const guestRef = doc(db, "guests", id);
      await updateDoc(guestRef, guestData);
      fetchGuests();
      setEditingGuest(null);
    } catch (error) {
      console.error("Error updating guest:", error);
    }
  }

  async function deleteGuest(id) {
    if (window.confirm("Are you sure you want to delete this guest?")) {
      try {
        await deleteDoc(doc(db, "guests", id));
        fetchGuests();
      } catch (error) {
        console.error("Error deleting guest:", error);
      }
    }
  }

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Wedding Guest Manager
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Signed in as {currentUser?.email}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center text-sm text-gray-600 hover:text-rose-500"
            >
              <LogOutIcon className="h-4 w-4 mr-1" />
              Sign Out
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Guest List</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-md transition-colors"
          >
            <UserPlusIcon className="h-5 w-5 mr-2" />
            {showAddForm ? "Cancel" : "Add Guest"}
          </button>
        </div>
        {showAddForm && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Add New Guest
            </h3>
            <GuestForm onSubmit={addGuest} />
          </div>
        )}
        {editingGuest && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Edit Guest
            </h3>
            <GuestForm
              guest={editingGuest}
              onSubmit={(data) => updateGuest(editingGuest.id, data)}
              onCancel={() => setEditingGuest(null)}
            />
          </div>
        )}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading guests...</p>
          </div>
        ) : (
          <GuestList
            guests={guests}
            onEdit={setEditingGuest}
            onDelete={deleteGuest}
          />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
