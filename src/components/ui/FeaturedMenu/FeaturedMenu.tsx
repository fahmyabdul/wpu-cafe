import { Card, CardBody, Image, Skeleton } from "@heroui/react";
import { IMenu } from "../../../types/Menu";
import menuServices from "../../../services/menu.service";
import { useQuery } from "@tanstack/react-query";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import { cn } from "../../../utils/cn";
import Stamp from "../Stamp";

const FeaturedMenu = () => {    
    const requestParams = {
        pageSize: 5,
        sortBy: "name",
        sortOrder: "desc"
    };

    const {
        data: menus,
        isLoading
    } = useQuery({
        queryKey: ["dataMenu"],
        queryFn: async () => {
            const result = await menuServices.getAll({
                    params: requestParams,
                })
                .then((res) => res.data)
                .then((data) => data.data)
                .catch(() => {});

            return result;
        },
    });
    

    return (
        <div
            className="flex w-full shadow-md rounded-xl"
        >
            {isLoading ? (
                <Card
                    key="featured-1"
                    shadow="none"
                    className="w-full"
                >
                    <CardBody className="p-0 bg-stone-100 dark:bg-neutral-900">
                        <div
                            className="grid items-center justify-center grid-cols-6 gap-6 md:grid-cols-12 md:gap-4"
                        >
                            <div className="relative col-span-6 p-2 md:col-span-4">
                                <Skeleton className="rounded-lg">
                                    <Image
                                        className="w-full object-cover h-[230px] lg:h-[300px]"
                                        radius="lg"
                                        shadow="sm"
                                        width="100%"
                                    />
                                </Skeleton>
                            </div>
                            <div className="flex flex-col col-span-6 gap-3 mb-10 ml-5 md:col-span-8 lg:mb-0">
                                <Skeleton className="w-4/12 h-6 text-2xl text-bold">
                                    <h1 className="text-2xl font-bold">Name</h1>
                                </Skeleton>
                                <Skeleton className="w-2/12 h-6 text-2xl text-vold">
                                    <p className="text-lg text-default-500 lg:text-xl">
                                        Only&nbsp;
                                        <span className="font-bold text-teal-600">$0</span>
                                    </p>
                                </Skeleton>
                                <Skeleton className="w-10/12 text-lg">
                                <p className="text-lg">
                                    Description
                                </p>
                                </Skeleton>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            ): ""}
            <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                autoplay={true}
                navigation
                pagination={{ clickable: true }}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {!isLoading && menus && menus.map((item: IMenu, i: number)=>(
                    <SwiperSlide>
                        <Card
                            key={item.id}
                            isPressable
                            shadow="none"
                            onPress={()=> console.log(`Pressed ${item.name}`)}
                            className="w-full min-h-[465px] md:min-h-full"
                        >
                            <CardBody
                                className={cn("p-0  bg-gradient-to-r", {
                                    "from-teal-400 to-sky-600": i === 0,
                                    "from-pink-600 to-purple-950": i === 1,
                                    "from-cyan-900 via-cyan-950 to-gray-800": i === 2,
                                    "from-pink-700 via-gray-500 to-cyan-600": i === 3,
                                    "from-red-500 to-gray-900": i === 4,
                                })}
                            >
                                <div
                                    className="grid items-center justify-center grid-cols-6 gap-6 md:grid-cols-12 md:gap-4 "
                                >

                                    <Stamp classes="absolute bottom-5 right-5 xl:bottom-10 xl:right-10 -rotate-12 rounded-xl border-white border-5 lg:border-[5px] text-center p-1 lg:p-2">
                                        <span className="text-sm font-bold text-white lg:text-2xl">TASTY!!!</span>
                                    </Stamp>
                                    <div className="relative col-span-6 p-2 md:col-span-4">
                                        <Image
                                            alt={item.name}
                                            className="w-full object-cover h-[230px] lg:h-[300px]"
                                            radius="lg"
                                            shadow="sm"
                                            src={item.image_url}
                                            width="100%"
                                        />
                                    </div>
                                    <div className="z-10 flex flex-col col-span-6 gap-3 mt-2 mb-10 ml-5 text-white md:col-span-8 lg:mb-0">
                                        <h1 className="text-3xl font-bold">{item.name}</h1>
                                        <p className="text-xl lg:text-2xl">
                                            Only&nbsp;
                                            <span className="font-bold ">${item.price}</span>
                                        </p>
                                        <p className="text-lg">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default FeaturedMenu;