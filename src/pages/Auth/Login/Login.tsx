import { addToast, Button, Form, Image, Input, Link, Spinner } from "@heroui/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin } from "../../../types/Auth";
import useAuthStore from "../../../stores/AuthStore";
import authServices from "../../../services/auth.service";
import AuthLayout from "../../../components/layouts/AuthLayout/AuthLayout";
import { useNavigate } from "react-router-dom";

import cafeLogoLight from "../../../assets/cafe-logo-l.png";
import cafeLogoDark from "../../../assets/cafe-logo-d.png";
import useThemeSwitchStore from "../../../stores/ThemeSwitchStore";

const Login = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const { setAccessToken, deleteAccessToken } = useAuthStore();
    const { isDark } = useThemeSwitchStore();

    const loginValidator = yup.object().shape({
        email: yup.string().email("Please input a valid email").required("Please input your email"),
        password: yup
            .string()
            .required("Please input your password"),
    });

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<ILogin>({
        resolver: yupResolver(loginValidator)
    });

    const onSubmit: SubmitHandler<ILogin> = async (data) => {
        setIsLogin(true);
        await authServices.login(data)
            .then((res) => {
                setAccessToken(res.data.token);
                navigate("/order");
                setIsLogin(false);
            })
            .catch(() => {
                setIsLogin(false);
                deleteAccessToken();
                setError("root.serverError", {
                    message: "Invalid email or password!",
                });

                addToast({
                    title: "Unable to Login",
                    description: "Invalid email or password!",
                    timeout: 3000,
                    shouldShowTimeoutProgress: true,
                    color: "danger",
                });
            }
        );
    };

    return (
        <AuthLayout title="Login">
            <div className="grid items-center justify-center w-full grid-cols-1 xl:grid-cols-2 xl:w-7/12">
                <div className="items-center justify-center text-center">
                    <Image
                        src={isDark ? cafeLogoDark : cafeLogoLight}
                        radius="none"
                        className="flex mx-auto w-[60%] xl:w-[90%]"
                    />
                </div>
                <div className="min-w-full xl:min-w-[500px] light:border-1 light:border-gray-200 rounded-lg p-8 flex flex-col w-full xl:mt-10">
                    <h2 className="mb-2 text-xl font-bold text-center text-teal-600 dark:text-white xl:text-3xl">Login</h2>
                    <p className="mb-5 text-sm text-center text-default-500 xl:text-lg">Start Managing Customer Orders in WPU Cafe</p>
                    <Form className="gap-5" onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            {...register("email", {required: true})}
                            type="email"
                            label="Email"
                            size="md"
                            isInvalid={errors.email !== undefined}
                            errorMessage={errors.email?.message}
                        />
                        <Input
                            {...register("password", {required: true})}
                            type={isVisible ? "text" : "password"}
                            label="Password"
                            size="md"
                            autoComplete="off"
                            isInvalid={errors.password !== undefined}
                            errorMessage={errors.password?.message}
                            endContent={
                                <div>
                                    <button
                                        aria-label="toggle password visibility"
                                        className="focus:outline-none"
                                        type="button"
                                        onClick={toggleVisibility}
                                    >
                                        {isVisible ? (
                                            <FaEyeSlash className="text-xl pointer-events-none text-default-400" />
                                        ) : (
                                            <FaEye className="text-xl pointer-events-none text-default-400" />
                                        )}
                                    </button>
                                </div>
                            }
                        />
                        <Button 
                            className="mt-2 text-white bg-teal-600 text-md xl:text-lg"
                            size="lg"
                            variant="solid"
                            type="submit"
                            fullWidth
                        >
                            {
                                isLogin? (
                                    <Spinner color="white" size="sm"/>
                                ): "Login"
                            }
                        </Button>
                    </Form>
                    <p className="mt-5 mb-3 text-xs text-center text-gray-500 dark:text-gray-300">If you find any trouble please contact <Link href="mailto:firstfahmyabdul@gmail.com" className="text-xs text-teal-600">Support Email</Link></p>
                    <Link href="/" className="justify-center text-xs font-bold text-teal-600 dark:text-default-500">
                        Back to Home
                    </Link>
                </div>
            </div>
        </AuthLayout>
    )
};

export default Login;