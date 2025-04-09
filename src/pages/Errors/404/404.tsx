
import ErrorLayout from "../../../components/layouts/ErrorLayout";
import { useEffect } from "react";
import { Link } from "@heroui/link";
import { Image } from "@heroui/react";

import notFound from "../../../assets/not-found.gif";

const Page404 = () => {
    useEffect(() => {
        document.title = `WPU Cafe | 404 Not Found`;
    }, []);

    return (
      <ErrorLayout>
        <section className="flex min-h-screen tracking-wider bg-red-500 body-font">
          <div className="container flex flex-col items-center justify-center px-5 py-24 mx-auto">
              <Image
                src={notFound}
                className="mx-auto -left-4 xl:-left-5 w-[80%] xl:w-[50%] mb-2"
              />
              <h1 className="pb-1 mb-0 text-lg font-bold text-white xl:mb-3 title-font sm:text-3xl">Where are you trying to go?!</h1>
              <Link href="/" className="font-semibold text-gray-200 text-md">Back To Home</Link>
          </div>
        </section>
      </ErrorLayout>
    );
}

export default Page404;