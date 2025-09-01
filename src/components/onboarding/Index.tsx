import { useState } from "react";
import { Input } from "./Input";
import { MdOutlineArrowRightAlt, MdOutlineArrowBack } from "react-icons/md";

const steps = [
	{
		label: "Personal Details",
		fields: [
			{ name: "fullName", label: "Full Name", type: "text", placeholder: "Enter full name" },
			{ name: "age", label: "Age", type: "number", placeholder: "Enter age" },
			{ name: "patientId", label: "Patient ID", type: "text", placeholder: "Enter patient ID" },
			{ name: "bloodType", label: "Blood Type", type: "text", placeholder: "Enter blood type" },
			{ name: "gravidaPara", label: "Gravida/Para", type: "text", placeholder: "e.g. G2P1", desc: "Gravida: number of pregnancies. Para: number of births. (e.g. G2P1 means 2 pregnancies, 1 birth)" },
		],
	},
	{
		label: "Pregnancy Details",
		fields: [
			{ name: "gestationalAge", label: "Gestational Age (days)", type: "number", placeholder: "Enter gestational age in days" },
			{ name: "dueDate", label: "Expected Due Date", type: "date", placeholder: "Select due date" },
			{ name: "riskLevel", label: "Risk Level", type: "text", placeholder: "Enter risk level" },
			{ name: "deliveryPlan", label: "Delivery Plan", type: "select", options: ["Vaginal Delivery", "C-Section"] },
		],
	},
	{
		label: "Health Details",
		fields: [
			{ name: "conditions", label: "Conditions", type: "text", placeholder: "e.g. Hypertension" },
			{ name: "allergies", label: "Allergies", type: "text", placeholder: "List allergies" },
			{ name: "medications", label: "Medications", type: "text", placeholder: "List medications" },
		],
	},
	{
		label: "Contact Details",
		fields: [
			{ name: "email", label: "Email Address (Personal)", type: "email", placeholder: "Enter personal email" },
			{ name: "phone", label: "Phone Number (Personal)", type: "text", placeholder: "Enter personal phone" },
			{ name: "doctorPhone", label: "Phone Number of Doctor/Nurse", type: "text", placeholder: "Enter doctor/nurse phone" },
			{ name: "doctorEmail", label: "Email Address of Doctor/Nurse", type: "email", placeholder: "Enter doctor/nurse email" },
			{ name: "emergencyContact", label: "Emergency Contact (Phone)", type: "text", placeholder: "Enter emergency contact phone" },
			{ name: "emergencyRelationship", label: "Relationship with Emergency Contact", type: "text", placeholder: "e.g. Husband, Sister" },
		],
	},
];

interface OnboardingProps {
	onComplete: () => void;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
	const [step, setStep] = useState(0);
	const [form, setForm] = useState<{ [key: string]: any }>({});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [animating, setAnimating] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleNext = () => {
		// Validate required fields
		const requiredFields = steps[step].fields;
		for (let field of requiredFields) {
			if (!form[field.name]) {
				setError(`Please fill ${field.label}.`);
				return;
			}
		}
		setError("");
		setAnimating(true);
		setTimeout(() => {
			setAnimating(false);
			setStep((prev) => prev + 1);
		}, 400);
	};

	const handlePrev = () => {
		setAnimating(true);
		setTimeout(() => {
			setAnimating(false);
			setStep((prev) => prev - 1);
		}, 400);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Validate all fields
		for (let segment of steps) {
			for (let field of segment.fields) {
				if (!form[field.name]) {
					setError(`Please fill ${field.label}.`);
					return;
				}
			}
		}
		setError("");
		setLoading(true);
		localStorage.setItem("userData", JSON.stringify(form));
		setTimeout(() => {
			setLoading(false);
			onComplete();
		}, 1200);
	};

	return (
		<div className="bg-white rounded-xl shadow-xl p-4 md:p-8 w-full max-w-lg mx-auto relative min-h-[70dvh] flex flex-col justify-center items-center overflow-hidden">
			{/* Progress Bar */}
			<div className="flex items-center justify-center w-full mb-8">
				{steps.map((_, i) => (
					<div key={i} className="flex items-center">
						<div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-white transition-all duration-300
              ${i <= step ? 'bg-[#8d4ed6]' : 'bg-gray-300'}
              ${i === step ? 'scale-110 shadow-lg' : ''}`}>{i + 1}</div>
						{i < steps.length - 1 && (
							<div className={`h-2 w-8 md:w-16 bg-gray-300 rounded-full mx-1 md:mx-2 transition-all duration-300
                ${i < step ? 'bg-[#8d4ed6]' : ''}`}></div>
						)}
					</div>
				))}
			</div>
			{/* Animated Segment */}
			<form onSubmit={handleSubmit} className="w-full">
				<div className={`transition-all duration-400 ease-in-out relative ${animating ? 'opacity-0 -translate-x-20' : 'opacity-100 translate-x-0'} flex flex-col gap-4`}>
					<h2 className="text-xl md:text-2xl font-bold text-[#8d4ed6] text-center mb-2">{steps[step].label}</h2>
					{steps[step].fields.map((field: any) => (
						<div key={field.name} className="w-full">
							<label className="block font-medium mb-1">{field.label}</label>
							{field.type === 'select' ? (
								<select name={field.name} value={form[field.name] || ""} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8d4ed6]">
									<option value="">Select option</option>
									{field.options?.map((opt: any) => (
										<option key={opt} value={opt}>{opt}</option>
									))}
								</select>
							) : (
								<Input name={field.name} type={field.type} value={form[field.name] || ""} onChange={handleChange} placeholder={field.placeholder} />
							)}
							{field.desc && <p className="text-xs text-gray-500 mt-1">{field.desc}</p>}
						</div>
					))}
					{error && <p className="text-red-500 text-sm">{error}</p>}
				</div>
				{/* Navigation Buttons */}
				<div className="flex justify-between items-center mt-6">
					{step > 0 ? (
						<button type="button" onClick={handlePrev} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold flex items-center">
							<MdOutlineArrowBack className="mr-1" size={20}/> Previous
						</button>
					) : <div />}
					{step < steps.length - 1 ? (
						<button type="button" onClick={handleNext} className="bg-[#8d4ed6] text-white px-4 py-2 rounded-lg font-semibold flex items-center">
							Continue <MdOutlineArrowRightAlt className="ml-1" size={20}/>
						</button>
					) : (
						<button type="submit" className={`bg-[#8d4ed6] text-white px-4 py-2 rounded-lg font-semibold flex items-center ${loading ? "cursor-not-allowed" : "cursor-pointer"}`} disabled={loading}>
							{loading ? (
								<span className="flex items-center justify-center w-full">
									<svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
									</svg>
									Loading...
								</span>
							) : (
								<span>Finish</span>
							)}
						</button>
					)}
				</div>
			</form>
		</div>
	);
};
