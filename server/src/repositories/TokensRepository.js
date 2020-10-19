import { v4 as uuid } from 'uuid';
import { Token } from '../models';

async function getAllTokens() {
  try {
    const tokens = await Token.findAll({
      attributes: ['id', 'token', 'carChassis'],
    });
    return tokens;
  } catch (error) {
    return false;
  }
}

async function getTokenById(id) {
  try {
    const token = await Token.findOne({
      attributes: ['id', 'token', 'carChassis'],
      where: { id },
    });
    return token;
  } catch (error) {
    return false;
  }
}

async function createToken(data) {
  const tokenData = {
    ...data,
    id: uuid(),
  };

  try {
    const result = await Token.create(tokenData);
    return result;
  } catch (error) {
    return false;
  }
}

export default {
  getAllTokens,
  getTokenById,
  createToken,
};
