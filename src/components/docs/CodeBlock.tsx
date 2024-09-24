import {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-csharp';
import CopyToClipboard from '../CopyToClipboard.tsx';

interface CodeBlockProps {
    code: string;
    language?: string;
}

const CodeBlock = ({code, language = 'text'}: CodeBlockProps) => {
    useEffect(() => {
        Prism.highlightAll();
    }, [code]);

    return (
        <div className="flex w-full mb-4">
            <div className="min-w-full mr-2">
                <pre className="overflow-x-auto">
                    <code className={`language-${language}`}>{code}</code>
                </pre>
            </div>
            <CopyToClipboard text={code}/>
        </div>
    );
};

export default CodeBlock;
