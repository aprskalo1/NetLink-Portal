import CopyToClipboard from "../CopyToClipboard.tsx";

interface CodeBlockProps {
    code: string;
    language?: string;
}

const CodeBlock = ({code, language = "text"}: CodeBlockProps) => {
    return (
        <div className="flex w-full mb-4">
            <div className="bg-base-300 rounded-lg p-4 min-w-full mr-2">
                <pre className="overflow-x-auto p-1 pr-10">
                    <code className={`text-sm language-${language}`}>
                        {code}
                    </code>
                </pre>
            </div>

            <CopyToClipboard text={code}/>
        </div>
    );
};

export default CodeBlock;