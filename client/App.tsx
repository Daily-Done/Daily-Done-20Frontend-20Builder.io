import "./global.css";
import { createRoot } from "react-dom/client";

const App = () => (
  <div className="min-h-screen bg-blue-500 text-white flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold">🤝 DailyDone</h1>
      <p className="text-xl mt-4">Neighborhood Helper Platform</p>
      <p className="mt-2">App is running successfully!</p>
    </div>
  </div>
);

createRoot(document.getElementById("root")!).render(<App />);
