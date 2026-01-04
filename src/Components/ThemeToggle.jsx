import Button from "react-bootstrap/Button";
import { MdOutlineWbSunny, MdSunny } from "react-icons/md";
import { useTheme } from "../theme";
import { useTranslation } from "react-i18next";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const isDark = theme === "dark";

  return (
    <Button
      variant="outline-secondary"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={isDark ? t("theme.light") : t("theme.dark")}
      className="d-flex align-items-center justify-content-center"
    >
      {isDark ? <MdOutlineWbSunny size={22} /> : <MdSunny size={22} />}
    </Button>
  );
}
