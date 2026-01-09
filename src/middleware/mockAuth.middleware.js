export const mockAuth = (req, res, next) => {
  req.user = {
    uid: "test-firebase-uid-123",
    email: "test@example.com",
  };
  next();
};
