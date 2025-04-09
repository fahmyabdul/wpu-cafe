import { Image } from "@heroui/image";
// import lottieSpinner from "../../../assets/lottie-spinner2.gif";
import meGif from "../../../assets/wpu-my.gif";

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
            src={meGif}
        />
    )
};

export default CustomSpinner;