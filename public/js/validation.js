const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_PATTERN = /^[A-Za-z][A-Za-z '\-]{1,49}$/;

function validateDisplayName(value = "") {
  const name = String(value).trim();

  if (!name) {
    return "Display name is required.";
  }

  if (name.length < 2) {
    return "Display name must be at least 2 characters.";
  }

  if (name.length > 50) {
    return "Display name must be 50 characters or fewer.";
  }

  if (!NAME_PATTERN.test(name)) {
    return "Use letters, spaces, apostrophes, or hyphens only.";
  }

  return "";
}

function validateEmail(value = "") {
  const email = String(value).trim().toLowerCase();

  if (!email) {
    return "Email is required.";
  }

  if (!EMAIL_PATTERN.test(email)) {
    return "Enter a valid email address.";
  }

  return "";
}

function validateBio(value = "") {
  const bio = String(value);

  if (bio.length > 160) {
    return "Bio must be 160 characters or fewer.";
  }

  return "";
}

function validateTheme(value = "") {
  const allowed = ["light", "dark", "system"];

  if (!allowed.includes(value)) {
    return "Select a theme.";
  }

  return "";
}

function validateSettings(values = {}) {
  return {
    displayName: validateDisplayName(values.displayName),
    email: validateEmail(values.email),
    bio: validateBio(values.bio),
    theme: validateTheme(values.theme),
  };
}

window.SettingsValidation = {
  validateDisplayName,
  validateEmail,
  validateBio,
  validateTheme,
  validateSettings,
};