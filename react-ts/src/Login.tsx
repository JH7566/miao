import { useInput } from "./hooks"
import axios from "axios"
import { isLoginAtom } from "./store"
import { useAtom } from "jotai"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
  const name = useInput('')
  const password = useInput('')
  const captcha = useInput('')
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useAtom(isLoginAtom)

  async function login() {
    try {
      
      const res = await axios.post('/api/login', {
        name: name.value,
        password: password.value,
        captcha: captcha.value
      })
      setIsLogin(true)
      navigate('/home')
    } catch (e: any) {

      if (e.isAxiosError) {
        alert('登录失败:' + e.response?.data.msg)
      } else {
        throw e
      }
    }
    console.log(e)
  }

  if (isLogin) {
    return <div>已登录,去<Link to="/home">管理页面</Link></div>
  }


  return <div>

    <div className="h-12 m-2 items-center flex">
      <label className="flex gap-2">
        <span className="w-12 inline-black text-right">用户名</span>
        <input type="text" name="name" {...name} />
      </label>
    </div>

    <div className="h-12 m-2 items-center flex">
      <label className="flex gap-2">
        <span className="w-12 inline-black text-right">密码</span>
        <input type="password" name="password" {...password} />
      </label>

    </div>

    <div className="h-12 m-2 items-center flex">
      <label className="flex gap-2">
        <span className="w-12 inline-block text-right">验证码</span>
        <input type="text" name="captcha" {...captcha} />
      </label>
    </div>

    <div className="h-12 m-2 items-center flex">
      <label className="flex gap-2">
        <span className="w-12 inline-block text-right"></span>
        <img className="bg-white h-8" src="api/captcha" alt="验证码" />
      </label>
    </div>

    <div className="h-12 m-2 items-center flex">
      <button className="ml-14" onClick={login}>登录</button>
    </div>
  </div>
}
