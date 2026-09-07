const STORAGE_KEY = "capstone-settings";

const form = document.getElementById("settings-form");
const statusEl = document.getElementById("form-status");
const bioInput = document.getElementById("bio");
const bioCount = document.getElementById("bio-count");

const fields = {
  displayName: document.getElementById("display-name"),
  email: document.getElementById("email"),
  bio: bioInput,
  theme: document.getElementById("theme"),
};

const validators = {
  displayName: window.SettingsValidation.validateDisplayName,
  email: window.SettingsValidation.validateEmail,
  bio: window.SettingsValidation.validateBio,
  theme: window.SettingsValidation.validateTheme,
};

function getFormValues() {
  return {
    displayName: fields.displayName.value,
    email: fields.email.value,
    bio: fields.bio.value,
    theme: fields.theme.value,
    emailNotifications: document.getElementById("email-notifications").checked,
    weeklyDigest: document.getElementById("weekly-digest").checked,
  };
}

function setFieldError(name, message) {
  const input = fields[name];
  const errorEl = document.getElementById(`${input.id}-error`);

  input.setAttribute("aria-invalid", message ? "true" : "false");
  errorEl.textContent = message;
}

function clearStatus() {
  statusEl.hidden = true;
  statusEl.textContent = "";
  statusEl.className = "status";
}

function showStatus(type, message) {
  statusEl.hidden = false;
  statusEl.className = `status status-${type}`;
  statusEl.textContent = message;
}

function updateBioCount() {
  bioCount.textContent = `${bioInput.value.length}/160`;
}

function loadSavedSettings() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return;
  }

  try {
    const saved = JSON.parse(raw);
    fields.displayName.value = saved.displayName || "";
    fields.email.value = saved.email || "";
    fields.bio.value = saved.bio || "";
    fields.theme.value = saved.theme || "system";
    document.getElementById("email-notifications").checked = Boolean(saved.emailNotifications);
    document.getElementById("weekly-digest").checked = Boolean(saved.weeklyDigest);
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }

  updateBioCount();
}

function validateField(name) {
  const message = validators[name](fields[name].value);
  setFieldError(name, message);
  return !message;
}

Object.keys(fields).forEach((name) => {
  fields[name].addEventListener("blur", () => {
    validateField(name);
  });

  fields[name].addEventListener("input", () => {
    if (fields[name].getAttribute("aria-invalid") === "true") {
      validateField(name);
    }
    clearStatus();
  });
});

bioInput.addEventListener("input", updateBioCount);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearStatus();

  const values = getFormValues();
  const errors = window.SettingsValidation.validateSettings(values);
  let isValid = true;

  Object.keys(errors).forEach((name) => {
    setFieldError(name, errors[name]);
    if (errors[name]) {
      isValid = false;
    }
  });

  if (!isValid) {
    showStatus("error", "Please fix the highlighted fields and try again.");
    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    if (firstInvalid) {
      firstInvalid.focus();
    }
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  showStatus("success", "Settings saved.");
});

form.addEventListener("reset", () => {
  window.setTimeout(() => {
    Object.keys(fields).forEach((name) => setFieldError(name, ""));
    clearStatus();
    updateBioCount();
  }, 0);
});

loadSavedSettings();
updateBioCount();
