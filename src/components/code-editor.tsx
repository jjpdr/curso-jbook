import { useRef } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
    const editorRef = useRef<any>();

    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
        editorRef.current = monacoEditor;
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue());
        });
    };

    const onFormatClick = () => {
        const unformatted = editorRef.current.getModel().getValue();

        const formatted = prettier.format(unformatted, {
            parser: "babel",
            plugins: [parser],
            useTabs: true,
            semi: true,
            singleQuote: false,
        });

        editorRef.current.setValue(formatted);
    };

    return (
        <>
            <button onClick={onFormatClick}>Format</button>
            <MonacoEditor
                value={initialValue}
                editorDidMount={onEditorDidMount}
                theme="dark"
                language="javascript"
                height="500px"
                options={{
                    wordWrap: "on",
                    minimap: { enabled: false },
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 16,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />
        </>
    );
};

export default CodeEditor;
