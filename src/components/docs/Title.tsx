import {ReactNode} from "react";

interface TitleProps {
    children: ReactNode;
}

const Title = ({children}: TitleProps) => {
    return <h1 className="text-4xl font-bold mb-5">{children}</h1>;
};

export default Title;
