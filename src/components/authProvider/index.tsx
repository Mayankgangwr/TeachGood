// authProvider.tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook'
import { currentUser, logoutUser } from '../../features/auth/auth.actions'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { initialized } = useAppSelector((state) => state.auth)

  const handleLogout = async () => {
    await dispatch(logoutUser())
    navigate('/login')
  }

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('accessToken')
      if (!initialized) {
        if (token) {
          const result = await dispatch(currentUser())
          if (currentUser.rejected.match(result)) {
            await handleLogout()
          }
        } else {
          navigate('/login')
        }
      }
    }

    verifyAuth()
  }, [dispatch, initialized, navigate])

  return <>{children}</>
}
