import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FetchHelper from "../FetchHelper";
import { useTranslation } from "react-i18next";

function DeleteRecipe({ recipe, currentUser, onDelete, children }) {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  if (!recipe || !currentUser || !recipe.ownerId) return null;

  const isOwner = recipe.ownerId === currentUser.id;
  if (!isOwner) return null;

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShow(true);
  };

  const confirmDelete = async (e) => {
    e.stopPropagation();
    const result = await FetchHelper.recipe.delete({ id: recipe.id });
    if (result.ok && onDelete) {
      onDelete(recipe.id);
    }
    setShow(false);
  };

  return (
    <>
      <span onClick={handleDeleteClick}>{children}</span>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t("deleteRecipe.title")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{t("deleteRecipe.confirm")}</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            {t("common.cancel")}
          </Button>

          <Button variant="danger" onClick={confirmDelete}>
            {t("common.delete")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteRecipe;
