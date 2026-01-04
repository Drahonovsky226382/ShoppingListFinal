import Form from "react-bootstrap/Form";
import i18n from "./i18n";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const { t } = useTranslation();

  const onChange = (e) => {
    const lng = e.target.value;
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <Form.Select
      style={{ width: 150 }}
      value={i18n.language}
      onChange={onChange}
    >
      <option value="cs">{t("lang.cs")}</option>
      <option value="en">{t("lang.en")}</option>
    </Form.Select>
  );
}
