import User from "./user.model";

export const findLastUserId = async () => {
  const user = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return user?.id;
};

export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, "0");
  const newId = (parseInt(currentId) + 1).toString().padStart(5, "0");
  return newId;
};
