import { createRef, useRef, useState } from "react";
import styles from './VirtualTable.module.css';

/**
 * 
 * @param {*} props 
 * @props numVisibleRows - number of rows to be displayed inside the viewport
 *          columns - array of column header information {name, hgrow, accessor}
 *          items - array of JSON items to be displayed
 */
const VirtualTable = (props) => {
    const [viewableRange, setViewableRange] = useState({start: 0, end: props.tableFormatting.numberVisibleRows});
    const viewportRef = createRef();

    const getHeaders = () => {

    }

    const getRows = () => {
        let result=[];
        for (let i=viewableRange.start;i<viewableRange.end+1;i++){
            result.push(<div className={styles.item} key={i} style={{top:i*props.tableFormatting.itemHeight, height: props.tableFormatting.itemHeight}}>{props.items[i].name}</div>);
        }
        return result;
    }

    const onScroll = () => {
        let currentIndx=Math.trunc(viewportRef.current.scrollTop/props.tableFormatting.itemHeight)
        currentIndx = currentIndx-props.tableFormatting.numberVisibleRows >= props.items.length ? currentIndx-props.tableFormatting.numberVisibleRows : currentIndx;
        if (currentIndx!==viewableRange.start){
            console.log("Redraw");
            setViewableRange({start:currentIndx, end:currentIndx+props.tableFormatting.numberVisibleRows>=props.items.length ? props.items.length-1:currentIndx+props.tableFormatting.numberVisibleRows})
        }
    }

    return (
        <div ref={viewportRef}  className={styles.viewPort} onScroll={onScroll}>
            <div className={styles.itemContainer}>
                {getRows()}
            </div>
        </div>
    );
}

export default VirtualTable;