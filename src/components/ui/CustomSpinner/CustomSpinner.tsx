import { Image } from "@heroui/image";
import lottieSpinner from "../../../assets/lottie-spinner2.gif";

interface PropTypes {
    width?: number;
    height?: number;
}

const CustomSpinner = (props: PropTypes) => {
    const {width, height} = props;
    return (
        <Image
            width={width}
            height={height}
            src={lottieSpinner}
        />
    )
};

export default CustomSpinner;