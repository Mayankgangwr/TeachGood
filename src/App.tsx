import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'

import { LoginPage, HomePage, MyLearningPage, Assignments, Classes, Courses, Settings, SignupPage, BatchesPage, Departments, SubjectPage, TeachersPage, StudentsPage, EnrollmentsPage, TeacherProfile, StudentProfile } from './pages'
import { AuthLayout, Layout } from './components'
import ToastManager from './components/Toaster'
import SingleAssignment from './pages/Assignments/SingleAssignment'
import { UserRoles } from './constants'


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
        path: '/departments',
        element: (
          <AuthLayout authentication={true}>
            <Departments />
          </AuthLayout>
        ),
      },

      {
        path: '/courses',
        element: (
          <AuthLayout authentication={true}>
            <Courses />
          </AuthLayout>
        ),
      },
      {
        path: '/batches',
        element: (
          <AuthLayout authentication={true}>
            <BatchesPage />
          </AuthLayout>
        ),
      },
      {
        path: '/enrollments',
        element: (
          <AuthLayout authentication={true}>
            <EnrollmentsPage />
          </AuthLayout>
        ),
      },
      {
        path: '/subjects',
        element: (
          <AuthLayout authentication={true}>
            <SubjectPage />
          </AuthLayout>
        ),
      },
      {
        path: '/teachers',
        element: (
          <AuthLayout authentication={true}>
            <TeachersPage />
          </AuthLayout>
        )
      },
      {
        path: '/teachers/:id',
        element: (
          <AuthLayout authentication={true}>
            <TeacherProfile />
          </AuthLayout>
        )
      },
      {
        path: '/students',
        element: (
          <AuthLayout authentication={true}>
            <StudentsPage />
          </AuthLayout>
        )
      },
      {
        path: '/students/:id',
        element: (
          <AuthLayout authentication={true}>
            <StudentProfile />
          </AuthLayout>
        )
      },
      {
        path: '/assignments',
        element: (
          <AuthLayout authentication={true}>
            <Assignments />
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
      },
      {
        path: '/classes',
        element: (
          <AuthLayout authentication={true}>
            <Classes />
          </AuthLayout>
        ),
      },

      {
        path: '/settings',
        element: (
          <AuthLayout authentication={true} allowedRoles={[UserRoles.Admin]}>
            <Settings />
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
  {
    path: '/register',
    element: (
      <AuthLayout authentication={false}>
        <SignupPage />
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
