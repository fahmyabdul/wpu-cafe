import { Button, Card, Image, Link } from "@heroui/react";
import MainLayout from "../../components/layouts/MainLayout/MainLayout";
import me from "../../assets/me.jpeg";
import { FaGithub, FaInstagram, FaLinkedin, FaRegEnvelope, FaTelegram } from "react-icons/fa6";


const About = () => {
    return (
        <MainLayout title="Tentang Kami">
            <div className="flex flex-col gap-10 justify-center items-center w-full lg:w-10/12">
                <h1 className="font-bold text-teal-600 mb-0 text-4xl">About Us</h1>
                <span className="mt-[-35px] text-default-500 text-lg">What You Need To Know About Us</span>
                <div className="grid grid-cols-2 w-full items-start gap-10">
                    <div className="flex justify-center">
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
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 w-full items-start gap-10">
                    <div className="flex justify-center">
                        <Card className="flex flex-row border-none drop-shadow-sm" radius="lg">
                            <Image
                                alt={me}
                                className="object-cover"
                                src={me}
                            />
                        </Card>
                    </div>
                    <div className="flex flex-col justify-start">
                        <h1 className="font-bold text-2xl mb-2">About Developer</h1>
                        <div className="flex flex-col gap-2 text-justify">
                            <p>A <b>Backend Developer</b> with over 10 years of experience designing and developing backend applications. Proficient in Backend Development programming language such as Golang.  Proficient in utilizing PostgreSQL, MySQL, MongoDB, Redis, and Apache Kafka for messaging.</p>
                            <p>Key achievements include developing a telecommunication data processing application for Telkomsel & ASKITEL, a toll transaction processing application for Jasa Marga Tollroad Operator, an Internal Information System application for CISDI, and as a Interim DevOps support for application deployments on the Red Hat OpenShift platform at ASDP Indonesia Ferry.</p>
                            <p>In order to reignite my passion in Software Development, I challenge myself to switch my career towards Frontend Engineering. To ensure my readiness, I'm actively pursuing a <Link className="font-bold" target="blank" href="https://www.belajarmern.id/">MERN Stack Course</Link> at <Link className="text-teal-600 font-bold" target="blank" href="https://wpucourse.id/">WPU Course</Link> for Fullstack Javascript Developer, focusing on mastering modern frontend technologies.</p>
                            <h1 className="text-md font-bold mt-2">Work Experience</h1>
                            <div className="grid grid-cols-3 text-sm">
                                <div className="text-left">• <b>CISDI</b></div>
                                <div className="text-center">Backend Dev | Int.Cloud Engineer</div>
                                <div className="text-right">May, 2023 - May, 2025</div>
                            </div>
                            <div className="grid grid-cols-3 text-sm">
                                <div className="text-left">• <b>PT. Swamedia Informatika</b></div>
                                <div className="text-center">Backend Dev</div>
                                <div className="text-right">Feb, 2016 - Nov, 2022</div>
                            </div>
                            <div className="grid grid-cols-3 text-sm">
                                <div className="text-left">• <b>Sistec Solution</b></div>
                                <div className="text-center">Fullstack Web Dev</div>
                                <div className="text-right">Jul, 2014 - Nov, 2015</div>
                            </div>
                            <h1 className="text-md font-bold mt-2">Educations</h1>
                            <div className="grid grid-cols-3 text-sm">
                                <div className="text-left">• <b>SMK TI GNC</b></div>
                                <div className="text-center">Software Engineering</div>
                                <div className="text-right">2011 - 2014</div>
                            </div>
                            <h1 className="text-md font-bold mt-2">Used Tech Stack</h1>
                            <div className="grid grid-rows-8 grid-flow-col gap-1 text-sm">
                                <div className="text-success-700">• Golang</div>
                                <div className="text-success-700">• Gin Gonic</div>
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
                                <div className="text-danger-600">• Perl</div>
                                <div className="text-danger-600">• Python</div>
                                <div className="text-danger-600">• PHP</div>
                                <div className="text-danger-600">• SQLite</div>
                                <div className="text-danger-600">• BadgerDB</div>
                                <div className="text-danger-600">• GoLevelDB</div>
                                <div className="text-danger-600">• Oracle</div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-3 mt-4">
                            <div>
                                <Button
                                    className="text-tiny text-white bg-slate-600"
                                    color="default"
                                    radius="sm"
                                    size="md"
                                    variant="solid"
                                    isIconOnly
                                >
                                    <FaRegEnvelope size={25}/>
                                </Button>
                            </div>
                            <div>
                                <Button
                                    className="text-tiny text-white bg-black"
                                    color="default"
                                    radius="sm"
                                    size="md"
                                    variant="solid"
                                    isIconOnly
                                >
                                    <FaGithub size={25}/>
                                </Button>
                            </div>
                            <div>
                                <Button
                                    className="text-tiny text-white bg-sky-600"
                                    color="primary"
                                    radius="sm"
                                    size="md"
                                    variant="solid"
                                    isIconOnly
                                >
                                    <FaLinkedin size={25}/>
                                </Button>
                            </div>
                            <div>
                                <Button
                                    className="text-tiny text-white bg-sky-500"
                                    color="primary"
                                    radius="sm"
                                    size="md"
                                    variant="solid"
                                    isIconOnly
                                >
                                    <FaTelegram size={25}/>
                                </Button>
                            </div>
                            <div>
                                <Button
                                    className="text-tiny text-white bg-pink-600"
                                    color="primary"
                                    radius="sm"
                                    size="md"
                                    variant="solid"
                                    isIconOnly
                                >
                                    <FaInstagram size={25}/>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default About;