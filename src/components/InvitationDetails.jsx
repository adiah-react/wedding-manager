import { doc, updateDoc } from "firebase/firestore";
import {
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  MapIcon,
  MapPinIcon,
  MusicIcon,
  UtensilsIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { db } from "../firebase";

const InvitationDetails = ({ guest }) => {
  const [rsvpStatus, setRsvpStatus] = useState(guest.rsvpStatus);
  const [additionalGuests, setAdditionalGuests] = useState(
    guest.additionalGuests
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleRsvp = async (status) => {
    try {
      setSubmitting(true);
      const guestRef = doc(db, "guests", guest.id);
      await updateDoc(guestRef, {
        rsvpStatus: status,
        additionalGuests: status === "confirmed" ? additionalGuests : 0,
      });
      setRsvpStatus(status);
      setSubmitted(true);
    } catch (error) {
      console.error("Error updating RSVP:", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold text-gray-800">
          Jane & John
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          Request the pleasure of your company at their wedding
        </p>
        <p className="mt-4 text-xl font-medium text-rose-600">June 15, 2024</p>
      </div>
      {/* Ceremony Details */}
      <div className="border-t border-b border-gray-200 py-6">
        <h3 className="text-xl font-serif font-semibold text-gray-800 mb-4 flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2 text-rose-500" />
          Ceremony
        </h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <ClockIcon className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium">2:00 PM</p>
              <p className="text-sm text-gray-600">
                Please arrive 30 minutes early
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <MapPinIcon className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium">St. Mary's Church</p>
              <p className="text-sm text-gray-600">
                123 Wedding Lane, Cityville
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-rose-600 hover:text-rose-700 inline-flex items-center mt-1"
              >
                <MapIcon className="h-4 w-4 mr-1" />
                View on Map
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Reception Details - only shown if guest has reception access */}
      {guest.accessLevel === "ceremony+reception" && (
        <div className="border-b border-gray-200 py-6">
          <h3 className="text-xl font-serif font-semibold text-gray-800 mb-4 flex items-center">
            <UtensilsIcon className="h-5 w-5 mr-2 text-rose-500" />
            Reception
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <ClockIcon className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">5:00 PM - 11:00 PM</p>
                <p className="text-sm text-gray-600">
                  Dinner will be served at 6:30 PM
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPinIcon className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Grand Ballroom, Luxury Hotel</p>
                <p className="text-sm text-gray-600">
                  456 Celebration Avenue, Cityville
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-rose-600 hover:text-rose-700 inline-flex items-center mt-1"
                >
                  <MapIcon className="h-4 w-4 mr-1" />
                  View on Map
                </a>
              </div>
            </div>
            <div className="flex items-start">
              <MusicIcon className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Entertainment</p>
                <p className="text-sm text-gray-600">Live band and DJ</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* RSVP Section */}
      <div className="py-6">
        <h3 className="text-xl font-serif font-semibold text-gray-800 mb-4">
          RSVP
        </h3>
        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex">
              <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <p className="font-medium text-green-800">
                  Thank you for your response!
                </p>
                <p className="text-sm text-green-700 mt-1">
                  {rsvpStatus === "confirmed"
                    ? `We look forward to seeing you${
                        additionalGuests > 0
                          ? ` and your ${additionalGuests} guest${
                              additionalGuests > 1 ? "s" : ""
                            }`
                          : ""
                      }!`
                    : "We're sorry you can't make it, but thank you for letting us know."}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm text-green-700 underline mt-2"
                >
                  Change response
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleRsvp("confirmed")}
                disabled={submitting}
                className={`flex-1 py-3 px-4 rounded-md flex justify-center items-center ${
                  submitting
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-green-100 hover:bg-green-200 text-green-800"
                }`}
              >
                <CheckIcon className="h-5 w-5 mr-2" />
                I'll be there
              </button>
              <button
                onClick={() => handleRsvp("declined")}
                disabled={submitting}
                className={`flex-1 py-3 px-4 rounded-md flex justify-center items-center ${
                  submitting
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-red-100 hover:bg-red-200 text-red-800"
                }`}
              >
                <XIcon className="h-5 w-5 mr-2" />I can't make it
              </button>
            </div>
            <div>
              <label
                htmlFor="additionalGuests"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Number of additional guests (if allowed)
              </label>
              <input
                id="additionalGuests"
                type="number"
                min="0"
                max="5"
                value={additionalGuests}
                onChange={(e) => setAdditionalGuests(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Please confirm the number of additional guests attending with
                you.
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Additional Information */}
      <div className="bg-gray-50 p-6 rounded-md">
        <h3 className="text-lg font-medium text-gray-800 mb-3">
          Additional Information
        </h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>Dress code: Semi-formal</li>
          <li>Parking is available at both venues</li>
          <li>Please let us know of any dietary restrictions</li>
          <li>
            For any questions, contact our wedding planner at
            wedding@example.com
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InvitationDetails;
