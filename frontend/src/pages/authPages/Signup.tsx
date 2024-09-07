import { Button } from "@nextui-org/react"
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { SignupValues } from "../../interface/SignupInterface"
import { signupSchema } from "../../validations/FormValidations"
import { UserSignup } from "../../api/UserApi"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { useEffect } from "react"



function Signup() {

  const Navigate = useNavigate()
  const randomUrl = `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 10)}`
  const avatar = randomUrl

  useEffect(() => {
    if (UserInfo) {
      Navigate('/feed')
    }
  }, [])

  const { UserInfo } = useSelector((state: RootState) => state.user)


  const { values, handleBlur, handleChange, handleSubmit, errors, touched, isSubmitting } = useFormik<SignupValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      const response = await UserSignup({ email: values.email, name: values.name, password: values.password, avatar: avatar })
      if (response?.data) {
        Navigate('/auth/login')
      }
    }
  })





  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block ${errors.name && touched.name ? 'text-red-600' : 'text-gray-700'} text-sm font-bold mb-2`} htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              placeholder="Enter your name"
            />
            {errors.name && touched.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>
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
          <div className="mb-6">
            <label className={`block ${errors.confirmPassword && touched.confirmPassword ? 'text-red-600' : 'text-gray-700'} text-sm font-bold mb-2`} htmlFor="confirmPassword">
              confirm password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              placeholder="confirm your password"
            />
            {errors.confirmPassword && touched.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
          </div>
          <div className="flex flex-col gap-3 items-center justify-between">
            <Button isLoading={isSubmitting} color="secondary" className="w-1/2" type="submit">
              Sign Up
            </Button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Already have an account? <Link className="underline" to={'/auth/login'}>Login</Link>
            </a>
          </div>
        </form>
      </div >
    </div >
  )
}

export default Signup
