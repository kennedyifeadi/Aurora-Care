
import { useEffect, useState } from "react";
import { Onboarding } from "./components/onboarding/index";
import { MainLayout } from "./layout/MainLayout";

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      setShowOnboarding(true);
    } else {
      try {
        const arr = JSON.parse(userData);
        if (!Array.isArray(arr) || arr.length < 4) {
          setShowOnboarding(true);
        }
      } catch {
        setShowOnboarding(true);
      }
    }
  }, []);

  return (
    <div className="max-h-screen w-full relative">
      <div className={showOnboarding ? "blur-sm pointer-events-none" : ""}>
        <MainLayout />
      </div>
      {showOnboarding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000061] bg-opacity-40">
          <Onboarding onComplete={() => setShowOnboarding(false)} />
        </div>
      )}
    </div>
  );
}

export default App;
