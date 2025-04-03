import { Button, Form, Input, Link } from "@heroui/react";
import AuthLayout from "../../../components/layouts/AuthLayout/AuthLayout";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Login = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <AuthLayout title="Login">
            <div className="grid grid-cols-1 xl:grid-cols-2 w-full xl:w-7/12 justify-center items-center">
                <div className="items-center justify-center text-center">
                    <span className="font-semibold text-3xl xl:text-7xl bg-gradient-to-r bg-clip-text from-sky-600 to-teal-400 text-transparent">WPU Cafe</span>
                </div>
                <div className="min-w-full xl:min-w-[500px] light:border-1 light:border-gray-200 rounded-lg p-8 flex flex-col w-full mt-2 xl:mt-10">
                    <h2 className="text-teal-600 font-bold text-center text-xl xl:text-3xl mb-2">Login</h2>
                    <p className="text-default-500 mb-5 text-sm xl:text-lg text-center">Login into WPU Cafe Dashboard</p>
                    <Form className="gap-5">
                        <Input
                            type="email"
                            label="Email"
                            size="md"
                            autoComplete="off"
                        />
                        <Input
                            type={isVisible ? "text" : "password"}
                            label="Password"
                            size="md"
                            autoComplete="off"
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
                            size="md"
                            variant="solid"
                            fullWidth
                        >
                            Login
                        </Button>
                    </Form>
                    <p className="text-xs text-gray-500 dark:text-gray-300 mt-5 mb-3 text-center">If you find any trouble please contact <Link href="mailto:firstfahmyabdul@gmail.com" className="text-xs text-teal-600">Support Email</Link></p>
                    <Link href="/" className="text-gray-500 dark:text-default-500 text-xs justify-center">
                        Back to Home
                    </Link>
                </div>
            </div>
        </AuthLayout>
    )
};

export default Login;