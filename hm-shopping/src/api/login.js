// 此处用于存放所有登录相关的接口请求
import request from '@/utils/request'

// 1.获取图形验证码
export const getPicCodeApi = () => {
    return request.get('/captcha/image')
}

// 2. 获取短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobil) => {
    return request.post('/captcha/sendSmsCaptcha', {
        form: {
            captchaCode,
            captchaKey,
            mobil
        }
    })
}