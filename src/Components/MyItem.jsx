import "bootstrap/dist/css/bootstrap.min.css";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { useTranslation } from "react-i18next";

function MyItems({ items, onToggle, onRemove }) {
  const { t } = useTranslation();
  return (
    <div className="mt-3">
      <h4 className="border-bottom border-dark pb-2 mb-4 fw-bold">
        {t("detail.groceries")}
      </h4>
      {items.length === 0 ? (
        <p className="text-muted fst-italic">{t("detail.listEmpty")}</p>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            className="d-flex justify-content-between align-items-center border rounded p-2 mb-2"
          >
            {item.checked ? (
              <MdCheckBox
                onClick={() => onToggle(item.id)}
                style={{
                  fontSize: "28px",
                  color: "green",
                  cursor: "pointer",
                }}
              />
            ) : (
              <MdCheckBoxOutlineBlank
                onClick={() => onToggle(item.id)}
                style={{
                  fontSize: "28px",
                  color: "gray",
                  cursor: "pointer",
                }}
              />
            )}

            <h7>{item.name}</h7>
            <TiDeleteOutline
              onClick={() => onRemove(item.id)}
              style={{ fontSize: "28px", cursor: "pointer", color: "red" }}
            />
          </div>
        ))
      )}
    </div>
  );
}
export default MyItems;
