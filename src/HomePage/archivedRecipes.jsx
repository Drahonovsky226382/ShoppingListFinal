import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import FetchHelper from "../FetchHelper";
import PendingItem from "../PendingItem";
import { useTranslation } from "react-i18next";

function Archived() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const fetchRecipes = async () => {
    setStatus("pending");
    const result = await FetchHelper.recipe.list();
    if (result.ok) {
      setRecipes(result.data);
      setStatus("ready");
    } else {
      setError(t("errors.loadRecipes"));
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleUnarchive = async (id) => {
    await FetchHelper.recipe.update({ id, archived: false });
    fetchRecipes();
  };

  if (status === "pending") return <PendingItem />;
  if (status === "error") return <p>{error}</p>;

  return (
    <div style={{ padding: 32 }}>
      <div
        onClick={() => navigate(-1)}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          marginBottom: 16,
          fontSize: "1.5rem",
          gap: 8,
        }}
      >
        <IoArrowBack />
        <span>{t("common.back")}</span>
      </div>

      <h2>{t("archived.title")}</h2>
      {recipes
        .filter((r) => r.archived)
        .map((r) => (
          <div
            key={r.id}
            className="border rounded p-2 mb-2 d-flex justify-content-between"
          >
            <h5>{r.recipeName}</h5>
            <button
              className="btn btn-sm btn-success"
              onClick={() => handleUnarchive(r.id)}
            >
              {t("archived.unarchive")}
            </button>
          </div>
        ))}
    </div>
  );
}

export default Archived;
