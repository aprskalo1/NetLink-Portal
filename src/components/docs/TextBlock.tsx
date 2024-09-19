import {ReactNode} from "react";

interface TextBlockProps {
    children: ReactNode;
}

const TextBlock = ({children}: TextBlockProps) => {
    return <p className="mb-1">{children}</p>;
};

export default TextBlock;
