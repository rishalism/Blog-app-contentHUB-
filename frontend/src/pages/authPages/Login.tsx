import { useFormik } from "formik"
import { LoginSchema } from "../../validations/FormValidations"
import { UserLogin } from "../../api/UserApi"
import { useNavigate } from "react-router-dom"
import { Button } from "@nextui-org/react"
import { LoginFormValues } from "../../interface/LoginInterface"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../redux/slices/UserSlice"
import { RootState } from "../../redux/store"
import { useEffect } from "react"

function Login() {
  const Navigate = useNavigate()
  const dispatch = useDispatch()


  const { UserInfo } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (UserInfo) {
      Navigate('/feed')
    }
  }, [])


  const { values, handleBlur, handleChange, handleSubmit, errors, touched, isSubmitting } = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const response = await UserLogin({ email: values.email, password: values.password })
      if (response?.data) {
        dispatch(setUser({ data: response.data.UserData, accessToken: response.data.accessToken }))
        Navigate('/feed')
      }
    }
  })

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block ${errors.email && touched.email ? 'text-red-600' : 'text-gray-700'} text-sm font-bold mb-2`} htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="Enter your email"
            />
            {errors.email && touched.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label className={`block ${errors.password && touched.password ? 'text-red-600' : 'text-gray-700'} text-sm font-bold mb-2`} htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="Enter your password"
            />
            {errors.password && touched.password && <p className="text-xs text-red-500">{errors.password}</p>}
          </div>
          <div className="flex flex-col gap-5 items-center justify-between">
            <Button type="submit" isDisabled={isSubmitting} isLoading={isSubmitting} className="w-1/2" color="secondary">
              Login
            </Button>

          </div>
        </form>
      </div >
    </div >
  )
}

export default Login
