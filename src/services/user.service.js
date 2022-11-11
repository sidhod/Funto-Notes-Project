import User from '../models/user.model';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const newUserRegistration = async (body) => {
  const data = await User.create(body);
  return data;
};

//login user
export const loginUser = async (body) => {
  let email = body.email;
  let password = body.password;
  const data = await User.find({ email: email, password: password });
  console.log(data);
  return data;

};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};
