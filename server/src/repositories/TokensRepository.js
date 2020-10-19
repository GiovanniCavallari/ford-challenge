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

async function createToken(data) {
  try {
    const result = await Token.create(data);
    return result;
  } catch (error) {
    return false;
  }
}

export default { getAllTokens, createToken };
