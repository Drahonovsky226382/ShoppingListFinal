import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import FetchHelper from "../FetchHelper";
import { useTranslation } from "react-i18next";

function AddRecipe({ currentUser, onAdded }) {
  const [show, setShow] = useState(false);
  const [newRecipeName, setNewRecipeName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (!currentUser) return null; // ochrana

  const handleClose = () => {
    setError("");
    setNewRecipeName("");
    setShow(false);
  };

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    setError("");

    if (!newRecipeName.trim()) {
      setError(t("errors.recipeNameEmpty"));
      return;
    }

    const slug = newRecipeName.toLowerCase().replace(/\s+/g, "");

    const dtoIn = {
      recipeName: newRecipeName,
      slug,
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      archived: false,
    };

    const result = await FetchHelper.recipe.create(dtoIn);

    if (!result.ok) {
      if (result.status === 409) {
        setError(t("errors.recipeExists"));
      } else {
        setError(t("errors.createRecipe"));
      }
      return;
    }

    if (onAdded) onAdded();

    handleClose();
  };

  return (
    <div style={{ padding: 32 }} className="d-flex justify-content-between">
      <Button variant="primary" onClick={() => setShow(true)}>
        {t("recipe.addRecipe")}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("recipe.addRecipeTitle")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleAddRecipe}>
            <Form.Group className="mb-3" controlId="formRecipeName">
              <Form.Control
                type="text"
                placeholder={t("recipe.recipeNamePlaceholder")}
                value={newRecipeName}
                onChange={(e) => setNewRecipeName(e.target.value)}
                autoFocus
              />
            </Form.Group>

            {error && (
              <div style={{ color: "red", marginBottom: 10 }}>{error}</div>
            )}

            <Button variant="primary" type="submit">
              {t("common.add")}
            </Button>

            <Button
              variant="secondary"
              onClick={handleClose}
              style={{ marginLeft: 10 }}
            >
              {t("common.close")}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <button
        className="btn btn-secondary"
        onClick={() => navigate("/archived")}
      >
        {t("list.viewArchived")}
      </button>
    </div>
  );
}

export default AddRecipe;
