import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container";
import type { ILoginProps } from "../../types/props.types";
import { loginUser } from '../../features/auth/auth.actions'
import Logo from "../../assets/Icons/Logo";


const LoginPage: React.FC<ILoginProps> = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { loading, error } = useAppSelector((state) => state.auth);

    const formik = useFormik({
        initialValues: {
            email: "john.doe@example.com",
            password: "StrongPassw0rd"
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string().min(6, "At least 6 characters").required("Required"),
        }),
        onSubmit: async (values) => {
            const res = await dispatch(loginUser(values));
            if (loginUser.fulfilled.match(res)) {
                navigate("/");
            }
        },
    });

    return (
        <Container>
            <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
                    <Logo />
                    <p className="text-center text-gray-500 mb-6 text-sm">
                        Welcome back, please login to your account
                    </p>

                    <form className="space-y-4" onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="you@example.com"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-sm text-red-600 mt-1">{formik.errors.password}</p>
                            )}
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <a href="/forgot-password" className="text-blue-600 hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        {error && (
                            <p className="text-sm text-red-600 text-center">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Don&apos;t have an account?{" "}
                        <a href="/register" className="text-blue-600 hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </Container>
    );
};

export default LoginPage;
