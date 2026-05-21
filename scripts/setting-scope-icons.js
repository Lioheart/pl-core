const MOD_ID = "PolishCore";

Hooks.on("renderSettingsConfig", (settings, htmlEl) => {
  const html = $(htmlEl);

  html.find(".form-group").each((_, group) => {
    const $group = $(group);

    const input = $group.find("input[name], select[name], textarea[name], range-picker[name]").first();
    if (input.length) {
      const id = input.attr("name");
      const setting = game.settings.settings.get(id);
      if (setting) addScopeIcon($group, setting.scope ?? "client", setting.requiresReload);
      return;
    }

    const button = $group.find("button[data-key]").first();
    if (button.length) {
      const key = button.data("key");
      const menu = game.settings.menus.get(key);
      if (menu) addScopeIcon($group, menu.restricted ? "world" : "client", false);
    }
  });
});

/**
 * @param {JQuery} group - .form-group
 * @param {"client" | "world"} scope
 * @param {boolean} requiresReload
 */
function addScopeIcon(group, scope, requiresReload) {
  const scopeIcon =
    scope === "world"
      ? `<i class="setting-scope-icon fa-duotone fa-solid fa-earth-americas" title="Ustawienie globalne (World)"></i>`
      : `<i class="setting-scope-icon fa-duotone fa-solid fa-user" title="Ustawienie lokalne (Client)"></i>`;

  const reloadIcon = requiresReload
    ? `<i class="setting-reload-icon fa-duotone fa-solid fa-triangle-exclamation" title="Wymaga ponownego uruchomienia"></i>`
    : "";

  const label = group.find("label").first();

  if (label.length) {
    // Usuń poprzednie nasze ikony
    label.find(".setting-scope-icon, .setting-reload-icon").remove();
    // Dodaj ikony na początek
    label.prepend(`${scopeIcon}${reloadIcon} `);
  }
}

