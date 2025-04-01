import { Card, CardBody, Image } from "@heroui/react";
import { IMenu } from "../../../types/Menu";
import menuServices from "../../../services/menu.service";
import { useQuery } from "@tanstack/react-query";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';

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
            className="flex w-6/12"
        >
            {isLoading? "Loading....": ""}
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                navigation
                pagination={{ clickable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >

                {menus && menus.map((item: IMenu)=>(
                    <SwiperSlide>
                        <Card
                            key={item.id}
                            isPressable
                            shadow="none"
                            onPress={()=> console.log(`Pressed ${item.name}`)}
                            className="w-full"
                        >
                            <CardBody
                            className="p-0 pb-2">
                                <div
                                    className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center"
                                >
                                    <div className="relative col-span-6 md:col-span-4">
                                        <Image
                                            alt={item.name}
                                            className="w-full object-cover h-[200px]"
                                            radius="lg"
                                            shadow="sm"
                                            src={item.image_url}
                                            width="100%"
                                        />
                                    </div>
                                    <div className="flex flex-col col-span-6 md:col-span-8">
                                        <b>{item.name}</b>
                                        <p className="text-default-500">${item.price}</p>
                                        <p>
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