import { useEffect, useState } from "react";
import axios from "axios";

const MedicineDetail = ({ drug }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDrugInfo = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.fda.gov/drug/label.json?search=openfda.generic_name:${drug}&limit=1`
        );
        setData(res.data.results[0]);
        setError("");
      } catch {
        setError("No detailed info found.");
      } finally {
        setLoading(false);
      }
    };

    fetchDrugInfo();
  }, [drug]);

  return (
    <div className="p-4 border rounded bg-gray-50 mt-4">
      <h4 className="text-lg font-bold mb-2">🔍 Details for: {drug}</h4>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {data && (
        <div className="text-left space-y-2 text-sm leading-6">
          <p><strong>📌 Purpose:</strong> {data.purpose?.[0] || "Not Available"}</p>
          <p><strong>💊 Usage:</strong> {data.indications_and_usage?.[0] || "Not Available"}</p>
          <p><strong>⚠️ Warnings:</strong> {data.warnings?.[0] || "Not Available"}</p>
          <p><strong>❗ Side Effects:</strong> {data.adverse_reactions?.[0] || "Not Available"}</p>
          <p><strong>🚫 Do Not Use:</strong> {data.do_not_use?.[0] || "Not Available"}</p>
          <p><strong>👨‍⚕️ Ask Doctor:</strong> {data.ask_doctor?.[0] || "Not Available"}</p>
          <p><strong>🍼 Pregnancy Warning:</strong> {data.pregnancy_or_breast_feeding?.[0] || "Not Available"}</p>
          <p><strong>📦 Dosage:</strong> {data.dosage_and_administration?.[0] || "Not Available"}</p>
          <p><strong>📦 Storage:</strong> {data.storage_and_handling?.[0] || "Not Available"}</p>
          <p><strong>🧪 Active Ingredient:</strong> {data.active_ingredient?.[0] || "Not Available"}</p>
          <p><strong>🏭 Manufacturer:</strong> {data.openfda?.manufacturer_name?.[0] || "Not Available"}</p>
        </div>
      )}
    </div>
  );
};

export default MedicineDetail;
