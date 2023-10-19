import { Suspense, useEffect, useState } from "react"
import { NavLink as Link, Outlet, useNavigate } from "react-router-dom"
import { useAtom } from 'jotai'
import { isLoginAtom } from "./store"
import axios from "axios"

type RestaurantInfo = {
  id:string,
  name: string,
  title: string,
}

export default function HomeView() {
  const [isLogin] = useAtom(isLoginAtom)
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState<null | RestaurantInfo>(null)

  useEffect(() => {
    axios.get('/api/userinfo').then(res => {
      setUserInfo(res.data)
    })
  }, [])


  useEffect(() => {
    if (isLogin == false) {
      navigate('/login')
    }
  }, [isLogin])

  if (isLogin == false) {
    return null
  }

  return (

    <div className="flex">
      <div className="w-36 border-r">
        <span> { userInfo?.title } </span>
        <Link className="block" to="/home/orders">订单管理</Link>
        <Link className="block" to="/home/foods">菜品管理</Link>
        <Link className="block" to="/home/desks">桌面管理</Link>
        <button>退出</button>
      </div>
      <Suspense fallback={'Loading...'}>
        <Outlet />
      </Suspense>
    </div>
  )
}
