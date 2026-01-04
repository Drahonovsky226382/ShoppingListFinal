import "./App.css";
import { Routes, Route } from "react-router-dom";
import { UserProvider, UserSelector } from "./user";
import HomePage from "./HomePage/HomePage";
import ShoppingListPage from "./Components/ShoppingListPage";
import Archived from "./HomePage/archivedRecipes";
import { ThemeProvider } from "./theme";
import ThemeToggle from "./Components/ThemeToggle";
import LanguageSelector from "./LanguageSelector";

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <div className="container-fluid py-3">
          <div className="d-flex flex-column flex-md-row gap-2 align-items-start align-items-md-center justify-content-between">
            <UserSelector />
            <div className="d-flex gap-2">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/archived" element={<Archived />} />
          <Route path="/:recipeSlug" element={<ShoppingListPage />} />
        </Routes>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
