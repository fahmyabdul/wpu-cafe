import { Button } from "@heroui/button";
import ErrorLayout from "../../../components/layouts/ErrorLayout";
import { useEffect } from "react";
import useThemeSwitchStore from "../../../stores/ThemeSwitchStore";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

const Page404 = () => {
    useEffect(() => {
        document.title = `WPU Cafe | 404 Not Found`;
    }, []);

    const { isDark, switchTheme } = useThemeSwitchStore();

    return (
      <ErrorLayout>
        <Button
            variant="flat" 
            aria-label="switch-theme" 
            isIconOnly
            onPress={() => switchTheme(!isDark)}
            className="absolute top-5 left-5"
        >
            {isDark ? (<HiOutlineSun size={20} />): (<HiOutlineMoon size={20} />)}
        </Button>
        <section className="flex body-font min-h-screen tracking-wider">
          <div className="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
            <h1 className="text-9xl font-bold mb-4 bg-gradient-to-r bg-clip-text from-sky-600 to-teal-400 text-transparent">404</h1>
            <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
              <h1 className="title-font sm:text-5xl text-3xl mb-4 font-medium bg-gradient-to-r bg-clip-text from-sky-600 to-teal-400 text-transparent pb-1">Page Not Found</h1>
              <p className="-mt-2 mb-3 text-lg leading-relaxed text-gray-500 dark:text-gray-400">Woops! Where are you trying to go?!</p>
              <a href="/" className="text-teal-600 text-md font-semibold">Back To Home</a>
            </div>
          </div>
        </section>
      </ErrorLayout>
    );
}

export default Page404;