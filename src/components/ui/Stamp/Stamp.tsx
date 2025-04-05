import { ReactNode } from "react";

interface PropTypes {
    children: ReactNode;
    classes: string;
}

const Stamp = (props: PropTypes) => {
    const { children, classes } = props;

    return (
        <div 
            className={classes}
            style={
                {
                    "maskImage": "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/grunge.png')",
                    "maskSize": "900px 1004px"
                }
            }
        >
            {children}
        </div>
    )
}

export default Stamp;