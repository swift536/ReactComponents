import React, { useState, useEffect } from 'react';
import styles from './HelpfulScrollbar.module.css';

const HelpfulScrollbar = (props) => {
    let scrollerHeight = 100 * (props.displayedCount/props.totalCount);

    //used for determining if scrolling is occuring and how much
    let scrollStartY = 0;
    let scrollCurrentY = 0;

    //let mouseDownOnScroller = false;
    const [mouseDownOnScroller, setMouseDownOnScroller] = useState(false);
    const stateRef = React.useRef(mouseDownOnScroller);
    const [scrollerTop, setScrollerTop] = useState(0);
    const [height, setHeight] = useState(0);
    useEffect(() => {
        console.log("HelpfulScrollbar useEffect");
        window.addEventListener("mousemove", mouseListener);
        window.addEventListener("mouseup", scrollerOnMouseUp);//needed because the mouse may not be over the scroller when released
    }, []);

    useEffect(() => {
        console.log("UseEffect, MouseDown: " + mouseDownOnScroller);
    }, [mouseDownOnScroller]);

    const mouseListener = (event) => {
        console.log("MouseMovement listener, MouseDown: " + stateRef.current);
        if (stateRef.current) {
            scrollCurrentY = event.clientY;
            console.log(scrollCurrentY);
            let deltaY = scrollCurrentY - scrollStartY;
            setScrollerTop(deltaY);
        }
    }

    const callback_setScrollHeight = () => {

    }

    const scrollerOnMouseDown = (event) => {
        event.preventDefault();
        stateRef.current = true;
        //mouseDownOnScroller = true;
        setMouseDownOnScroller(true);
        scrollStartY = event.clientY;
        //console.log("MouseDown: " + mouseDownOnScroller);
    }

    const scrollerOnMouseUp = (event) => {
        event.preventDefault();
        //mouseDownOnScroller = false;
        stateRef.current = false;
        setMouseDownOnScroller(false);
        //console.log("MouseDown: " + mouseDownOnScroller);
    }

    return(
        <div className={styles.container}>
            <div className={styles.scrollContainer} 
            style={{position:"relative", top:(scrollerTop), height:{scrollerHeight}, minHeight:"20px", maxHeight:"100px"}} 
            onMouseDown={scrollerOnMouseDown} 
            /*onMouseUp={scrollerOnMouseUp}*/></div>
        </div>
    );
}

export default HelpfulScrollbar;