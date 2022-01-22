import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";

const CellList: React.FC = () => {
    const cells = useTypedSelector((reducer) => {
        const cellsReducer = reducer.cells;
        return cellsReducer
            ? cellsReducer.order.map((id) => cellsReducer.data[id])
            : [];
    });
    const renderedCells = cells.map((cell: any) => (
        <CellListItem key={cell.id} cell={cell} />
    ));

    return <div>{renderedCells}</div>;
};

export default CellList;
