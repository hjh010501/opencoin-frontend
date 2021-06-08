import axios, { isAuth } from 'api/axios';

const localStorage = global.window.localStorage;

/**
   * 회원가입을 합니다.
   * [POST] /register
   */
const register = (email, password1, password2, nickname, upbit_api_key) => {
    return axios.post('/register', {
        email,
        password1,
        password2,
        profile: {
            nickname,
            upbit_api_key,
        }
    })
}

/**
   * 로그인 합니다.
   * [POST] /login
   */
const login = (email, password) => {
    return axios.post('/login', {
        email,
        password
    }).then(res => {
        if (res.data.token) {
            localStorage.setItem("user", JSON.stringify(res.data));
            localStorage.setItem("token", res.data.token);
        }
        return res.data;
    });
}
  
/**
   * 유저를 불러옵니다.
   * [GET] /user
   */
const getUser = () => {
    if(!isAuth()) return Promise.reject(false);
    return axios.get(`/user`)
}

export default {
  register,
  login,
  getUser
};

