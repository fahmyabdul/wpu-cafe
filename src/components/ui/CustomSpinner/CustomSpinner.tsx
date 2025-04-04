import lottieSpinner from "../../../assets/lottie-spinner2.webm";

interface PropTypes {
    width?: number;
    height?: number;
}

const CustomSpinner = (props: PropTypes) => {
    const {width, height} = props;
    return (
        <video
            width={width}
            height={height}
            src={lottieSpinner}
            autoPlay
            playsInline
            loop
            muted
        />
    )
};

export default CustomSpinner;