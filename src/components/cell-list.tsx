import { Fragment } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";

const CellList: React.FC = () => {
    const cells = useTypedSelector((reducer) => {
        const cellsReducer = reducer.cells;
        return cellsReducer
            ? cellsReducer.order.map((id) => cellsReducer.data[id])
            : [];
    });
    const renderedCells = cells.map((cell: any) => (
        <Fragment key={cell.id}>
            <CellListItem cell={cell} />
            <AddCell previousCellId={cell.id} />
        </Fragment>
    ));

    return (
        <div>
            <AddCell forceVisible={cells.length === 0} previousCellId={null} />
            {renderedCells}
        </div>
    );
};

export default CellList;