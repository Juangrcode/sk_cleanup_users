import ApiKeysModel from '../models/apiKey.model';

// Get permisss of token public
const getApiKey = async ({ token }: { token: string }) => {
  const [apiKey] = await ApiKeysModel.find({ token });
  return apiKey;
};

export default {
  getApiKey
};
