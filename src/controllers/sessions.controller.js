//Create a new user
export const create = async (req, res, next) => {
  try {
    return res.message201("User created successfully");
  } catch (error) {
    return next(error);
  }
};

//login user
export const login = (req, res, next) => {
  try {
    return res
      .cookie("token", req.user.token, { signedCookie: true })
      .message200("Login successful");
  } catch (error) {
    return next(error);
  }
};

//Online User
export const online = async (req, res, next) => {
  try {
    if (req.user.online) {
      const user_online = {
        email: req.user.email,
        role: req.user.role,
        photo: req.user.photo,
        user_id: req.user._id,
      };
      res.response200(user_online);
    }
  } catch (error) {
    return next(error);
  }
};

//login user
export const signout = async (req, res, next) => {
  try {
    return req.user.online
      ? res.clearCookie("token").message200("Signed out!")
      : res.error404("Invalid credentials from signout!");
  } catch (error) {
    return next(error);
  }
};
