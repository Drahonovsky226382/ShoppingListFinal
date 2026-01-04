import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaRegEdit } from "react-icons/fa";
import FetchHelper from "../FetchHelper";
import { useTranslation } from "react-i18next";

function ShoppingListHeader({ recipe, currentUser, onTitleChange }) {
  const [edit, setEdit] = useState("");
  const [newTitle, setNewTitle] = useState(recipe.recipeName);
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  const handleShow = () => {
    setNewTitle(recipe.recipeName);
    setEdit("");
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSave = async () => {
    if (currentUser.id !== recipe.ownerId) {
      setEdit(t("errors.onlyOwnerEditTitle"));
      return;
    }

    const result = await FetchHelper.recipe.update({
      id: recipe.id,
      recipeName: newTitle,
    });

    if (!result.ok) {
      setEdit(t("errors.failedToUpdateTitle"));
      return;
    }

    onTitleChange(newTitle);
    setShow(false);
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h1 className="fw-bold">{recipe.recipeName}</h1>

      <FaRegEdit
        onClick={handleShow}
        style={{ fontSize: "28px", cursor: "pointer", color: "#0d6efd" }}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("detail.editRecipeTitle")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {edit && (
            <div style={{ color: "red", marginBottom: "10px" }}>{edit}</div>
          )}
          <input
            type="text"
            className="form-control"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder={t("detail.newTitlePlaceholder")}
            autoFocus
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("common.cancel")}
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {t("common.saveChanges")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ShoppingListHeader;
