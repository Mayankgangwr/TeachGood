import React from "react";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container";
import Logo from "../../assets/Icons/Logo";
// import { registerUser } from "../../features/auth/auth.actions";
import * as Yup from "yup";
import { Roles, UserRoles, type Role } from "../../constants";
import { isPasswordStrong } from "../../utils/common";
import { Input } from "../../components";
import { registerUser } from "../../features/auth/auth.actions";

const registerSchema = Yup.object({
    name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),

    username: Yup.string()
        .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username cannot exceed 20 characters")
        .required("Username is required"),

    avatarImage: Yup.mixed()
        .nullable()
        .test("fileType", "Only image files are allowed", (value) => {
            if (!value) return true; // ✅ allow empty
            return value instanceof File && value.type.startsWith("image/");
        }),

    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

    phone: Yup.string()
        .matches(/^[0-9]{10,15}$/, "Phone number must be 10–15 digits")
        .required("Phone number is required"),

    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .test(
            "is-strong",
            "Password must include at least one lowercase, one uppercase, and one number",
            (value) => (value ? isPasswordStrong(value) : false)
        )
        .required("Password is required"),

    role: Yup.mixed<"Admin" | "Teacher" | "Student">()
        .oneOf(["Admin", "Teacher", "Student"], "Invalid role")
        .required("Role is required"),
});

const SignupPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error } = useAppSelector((state) => state.auth);

    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            email: "",
            phone: "",
            avatarImage: "",
            password: "",
            role: UserRoles.Student,
        },
        validationSchema: registerSchema,
        onSubmit: async (values) => {
            dispatch(registerUser(values))
            console.log(values)
        },
    });

    return (
        <Container>
            <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
                    <Logo />
                    <p className="text-center text-gray-500 mb-6 text-sm">
                        Create a new account
                    </p>

                    <form className="space-y-4" onSubmit={formik.handleSubmit}>
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="John Doe"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-sm text-red-600 mt-1">{formik.errors.name}</p>
                            )}
                        </div>

                        {/* Username */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="johndoe"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.username && formik.errors.username && (
                                <p className="text-sm text-red-600 mt-1">{formik.errors.username}</p>
                            )}
                        </div>

                        {/* Email */}
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

                        {/* Phone */}
                        <Input
                            id="phone"
                            name="phone"
                            type="text"
                            label="Phone"
                            placeholder="+91 9876543210"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.phone}
                        />
                        {/* Password */}
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

                        {/* Role */}
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                Role
                            </label>
                            <select
                                id="role"
                                name="role"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formik.values.role}
                                onChange={formik.handleChange}
                            >
                                <option value="Student">Student</option>
                                <option value="Teacher">Teacher</option>
                            </select>
                            {formik.touched.role && formik.errors.role && (
                                <p className="text-sm text-red-600 mt-1">{formik.errors.role}</p>
                            )}
                        </div>

                        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? "Signing up..." : "Sign up"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-600 hover:underline">
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </Container>
    );
};

export default SignupPage;
