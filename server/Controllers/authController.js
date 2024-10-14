const jwt = require('jsonwebtoken');

const {
  User, validateSignup, validateLogin, validateUsername,
} = require('../Models/userModel');

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  const { error } = validateLogin({ username, password });
  if (error) return res.status(400).json({ info: 'invalid credentials', message: error.details[0].message });

  const query = { username };
  const user = await User.findOne(query).select('+password');

  if (!user || !user.password || !(await user.correctPassword(password, user.password))) {
    console.log(user, username, password)
    return res.status(400).json({ info: 'logorpass', message: "credentials don't match any users" });
  }

  return createSendToken(user, res);
};

exports.signup = async (req, res, next) => {
  const { username, password, passwordConfirm } = req.body;

  const { error } = validateSignup({ username, password, passwordConfirm });
  if (error) return res.status(400).json({ info: 'invalid credentials', message: error.details[0].message });

/*   let result = await user.validateEmail(email);
  if (!result) return res.status(400).json({ info: 'email', message: 'this email is taken' }); */

  result = await validateUsername(username);
  if (result) return res.status(400).json({ info: 'username', message: 'this username is taken' });

  const newUser = await User.create({
      username, password, passwordConfirm
  });


  /* await sendEmail('signup', newUser); */

  return createSendToken(newUser, res);
};

exports.verify = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

  const { decoded, err } = decodeToken(token);
  if (err) return res.status(401).json({ success: false, message: 'Failed to authenticate token' });

  req.user = decoded;
  next();
};

exports.logout = async (req, res, next) => {
  res.clearCookie('token');
  res.json({ success: true });
};

exports.getUser = async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-__v');

  return res.status(200).json({ success: true, message: 'successfully got user', user });
};

exports.getUserIdFromToken = async (token) => {
  if (!token) return { decoded: null, err: 'No token provided' };

  try {
    return decodeToken(token);
  } catch (e) {
    console.error('Token decoding error:', e);
    return { decoded: null, err: 'Invalid token' };
  }
};

const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id) return {decoded: null, err: "No user id in token"}
    return { decoded, err: null };
  } catch (err) {
    return { decoded: null, err };
  }
};

const createToken = (id, expires) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: expires });

const createSendToken = (user, res, options) => {
  let expires;
  expires = process.env.JWT_EXPIRES_IN;

  const token = createToken(user._id, expires);

  const cookieSettings = {
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieSettings.secure = true
  
  res.cookie('jwt', token, cookieSettings);

/*   if (options && options.redirect === 'true') {
      return res.redirect('/');
  } */

  return res.status(200).json({ success: true, message: 'successfully added jwt cookie' });
};

exports.test = async (req, res, next) => {
  const id = req.user.id;
  const socket = req.app.get('socket');

  socket.testPing(id + process.env.ROOM_SECRET, "test ping success");

  return res.status(200).json({ success: true, message: 'successfully pinged' });
};