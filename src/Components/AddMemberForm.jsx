import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Members from "./Members";
import FetchHelper from "../FetchHelper";
import { useTranslation } from "react-i18next";

function AddMemberForm({
  recipeSlug,
  owner,
  currentUser,
  members,
  onMembersUpdate,
}) {
  const [show, setShow] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [warning, setWarning] = useState("");
  const [deleteWarning, setDeleteWarning] = useState("");
  const { t } = useTranslation();

  const handleClose = () => {
    setWarning("");
    setNewMemberName("");
    setShow(false);
  };

  const handleAddMember = async (e) => {
    e.preventDefault();

    if (currentUser.id !== owner.id) {
      setWarning(t("errors.onlyOwnerAddMembers"));
      return;
    }

    if (!newMemberName.trim()) return;

    const newMember = {
      id: Date.now().toString(),
      name: newMemberName,
      ownerId: owner.id,
      userId: null,
    };

    await FetchHelper.member.create({ recipeSlug, member: newMember });

    handleClose();
    onMembersUpdate();
  };

  const handleRemoveMember = async (memberId) => {
    if (currentUser.id !== owner.id && memberId !== currentUser.id) {
      setDeleteWarning(t("errors.onlyOwnerRemoveMembers"));
      return;
    }

    await FetchHelper.member.delete({ recipeSlug, memberId });
    onMembersUpdate();
  };

  return (
    <>
      <Members
        owner={owner}
        members={members}
        onRemove={handleRemoveMember}
        deleteWarning={deleteWarning}
      />

      <div className="text-center mt-2">
        <Button onClick={() => setShow(true)}>{t("detail.addMember")}</Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("detail.addMember")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {warning && (
            <div style={{ color: "red", marginBottom: 10 }}>{warning}</div>
          )}

          <Form onSubmit={handleAddMember}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder={t("detail.memberNamePlaceholder")}
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                autoFocus
              />
            </Form.Group>

            <Modal.Footer>
              <Button onClick={handleClose}>{t("common.close")}</Button>
              <Button type="submit" variant="primary">
                {t("common.add")}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddMemberForm;
