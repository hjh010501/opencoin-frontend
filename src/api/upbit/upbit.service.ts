import axios from 'api/upbit_axios';

/**
   * Get all my asset list
   * [GET] /v1/accounts
   */
const getAllMyAsset = (JWT) => {
    return axios.get(`/v1/accounts`, {
        headers: {
            Authorization: JWT
        }
    })
}

const getAllCurrentAsset = (markets) => {
    return axios.get(`v1/ticker?markets=${markets}`)
}

export default {
    getAllMyAsset,
    getAllCurrentAsset
};
