import { useEffect, useState } from "react";

const GuestForm = ({ guest, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    accessLevel: "ceremony",
    additionalGuests: 0,
    specialRequirements: "",
  });

  useEffect(() => {
    if (guest) {
      setFormData({
        name: guest.name || "",
        email: guest.email || "",
        phone: guest.phone || "",
        accessLevel: guest.accessLevel || "ceremony",
        additionalGuests: guest.additionalGuests || 0,
        specialRequirements: guest.specialRequirements || "",
      });
    }
  }, [guest]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            id="phone"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
        <div>
          <label
            htmlFor="accessLevel"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Access Level *
          </label>
          <select
            name="accessLevel"
            id="accessLevel"
            value={formData.accessLevel}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option value="ceremony">Ceremony Only</option>
            <option value="ceremony+reception">Ceremony & Reception</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="additionalGuests"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Additional Guests
          </label>
          <input
            type="number"
            name="additionalGuests"
            id="additionalGuests"
            min="0"
            value={formData.additionalGuests}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
        <div>
          <label
            htmlFor="specialRequirements"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Special Requirements / Notes
          </label>
          <textarea
            name="specialRequirements"
            id="specialRequirements"
            rows={3}
            value={formData.specialRequirements}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
        <div className="flex justify-end space-x-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          >
            {guest ? "Update Guest" : "Add Guest"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default GuestForm;
