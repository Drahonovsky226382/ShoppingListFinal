import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  cs: {
    translation: {
      common: {
        back: "Zpět",
        close: "Zavřít",
        add: "Přidat",
        cancel: "Zrušit",
        delete: "Smazat",
        saveChanges: "Uložit změny",
      },

      header: {
        user: "Uživatel",
      },

      theme: {
        light: "Světlý režim",
        dark: "Tmavý režim",
      },

      lang: {
        cs: "Čeština",
        en: "English",
      },

      errors: {
        loadRecipes: "Nepodařilo se načíst recepty",
        loadMembers: "Nepodařilo se načíst členy.",
        loadItems: "Nepodařilo se načíst položky.",
        createRecipe: "Nepodařilo se vytvořit recept.",
        recipeExists: "Recept s tímto názvem už existuje.",
        recipeNameEmpty: "Název receptu nemůže být prázdný.",
        updateTitleFailed: "Nepodařilo se změnit název.",
        onlyOwnerEditTitle: "Pouze vlastník může upravit název.",
        onlyOwnerAddMembers: "Pouze vlastník může přidávat členy.",
        onlyOwnerRemoveMembers: "Pouze vlastník může odebírat členy.",
      },

      list: {
        myRecipes: "Moje recepty",
        viewArchived: "Zobrazit archiv",
        overviewChartTitle: "Přehled seznamů (počet položek)",
        noData: "Zatím tu nejsou žádná data pro graf.",
      },

      archived: {
        title: "Archivované recepty",
        unarchive: "Obnovit",
      },

      recipe: {
        owner: "Vlastník",
        addRecipe: "Přidat recept",
        addRecipeTitle: "Přidat recept",
        recipeNamePlaceholder: "Zadej název receptu",
      },

      deleteRecipe: {
        title: "Smazat recept",
        confirm: "Opravdu chceš smazat tento recept?",
      },

      detail: {
        groceries: "Nákupní seznam",
        members: "Členové",
        owner: "Vlastník",
        addMember: "Přidat člena",
        addMemberTitle: "Přidat člena",
        memberNamePlaceholder: "Zadej jméno",
        addItem: "Přidat položku",
        addItemTitle: "Přidat položku",
        itemNamePlaceholder: "Zadej položku",
        listEmpty: "Seznam je prázdný",
        editRecipeTitle: "Upravit název receptu",
        newTitlePlaceholder: "Zadej nový název",
        deleteMemberWarning: "Pouze vlastník může odebírat členy.",
        progressTitle: "Stav položek",
        checked: "Vyřešené",
        unchecked: "Nevyřešené",
        total: "Celkem",
      },
    },
  },

  en: {
    translation: {
      common: {
        back: "Back",
        close: "Close",
        add: "Add",
        cancel: "Cancel",
        delete: "Delete",
        saveChanges: "Save Changes",
      },

      header: {
        user: "User",
      },

      theme: {
        light: "Light mode",
        dark: "Dark mode",
      },

      lang: {
        cs: "Czech",
        en: "English",
      },

      errors: {
        loadRecipes: "Failed to load recipes",
        loadMembers: "Failed to load members.",
        loadItems: "Failed to load items.",
        createRecipe: "Failed to create recipe.",
        recipeExists: "A recipe with this name already exists.",
        recipeNameEmpty: "Recipe name cannot be empty.",
        updateTitleFailed: "Failed to update title.",
        onlyOwnerEditTitle: "Only owner can edit title name.",
        onlyOwnerAddMembers: "Only the owner can add members.",
        onlyOwnerRemoveMembers: "Only the owner can remove members.",
      },

      list: {
        myRecipes: "My Recipes",
        viewArchived: "View Archived",
        overviewChartTitle: "Shopping lists overview (items count)",
        noData: "No data to display yet.",
      },

      archived: {
        title: "Archived Recipes",
        unarchive: "Unarchive",
      },

      recipe: {
        owner: "Owner",
        addRecipe: "Add recipe",
        addRecipeTitle: "Add recipe",
        recipeNamePlaceholder: "Enter recipe name",
      },

      deleteRecipe: {
        title: "Delete recipe",
        confirm: "Are you sure you want to delete this recipe?",
      },

      detail: {
        groceries: "Groceries",
        members: "Members",
        owner: "Owner",
        addMember: "Add member",
        addMemberTitle: "Add Member",
        memberNamePlaceholder: "Enter name",
        addItem: "Add item",
        addItemTitle: "Add item",
        itemNamePlaceholder: "Enter item",
        listEmpty: "List is empty",
        editRecipeTitle: "Edit Recipe Title",
        newTitlePlaceholder: "Enter new title",
        deleteMemberWarning: "Only the owner can remove members.",
        progressTitle: "Items progress",
        checked: "Checked",
        unchecked: "Unchecked",
        total: "Total",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "cs",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
