import React from "react";
import CopyToClipBoard from "../CopyToClipBoard";

interface CodeBlockProps {
    code: string;
    language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({code, language = "text"}) => {
    return (
        <div className="flex w-full">
            <div className="bg-base-300 rounded-lg p-4 min-w-full mr-2">
                <pre className="overflow-x-auto p-1 pr-10">
                    <code className={`text-sm language-${language}`}>
                        {code}
                    </code>
                </pre>
            </div>

            <CopyToClipBoard text={code}/>
        </div>
    );
};

export default CodeBlock;
