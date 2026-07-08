import { getUserPublicProfileWithStories, getAllUsers } from '../services/userServices.js';

export const getPublicProfile = async (req, res) => {
  const userId = req.params.id;
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 10;
  const result = await getUserPublicProfileWithStories(userId, page, perPage);

  res.json(result);
};

export const getUsers = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 10;

  const result = await getAllUsers(page, perPage);
  res.json(result);
};