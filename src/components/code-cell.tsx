import "./code-cell.css";
import { useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";

interface CodeCellProps {
    cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const { updateCell, createBundle } = useActions();
    const bundle = useTypedSelector((state: any) => state.bundles[cell.id]);
    const cumulativeCode = useTypedSelector((state: any) => {
        const { data, order } = state.cells;
        const orderedCells = order.map((id: any) => data[id]);

        const cumulativeCode = [];
        for (let c of orderedCells) {
            if (c.type === "code") cumulativeCode.push(c.content);
            if (c.id === cell.id) break;
        }

        return cumulativeCode;
    });

    useEffect(() => {
        //First time page is loaded
        if (!bundle) {
            createBundle(cell.id, cumulativeCode.join("\n"));
            return;
        }

        const timer = setTimeout(async () => {
            createBundle(cell.id, cumulativeCode.join("\n"));
        }, 777);

        return () => {
            clearTimeout(timer);
        };
    }, [cell.id, cumulativeCode.join("\n"), createBundle]);

    return (
        <Resizable direction="vertical">
            <div
                style={{
                    height: "calc(100% - 10px)",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Resizable direction="horizontal">
                    <CodeEditor
                        initialValue={cell.content}
                        onChange={(value) => updateCell(cell.id, value)}
                    />
                </Resizable>
                <div className="progress-wrapper">
                    {!bundle || bundle.loading ? (
                        <div className="progress-cover">
                            <progress
                                className="progress is-small is-primary"
                                max="100"
                            >
                                Loading
                            </progress>
                        </div>
                    ) : (
                        <Preview code={bundle.code} err={bundle.err} />
                    )}
                </div>
            </div>
        </Resizable>
    );
};

export default CodeCell;
