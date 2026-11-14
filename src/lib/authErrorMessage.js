const authErrorMessageIds = {
  "auth/invalid-email": "auth.error.invalidEmail",
  "auth/email-already-in-use": "auth.register.error.emailInUse",
  "auth/weak-password": "auth.register.error.weakPassword",
  "auth/too-many-requests": "auth.error.tooManyRequests",
  "auth/network-request-failed": "auth.error.network",
  "auth/popup-blocked": "auth.error.popupBlocked",
  "auth/popup-closed-by-user": "auth.error.popupCancelled",
  "auth/cancelled-popup-request": "auth.error.popupCancelled",
  "auth/user-disabled": "auth.error.userDisabled",
  "auth/operation-not-allowed": "auth.error.operationNotAllowed",
};

export function getAuthErrorMessageId(error, fallbackId) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    return authErrorMessageIds[error.code] ?? fallbackId;
  }

  return fallbackId;
}
