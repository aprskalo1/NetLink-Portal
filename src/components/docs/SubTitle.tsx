import {ReactNode} from "react";

interface SubTitleProps {
    children: ReactNode;
}

const SubTitle = ({children}: SubTitleProps) => {
    return <h3 className="text-2xl font-semibold mt-4 mb-2">{children}</h3>;
};

export default SubTitle;
