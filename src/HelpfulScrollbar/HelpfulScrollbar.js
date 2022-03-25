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
    const scrollbarContainer = React.useRef();
    const scrollContainer = React.useRef();

    //Needs to occur after scrollbarContainer and scrollContainer so the values can be used.
    let maxScroll;
    if (scrollbarContainer.current !== undefined && scrollContainer.current !== undefined) {
        maxScroll = Number.parseFloat(scrollbarContainer.current.clientHeight) - Number.parseFloat(scrollContainer.current.clientHeight);
    }

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
            let stringScrollerTop = document.getElementById("scrollContainer").style.top;
            let scrollerTop = Number.parseFloat(stringScrollerTop.substring(0,stringScrollerTop.length-2));
            if (scrollerTop + deltaY < 0) {
                setScrollerTop(0);
                console.log("set top to 0");
            }
            setScrollerTop(deltaY);
            //console.log("deltaY: " + deltaY);
        }
    }

    const callback_setScrollHeight = () => {
        if (scrollContainer.current !== undefined) {
            props.getScrollHeightCallback(scrollerTop/maxScroll);
        } 
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

    let top = scrollerTop;
    if (scrollerTop<0) {
        top=0;
    } else if (scrollerTop>maxScroll) {
        top=maxScroll;
    }

    //DEBUG
    if (scrollContainer.current !== undefined)
        console.log("Scroll percent: " + Number.parseFloat(scrollContainer.current.style.top)/maxScroll);

    return(
        <div id="scrollbarContainer" ref={scrollbarContainer} className={styles.container}>
            <div id="scrollContainer" ref={scrollContainer} className={styles.scrollContainer} 
            style={{position:"relative", top:top+"px", height:{scrollerHeight}, minHeight:"20px", maxHeight:"100px"}} 
            onMouseDown={scrollerOnMouseDown} 
            /*onMouseUp={scrollerOnMouseUp}*/></div>
        </div>
    );
}

export default HelpfulScrollbar;