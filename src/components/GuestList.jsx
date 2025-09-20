import {
  EditIcon,
  LinkIcon,
  TrashIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { useState } from "react";

const GuestList = ({ guests, onEdit, onDelete }) => {
  const [copiedId, setCopiedId] = useState(null);

  const copyInviteLink = (invitationCode, guestId) => {
    const link = `${window.location.origin}/invitation/${invitationCode}`;
    navigator.clipboard.writeText(link);
    setCopiedId(guestId);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const getAccessLevelIcon = (accessLevel) => {
    return accessLevel === "ceremony+reception" ? (
      <UsersIcon
        className="h-5 w-5 text-green-500"
        title="Ceremony & Reception"
      />
    ) : (
      <UserIcon className="h-5 w-5 text-blue-500" title="Ceremony Only" />
    );
  };

  const getRsvpStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "declined":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (guests.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">No guests added yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Guest
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Access
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                RSVP Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Additional Guests
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Invitation
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {guests.map((guest) => (
              <tr key={guest.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {guest.name}
                  </div>
                  <div className="text-sm text-gray-500">{guest.email}</div>
                  {guest.phone && (
                    <div className="text-sm text-gray-500">{guest.phone}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getAccessLevelIcon(guest.accessLevel)}
                    <span className="ml-2 text-sm text-gray-700">
                      {guest.accessLevel === "ceremony+reception"
                        ? "Ceremony & Reception"
                        : "Ceremony Only"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRsvpStatusColor(
                      guest.rsvpStatus
                    )}`}
                  >
                    {guest.rsvpStatus.charAt(0).toUpperCase() +
                      guest.rsvpStatus.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {guest.additionalGuests}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() =>
                      copyInviteLink(guest.invitationCode, guest.id)
                    }
                    className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-900"
                  >
                    <LinkIcon className="h-4 w-4 mr-1" />
                    {copiedId === guest.id ? "Copied!" : "Copy Link"}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(guest)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <EditIcon className="h-5 w-5" />
                    <span className="sr-only">Edit</span>
                  </button>
                  <button
                    onClick={() => onDelete(guest.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5" />
                    <span className="sr-only">Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuestList;
