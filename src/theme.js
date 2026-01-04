import React from "react";

const ThemeContext = React.createContext(null);
export const useTheme = () => React.useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(
    () => localStorage.getItem("theme") || "light"
  );

  React.useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const value = React.useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
