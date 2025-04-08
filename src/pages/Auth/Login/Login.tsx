import { addToast, Button, Form, Input, Link, Spinner } from "@heroui/react";
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

const Login = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const { setAccessToken, deleteAccessToken } = useAuthStore();

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
            <div className="grid grid-cols-1 xl:grid-cols-2 w-full xl:w-7/12 justify-center items-center">
                <div className="items-center justify-center text-center">
                    <span className="font-semibold text-3xl xl:text-7xl bg-gradient-to-r bg-clip-text from-sky-600 to-teal-400 text-transparent">WPU Cafe</span>
                </div>
                <div className="min-w-full xl:min-w-[500px] light:border-1 light:border-gray-200 rounded-lg p-8 flex flex-col w-full mt-2 xl:mt-10">
                    <h2 className="text-teal-600 font-bold text-center text-xl xl:text-3xl mb-2">Login</h2>
                    <p className="text-default-500 mb-5 text-sm xl:text-lg text-center">Start making your order in WPU Cafe</p>
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
                                            <FaEyeSlash className="text-xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <FaEye className="text-xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                </div>
                            }
                        />
                        <Button 
                            className="bg-teal-600 text-white text-md xl:text-lg mt-2"
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
                    <p className="text-xs text-gray-500 dark:text-gray-300 mt-5 mb-3 text-center">If you find any trouble please contact <Link href="mailto:firstfahmyabdul@gmail.com" className="text-xs text-teal-600">Support Email</Link></p>
                    <Link href="/" className="text-teal-600 font-bold dark:text-default-500 text-xs justify-center">
                        Back to Home
                    </Link>
                </div>
            </div>
        </AuthLayout>
    )
};

export default Login;