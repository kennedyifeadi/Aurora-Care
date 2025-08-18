
import { useState } from "react";
import { Input } from "./Input";
import { MdOutlineArrowRightAlt } from "react-icons/md";

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [form, setForm] = useState({
    motherName: "",
    pregnancyMonth: "",
    doctorPhone: "",
    doctorEmail: "",
    contact: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.motherName || !form.pregnancyMonth || !form.doctorPhone || !form.doctorEmail || !form.contact) {
      setError("Please fill all fields.");
      return;
    }
    localStorage.setItem("userData", JSON.stringify([
      form.motherName,
      form.pregnancyMonth,
      form.doctorPhone,
      form.doctorEmail,
      form.contact
    ]));
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onComplete();
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative h-[70dvh] overflow-auto">
      <h2 className="text-2xl font-bold text-[#8d4ed6] text-center">Welcome to AuroraCare</h2>
      <p className="mb-2 text-gray-600 text-center">Please provide the following details to get started</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Mother's Name</label>
          <Input name="motherName" type="text" value={form.motherName} onChange={handleChange} placeholder="Enter mother's name" />
          <p className="text-xs text-gray-500 mt-1">Full name of the expectant mother.</p>
        </div>
        <div>
          <label className="block font-medium mb-1">Pregnancy Month</label>
          <select name="pregnancyMonth" value={form.pregnancyMonth} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8d4ed6]">
            <option value="">Select month</option>
            {[...Array(9)].map((_, i) => (
              <option key={i + 1} value={String(i + 1)}>month {i + 1}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">Current month of pregnancy (1-9).</p>
        </div>
        <div>
          <label className="block font-medium mb-1">Doctor's Phone Number</label>
          <Input name="doctorPhone" type="text" value={form.doctorPhone} onChange={handleChange} placeholder="Enter doctor's phone number" />
          <p className="text-xs text-gray-500 mt-1">Phone number of your doctor for quick contact.</p>
        </div>
        <div>
          <label className="block font-medium mb-1">Doctor's Email Address</label>
          <Input name="doctorEmail" type="email" value={form.doctorEmail} onChange={handleChange} placeholder="Enter doctor's email address" />
          <p className="text-xs text-gray-500 mt-1">Email address of your doctor for updates and communication.</p>
        </div>
        <div>
          <label className="block font-medium mb-1">Contact of Husband or Close Relative</label>
          <Input name="contact" type="text" value={form.contact} onChange={handleChange} placeholder="Enter phone number" />
          <p className="text-xs text-gray-500 mt-1">In case of emergencies.</p>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className={`w-full bg-[#8d4ed6] text-white py-2 rounded-lg font-semibold flex justify-center items-center ${loading ? "cursor-not-allowed" : "cursor-pointer"}`} disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center w-full">
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              Loading...
            </span>
          ) : (
            <>
              <span>Continue</span> <MdOutlineArrowRightAlt className="ml-1" size={20}/>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
