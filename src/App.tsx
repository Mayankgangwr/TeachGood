import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'

import { LoginPage, HomePage, MyLearningPage } from './pages'
import { AuthLayout, Layout } from './components'
import ToastManager from './components/Toaster'
import SingleAssignment from './pages/Assignments/SingleAssignment'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <AuthLayout authentication={true}>
            <HomePage />
          </AuthLayout>
        ),
      },
      {
        path: '/my-learning',
        element: (
          <AuthLayout authentication={true}>
            <MyLearningPage />
          </AuthLayout>
        ),
      },
      {
        path: "assignments/:assignmentId",
        element: (
          <AuthLayout authentication={true}>
            <SingleAssignment />
          </AuthLayout>
        )
      }
    ]
  },
  {
    path: '/login',
    element: (
      <AuthLayout authentication={false}>
        <LoginPage />
      </AuthLayout>
    ),
  },
])

const AuthInitializer = () => {
  return <>
    <RouterProvider router={router} />
    <ToastManager />
  </>
}

export default AuthInitializer
