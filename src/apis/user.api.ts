import { http } from '../utils/axios'
// 用户
export const login = async (data: LoginForm): Promise<UserInfo>  => await http.post('/login', data)