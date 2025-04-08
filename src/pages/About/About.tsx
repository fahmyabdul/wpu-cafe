import { Button, Chip, Image, Link } from "@heroui/react";
import MainLayout from "../../components/layouts/MainLayout";
import me from "../../assets/me-sketch-1.png";
import { FaGithub, FaInstagram, FaLinkedin, FaRegEnvelope, FaTelegram } from "react-icons/fa6";

const chipActiveClass = "bg-success-500 dark:bg-success-400 text-white";
const chipIdleClass = "bg-warning-500 dark:bg-warning-400 text-white";
const chipInactiveClass = "bg-danger-500 text-white";

const techStacks = [
    { label: "Golang", class: chipActiveClass },
    { label: "Gin Gonic", class: chipActiveClass },
    { label: "GORM", class: chipActiveClass },
    { label: "sqlx", class: chipActiveClass },
    { label: "gRPC", class: chipActiveClass },
    { label: "JavaScript", class: chipActiveClass },
    { label: "TypeScript", class: chipActiveClass },
    { label: "NodeJS", class: chipActiveClass },
    { label: "ExpressJS", class: chipActiveClass },
    { label: "MongoDB", class: chipActiveClass },
    { label: "MySQL", class: chipActiveClass },
    { label: "PostgreSQL", class: chipActiveClass },
    { label: "Redis", class: chipActiveClass },
    { label: "Linux", class: chipActiveClass },
    { label: "Docker", class: chipActiveClass },
    { label: "Kubernetes", class: chipActiveClass },
    { label: "GCP", class: chipActiveClass },
    { label: "Google Cloud Build", class: chipActiveClass },
    { label: "Prometheus", class: chipActiveClass },
    { label: "Apache Kafka", class: chipActiveClass },
    { label: "FCM", class: chipActiveClass },
    { label: "Gorilla Mux", class: chipIdleClass },
    { label: "NestJS", class: chipIdleClass },
    { label: "Gitlab CI/CD", class: chipIdleClass },
    { label: "Red Hat OpenShift", class: chipIdleClass },
    { label: "BadgerDB", class: chipIdleClass },
    { label: "Perl", class: chipInactiveClass },
    { label: "Python", class: chipInactiveClass },
    { label: "PHP", class: chipInactiveClass },
    { label: "SQLite", class: chipInactiveClass },
    { label: "GoLevelDB", class: chipInactiveClass },
    { label: "Oracle", class: chipInactiveClass },
];

const About = () => {
    return (
        <MainLayout title="About Us">
            <div className="flex flex-col gap-5 lg:gap-10 justify-center items-center w-full xl:w-9/12 bg-radial-gradient">
                <h1 className="font-bold bg-gradient-to-r bg-clip-text from-sky-600 to-teal-400 text-transparent mb-0 text-4xl mt-4 lg:mt-0">About Us</h1>
                <span className="mt-[-15px] lg:mt-[-35px] text-default-500 text-lg">What You Need To Know About Us</span>
                <div className="grid grid-cols-1 xl:grid-cols-2 w-full p-5 xl:p-0 items-start gap-10">
                    <div className="flex justify-center mt-2">
                        <Image
                            alt="wpu-team-img"
                            className="object-fill drop-shadow-neon-black dark:drop-shadow-neon-teal"
                            width="100%"
                            src="https://wpucourse.id/_next/image?url=%2Fimages%2Fbootcamp%2Fwpuramadhan.png&w=1920&q=75"
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="font-bold text-2xl mb-2">About This Web</h1>
                        <div className="flex flex-col gap-2 text-justify">
                            <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">First and foremost, I would like to express my sincere gratitude to the <span className="text-teal-600 font-bold">WPU Course</span> instructors (Mr. Sandhika Galih, Mr. Avip Syaifulloh, and Mr. Agung Rizkyana) for organizing the <b className="text-cyan-600 dark:text-cyan-400">WPU Ramadhan Camp: Kajian React.js Dari Dasar Hingga Mahir</b>. This program has been incredibly beneficial for me, the developer of this website, in utilizing <b>ReactJS</b> technology to build the <b>WPU Cafe</b> website.</p>
                            <p>Furthermore, this website was created to fulfill the assignment given by the instructors at the conclusion of the aforementioned bootcamp. It is a cafe website that allows administrator to to create Customer Orders from the cafe's menu.</p>
                            <p>The website was built using the following technologies: <b>JavaScript + TypeScript</b>, <b>ReactJS</b>, <b>TailwindCSS</b>, and <b>HeroUI</b>. I hope that this website meets the requirements set by the instructors.</p>
                            <p>Once again, I extend my deepest appreciation for all the knowledge shared by the instructors. May <span className="text-teal-600 font-bold">WPU Course</span> and its instructors always be blessed with abundant knowledge and rewarded for their contributions to education.</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 p-5 xl:p-0 w-full items-start gap-10">
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex justify-center mt-2">
                            <Image
                                alt={me}
                                className="object-contain max-h-[600px] drop-shadow-neon-black dark:drop-shadow-neon-white"
                                src={me}
                                radius="lg"
                            />
                        </div>
                        <div className="flex flex-row gap-3 mt-4">
                            <div>
                                <Link
                                    href="mailto:firstfahmyabdul@gmail.com"
                                    target="blank"
                                >
                                    <Button
                                        className="text-tiny text-white bg-slate-500"
                                        color="default"
                                        radius="sm"
                                        variant="solid"
                                        isIconOnly
                                    >
                                        <FaRegEnvelope className="size-6 lg:size-7"/>
                                    </Button>
                                </Link>
                            </div>
                            <div>
                                <Link
                                    href="https://github.com/fahmyabdul"
                                    target="blank"
                                >
                                    <Button
                                        className="text-tiny text-white bg-black dark:bg-gray-700"
                                        color="default"
                                        radius="sm"
                                        variant="solid"
                                        isIconOnly
                                    >
                                        <FaGithub className="size-6 lg:size-7"/>
                                    </Button>
                                </Link>
                            </div>
                            <div>
                                <Link
                                    href="https://linkedin.com/in/fahmyabdul"
                                    target="blank"
                                >
                                    <Button
                                        className="text-tiny text-white bg-sky-600"
                                        color="primary"
                                        radius="sm"
                                        variant="solid"
                                        isIconOnly
                                    >
                                        <FaLinkedin className="size-6 lg:size-7"/>
                                    </Button>
                                </Link>
                            </div>
                            <div>
                                <Link
                                    href="https://t.me/fahmyabdul"
                                    target="blank"
                                >
                                    <Button
                                        className="text-tiny text-white bg-sky-500"
                                        color="primary"
                                        radius="sm"
                                        variant="solid"
                                        isIconOnly
                                    >
                                        <FaTelegram className="size-6 lg:size-7"/>
                                    </Button>
                                </Link>
                            </div>
                            <div>
                                <Link
                                    href="https://instagram.com/fahmyabdul.h"
                                    target="blank"
                                >
                                    <Button
                                        className="text-tiny text-white bg-pink-600"
                                        color="primary"
                                        radius="sm"
                                        variant="solid"
                                        isIconOnly
                                    >
                                        <FaInstagram className="size-6 lg:size-7"/>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start">
                        <h1 className="font-bold text-2xl mb-2">About Developer</h1>
                        <div className="flex flex-col gap-2 text-md text-justify">
                            <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">Hello, my name is <b>Muhammad Fahmy Abdul Hakim</b>. I'm a <b>Backend Developer</b> with over 10 years of experience in designing and developing backend applications. Proficient in Backend Development programming language such as Golang.  Proficient in utilizing databases such as PostgreSQL, MySQL, MongoDB, Redis, and Apache Kafka for messaging.</p>
                            <p>Key achievements include developing <b>Volume Compare</b> (a telecommunication data processing application) for Telkomsel, <b>Let it Flo</b> (an RFID based toll transaction processing application) for Jasa Marga Tollroad Operator, <b>PN PRIMA</b> (Web application for the Screening and Management of Toddler Nutritional Problems and Antenatal Care) & Internal Information System application at CISDI, and as an Interim DevOps support for application deployments on the Red Hat OpenShift platform at ASDP Indonesia Ferry.</p>
                            <p>In order to reignite my passion in Software Development, I challenge myself to switch my career towards <b>Frontend Engineering</b>. To ensure my readiness, I'm actively pursuing a <Link className="font-bold" target="blank" href="https://www.belajarmern.id/">MERN Stack Course</Link> at <Link className="text-teal-600 font-bold" target="blank" href="https://wpucourse.id/">WPU Course</Link> for Fullstack Javascript Developer, focusing on mastering modern frontend technologies.</p>
                            <h1 className="font-bold mt-2">Work Experience</h1>
                            <div className="grid grid-cols-1 xl:flex lg:flex-cols-2 text-sm">
                                <div className="flex-auto text-left">• <b>CISDI</b></div>
                                <div className="flex-auto text-left xl:text-right">Backend Developer | Int.Cloud Engineer <span className="hidden xl:inline-flex">• May, 2023 - May, 2025</span></div>
                                <div className="text-default-500 xl:hidden">May, 2023 - May, 2025</div>
                            </div>
                            <div className="grid grid-cols-1 xl:flex xl:flex-cols-2 text-sm xl:text-nowrap">
                                <div className="flex-auto text-left">• <b>PT. Swamedia Informatika</b></div>
                                <div className="flex-auto text-left xl:text-right">Backend Developer <span className="hidden xl:inline-flex">• Feb, 2016 - Nov, 2022</span></div>
                                <div className="text-default-500 xl:hidden">Feb, 2016 - Nov, 2022</div>
                            </div>
                            <div className="grid grid-cols-1 xl:flex xl:flex-cols-2 text-sm xl:text-nowrap">
                                <div className="flex-auto text-left">• <b>Sistec Solution</b></div>
                                <div className="flex-auto text-left xl:text-right">Fullstack PHP Web Developer <span className="hidden xl:inline-flex">• Jul, 2014 - Nov, 2015</span></div>
                                <div className="text-default-500 xl:hidden">Jul, 2014 - Nov, 2015</div>
                            </div>
                            <h1 className="font-bold mt-2">Educations</h1>
                            <div className="grid grid-cols-1 xl:flex xl:flex-cols-2 text-sm xl:text-nowrap">
                                <div className="flex-auto text-left">• <b>SMK TI GNC</b></div>
                                <div className="flex-auto text-left xl:text-right">Software Engineering <span className="hidden xl:inline-flex">• 2011 - 2014</span></div>
                                <div className="text-default-500 xl:hidden">2011 - 2014</div>
                            </div>
                            <h1 className="font-bold mt-2">Used Tech Stack</h1>
                            <div className="grid grid-cols-2 lg:grid-rows-8 xl:grid-flow-col gap-1 text-xs xl:text-sm">
                                {techStacks.map((item, index) => (
                                    <Chip key={"techstack-"+index} radius="sm" className={item.class}>{item.label}</Chip>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default About;