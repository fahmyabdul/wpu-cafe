import { Button, Card, Image, Link } from "@heroui/react";
import MainLayout from "../../components/layouts/MainLayout/MainLayout";
import me from "../../assets/me-sketch-1.png";
import { FaGithub, FaInstagram, FaLinkedin, FaRegEnvelope, FaTelegram } from "react-icons/fa6";


const About = () => {
    return (
        <MainLayout title="Tentang Kami">
            <div className="flex flex-col gap-10 justify-center items-center w-full lg:w-8/12">
                <h1 className="font-bold bg-gradient-to-r bg-clip-text from-sky-600 to-teal-400 text-transparent mb-0 text-4xl">About Us</h1>
                <span className="mt-[-35px] text-default-500 text-lg">What You Need To Know About Us</span>
                <div className="grid grid-cols-2 w-full items-start gap-10">
                    <div className="flex justify-center mt-2">
                        <Card className="flex border-none w-full h-full drop-shadow-sm" radius="lg">
                            <Image
                                alt="Woman listing to music"
                                className="object-cover"
                                width="100%"
                                src="https://wpucourse.id/_next/image?url=%2Fimages%2Fbootcamp%2Fwpuramadhan.png&w=1920&q=75"
                            />
                        </Card>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="font-bold text-2xl mb-2">About This Web</h1>
                        <div className="flex flex-col gap-2 text-justify">
                            <p>First and foremost, I would like to express my sincere gratitude to the <span className="text-teal-600 font-bold">WPU Course</span> instructors (Mr. Sandhika Galih, Mr. Avip Syaifulloh, and Mr. Agung Rizkyana) for organizing the <b>WPU Ramadhan Camp: Kajian React.js Dari Dasar Hingga Mahir</b>. This program has been incredibly beneficial for me, the developer of this website, in utilizing <b>ReactJS</b> technology to build the <b>WPU Cafe</b> website.</p>
                            <p>Furthermore, this website was created to fulfill the assignment given by the instructors at the conclusion of the aforementioned bootcamp. It is a cafe website that allows customers to order items from the cafe's menu.</p>
                            <p>The website was built using the following technologies: <b>JavaScript + TypeScript</b>, <b>ReactJS</b>, <b>TailwindCSS</b>, and <b>HeroUI</b>. I hope that this website meets the requirements set by the instructors.</p>
                            <p>Once again, I extend my deepest appreciation for all the knowledge shared by the instructors. May <span className="text-teal-600 font-bold">WPU Course</span> and its instructors always be blessed with abundant knowledge and rewarded for their contributions to education.</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 w-full items-start gap-10">
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex w-full mt-2">
                        <Card className="flex flex-row justify-center border-none bg-gradient-to-r from-sky-600 to-teal-400 w-full max-h-[600px]" radius="lg">
                            <Image
                                alt={me}
                                className="object-contain max-h-[600px]"
                                src={me}
                            />
                        </Card>
                        </div>
                        <div className="flex flex-row gap-3 mt-4">
                            <div>
                                <Link
                                    href="mailto:firstfahmyabdul@gmail.com"
                                    target="blank"
                                >
                                    <Button
                                        className="text-tiny text-white bg-slate-600"
                                        color="default"
                                        radius="sm"
                                        size="lg"
                                        variant="solid"
                                        isIconOnly
                                    >
                                        <FaRegEnvelope size={30}/>
                                    </Button>
                                </Link>
                            </div>
                            <div>
                                <Link
                                    href="https://github.com/fahmyabdul"
                                    target="blank"
                                >
                                    <Button
                                        className="text-tiny text-white bg-black"
                                        color="default"
                                        radius="sm"
                                        size="lg"
                                        variant="solid"
                                        isIconOnly
                                    >
                                        <FaGithub size={30}/>
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
                                        size="lg"
                                        variant="solid"
                                        isIconOnly
                                    >
                                        <FaLinkedin size={30}/>
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
                                        size="lg"
                                        variant="solid"
                                        isIconOnly
                                    >
                                        <FaTelegram size={30}/>
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
                                        size="lg"
                                        variant="solid"
                                        isIconOnly
                                    >
                                        <FaInstagram size={30}/>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start">
                        <h1 className="font-bold text-2xl mb-2">About Developer</h1>
                        <div className="flex flex-col gap-2 text-md text-justify">
                            <p>Hello, my name is <b>Muhammad Fahmy Abdul Hakim</b>. I'm a <b>Backend Developer</b> with over 10 years of experience in designing and developing backend applications. Proficient in Backend Development programming language such as Golang.  Proficient in utilizing databases such as PostgreSQL, MySQL, MongoDB, Redis, and Apache Kafka for messaging.</p>
                            <p>Key achievements include developing <b>Volume Compare</b> (a telecommunication data processing application) for Telkomsel, <b>Let it Flo</b> (an RFID based toll transaction processing application) for Jasa Marga Tollroad Operator, <b>PN PRIMA</b> (Web application for the Screening and Management of Toddler Nutritional Problems and Antenatal Care) & Internal Information System application at CISDI, and as an Interim DevOps support for application deployments on the Red Hat OpenShift platform at ASDP Indonesia Ferry.</p>
                            <p>In order to reignite my passion in Software Development, I challenge myself to switch my career towards <b>Frontend Engineering</b>. To ensure my readiness, I'm actively pursuing a <Link className="font-bold" target="blank" href="https://www.belajarmern.id/">MERN Stack Course</Link> at <Link className="text-teal-600 font-bold" target="blank" href="https://wpucourse.id/">WPU Course</Link> for Fullstack Javascript Developer, focusing on mastering modern frontend technologies.</p>
                            <h1 className="font-bold mt-2">Work Experience</h1>
                            <div className="flex flex-cols-2 text-sm">
                                <div className="flex-auto text-left">• <b>CISDI</b></div>
                                <div className="flex-auto text-right">Backend Developer | Int.Cloud Engineer • May, 2023 - May, 2025</div>
                            </div>
                            <div className="flex flex-cols-2 text-sm text-nowrap">
                                <div className="flex-auto text-left">• <b>PT. Swamedia Informatika</b></div>
                                <div className="flex-auto text-right">Backend Developer • Feb, 2016 - Nov, 2022</div>
                            </div>
                            <div className="flex flex-cols-2 text-sm text-nowrap">
                                <div className="flex-auto text-left">• <b>Sistec Solution</b></div>
                                <div className="flex-auto text-right">Fullstack PHP Web Developer • Jul, 2014 - Nov, 2015</div>
                            </div>
                            <h1 className="font-bold mt-2">Educations</h1>
                            <div className="flex flex-cols-2 text-sm text-nowrap">
                                <div className="flex-auto text-left">• <b>SMK TI GNC</b></div>
                                <div className="flex-auto text-right">Software Engineering • 2011 - 2014</div>
                            </div>
                            <h1 className="font-bold mt-2">Used Tech Stack</h1>
                            <div className="grid grid-rows-8 grid-flow-col gap-1 text-sm">
                                <div className="text-success-700">• Golang</div>
                                <div className="text-success-700">• Gin Gonic</div>
                                <div className="text-success-700">• GORM</div>
                                <div className="text-success-700">• sqlx</div>
                                <div className="text-success-700">• gRPC</div>
                                <div className="text-success-700">• JavaScript</div>
                                <div className="text-success-700">• TypeScript</div>
                                <div className="text-success-700">• NodeJS</div>
                                <div className="text-success-700">• ExpressJS</div>
                                <div className="text-success-700">• MongoDB</div>
                                <div className="text-success-700">• MySQL</div>
                                <div className="text-success-700">• PostgreSQL</div>
                                <div className="text-success-700">• Redis</div>
                                <div className="text-success-700">• Linux</div>
                                <div className="text-success-700">• Docker</div>
                                <div className="text-success-700">• Kubernetes</div>
                                <div className="text-success-700">• Google Cloud Platform</div>
                                <div className="text-success-700">• Google Cloud Build</div>
                                <div className="text-success-700">• Prometheus</div>
                                <div className="text-success-700">• Apache Kafka</div>
                                <div className="text-success-700">• Firebase Cloud Messaging</div>
                                <div className="text-warning-600">• Gorilla Mux</div>
                                <div className="text-warning-600">• NestJS</div>
                                <div className="text-warning-600">• Gitlab CI/CD</div>
                                <div className="text-warning-600">• Red Hat OpenShift</div>
                                <div className="text-warning-600">• BadgerDB</div>
                                <div className="text-danger-600">• Perl</div>
                                <div className="text-danger-600">• Python</div>
                                <div className="text-danger-600">• PHP</div>
                                <div className="text-danger-600">• SQLite</div>
                                <div className="text-danger-600">• GoLevelDB</div>
                                <div className="text-danger-600">• Oracle</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default About;