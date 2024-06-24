//Register user
export const register = async (req, res, next) => {
  try {
    return res.message201("User created successfully");
  } catch (error) {
    return next(error);
  }
};

//Login user
export const login = (req, res, next) => {
  try {
    return res
      .cookie("token", req.token, { signedCookie: true })
      .message200("Login successful");
  } catch (error) {
    return next(error);
  }
};

//Online User
export const online = async (req, res, next) => {
  try {
    return req.cookies.token
      ? res.response200(req.user)
      : res.error404("Invalid credentials from signout!");
  } catch (error) {
    return next(error);
  }
};

//Log out user
export const signout = async (req, res, next) => {
  try {
    return req.cookies.token
      ? res.clearCookie("token").message200("Signed out!")
      : res.error404("Invalid credentials from signout!");
  } catch (error) {
    return next(error);
  }
};
