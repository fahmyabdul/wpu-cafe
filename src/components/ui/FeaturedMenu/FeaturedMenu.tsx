import { Card, CardBody, Image, Skeleton } from "@heroui/react";
import { IMenu } from "../../../types/Menu";
import menuServices from "../../../services/menu.service";
import { useQuery } from "@tanstack/react-query";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import { cn } from "../../../utils/cn";

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
                .then((data) => data.data);

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
                            className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center"
                        >
                            <div className="relative col-span-6 md:col-span-4 p-2">
                                <Skeleton className="rounded-lg">
                                    <Image
                                        className="w-full object-cover h-[230px] lg:h-[300px]"
                                        radius="lg"
                                        shadow="sm"
                                        width="100%"
                                    />
                                </Skeleton>
                            </div>
                            <div className="flex flex-col col-span-6 md:col-span-8 gap-3 ml-5 mb-10 lg:mb-0">
                                <Skeleton className="text-2xl text-bold w-4/12 h-6">
                                    <h1 className="text-2xl font-bold">Name</h1>
                                </Skeleton>
                                <Skeleton className="text-2xl text-vold w-2/12 h-6">
                                    <p className="text-default-500 text-lg lg:text-xl">
                                        Only&nbsp;
                                        <span className="text-teal-600 font-bold">$0</span>
                                    </p>
                                </Skeleton>
                                <Skeleton className="text-lg w-10/12">
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
                // install Swiper modules
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                autoplay={true}
                navigation
                pagination={{ clickable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log('slide change')}
                // onClick={(swiper) =>{ console.log(swiper)}}
            >
                {!isLoading && menus.map((item: IMenu, i: number)=>(
                    <SwiperSlide>
                        <Card
                            key={item.id}
                            isPressable
                            shadow="none"
                            onPress={()=> console.log(`Pressed ${item.name}`)}
                            className="w-full"
                        >
                            <CardBody
                                // className="p-0 bg-gradient-to-r from-sky-600 to-teal-400"
                                className={cn("p-0 bg-gradient-to-r", {
                                    "from-teal-400 to-sky-600": i === 0,
                                    "from-pink-600 to-purple-950": i === 1,
                                    "from-cyan-900 via-cyan-950 to-gray-800": i === 2,
                                    "from-pink-700 via-gray-500 to-cyan-600": i === 3,
                                    "from-red-500 to-gray-900": i === 4,
                                })}
                            >
                                <div
                                    className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center"
                                >
                                    <div className="relative col-span-6 md:col-span-4 p-2">
                                        <Image
                                            alt={item.name}
                                            className="w-full object-cover h-[230px] lg:h-[300px]"
                                            radius="lg"
                                            shadow="sm"
                                            src={item.image_url}
                                            width="100%"
                                        />
                                    </div>
                                    <div className="flex flex-col col-span-6 md:col-span-8 gap-3 ml-5 mb-10 lg:mb-0 text-white">
                                        <h1 className="text-3xl font-bold">{item.name}</h1>
                                        <p className=" text-lg lg:text-2xl">
                                            Only&nbsp;
                                            <span className=" font-bold">${item.price}</span>
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