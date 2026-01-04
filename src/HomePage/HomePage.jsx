import { useEffect, useState } from "react";
import { useUser } from "../user";
import FetchHelper from "../FetchHelper";
import PendingItem from "../PendingItem";
import OneRecipe from "./oneRecepie";
import AddRecipe from "./addRecepie";
import RecipesBarChart from "./RecipesBarChart";
import { useTranslation } from "react-i18next";

function HomePage() {
  const { t } = useTranslation();
  const currentUser = useUser();

  const [recipes, setRecipes] = useState([]);
  const [stats, setStats] = useState({}); // slug -> { itemsTotal, itemsChecked }

  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");

  const reload = async () => {
    try {
      setStatus("pending");
      setError("");

      const result = await FetchHelper.recipe.list();

      if (!result.ok) {
        setError(t("errors.loadRecipes"));
        setStatus("error");
        return;
      }

      const loadedRecipes = result.data || [];
      setRecipes(loadedRecipes);

      // spočítat položky pro každý recipeSlug
      const slugs = loadedRecipes.map((r) => r.slug).filter(Boolean);

      const pairs = await Promise.all(
        slugs.map(async (slug) => {
          const itemsRes = await FetchHelper.item.list({ recipeSlug: slug });
          const items = itemsRes?.ok ? itemsRes.data : [];
          const checked = items.filter((i) => i.checked).length;
          return [slug, { itemsTotal: items.length, itemsChecked: checked }];
        })
      );

      setStats(Object.fromEntries(pairs));
      setStatus("ready");
    } catch (e) {
      setError(t("errors.loadRecipes"));
      setStatus("error");
    }
  };

  useEffect(() => {
    reload();
  }, []);

  if (status === "pending") return <PendingItem />;
  if (status === "error") return <p>{error}</p>;

  const visibleRecipes = recipes
    .filter((r) => !r.archived)
    .filter((r) => r.ownerId === currentUser.id);

  const chartData = visibleRecipes.map((r) => ({
    recipeName: r.recipeName,
    itemsTotal: stats[r.slug]?.itemsTotal ?? 0,
  }));

  return (
    <>
      <OneRecipe
        recipes={recipes}
        setRecipes={setRecipes}
        currentUser={currentUser}
      />
      <AddRecipe currentUser={currentUser} onAdded={reload} />

      <div className="container-fluid" style={{ padding: 32 }}>
        <div className="border rounded p-3 mb-4">
          <h4 className="fw-bold mb-3">{t("list.overviewChartTitle")}</h4>

          {chartData.length === 0 ? (
            <p className="text-muted mb-0">{t("list.noData")}</p>
          ) : (
            <RecipesBarChart data={chartData} />
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
