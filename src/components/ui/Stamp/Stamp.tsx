import { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import '../../../styles/stamp.css';

interface PropTypes {
    children: ReactNode;
    classes: string;
}

const Stamp = (props: PropTypes) => {
    const { children, classes } = props;

    return (
        <div 
            className={cn(
                "stamp",
                classes
            )}
        >
            {children}
        </div>
    )
}

export default Stamp;