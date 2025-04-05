import { ReactNode } from "react";

interface PropTypes {
    children: ReactNode;
}

const ErrorLayout = (props: PropTypes) => {
    const { children } = props;
    return (
        <div>
            {children}
        </div>
    )
};

export default ErrorLayout;