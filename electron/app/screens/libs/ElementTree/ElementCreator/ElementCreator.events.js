export const elementEventFunctions = {
    onInput: (elm, elmObj) => {
        elm.addEventListener("input", elmObj.events.onInput);
    },
    onReset: (elm, elmObj) => {
        elm.addEventListener("reset", elmObj.events.onReset);
    },
    onSearch: (elm, elmObj) => {
        elm.addEventListener("search", elmObj.events.onSearch);
    },
    onChange: (elm, elmObj) => {
        elm.addEventListener("change", elmObj.events.onChange);
    },
    onClick: (elm, elmObj) => {
        elm.addEventListener("click", elmObj.events.onClick);
    },
    onDoubleClick: (elm, elmObj) => {
        elm.addEventListener("dbclick", elmObj.events.onDoubleClick);
    },
    onContextMenu: (elm, elmObj) => {
        elm.addEventListener("contextmenu", elmObj.events.onContextMenu);
    },
    onKeyDown: (elm, elmObj) => {
        elm.addEventListener("keydown", elmObj.events.onKeyDown);
    },
    onKeyUp: (elm, elmObj) => {
        elm.addEventListener("keyup", elmObj.events.onKeyUp);
    },
    onKeyPress: (elm, elmObj) => {
        elm.addEventListener("keypress", elmObj.events.onKeyPress);
    },
    onTouchStart: (elm, elmObj) => {
        elm.addEventListener("touchstart", elmObj.events.onTouchStart);
    },
    onTouchEnd: (elm, elmObj) => {
        elm.addEventListener("touchend", elmObj.events.onTouchEnd);
    },
    onTouchMove: (elm, elmObj) => {
        elm.addEventListener("touchmove", elmObj.events.onTouchMove);
    },
    onWheel: (elm, elmObj) => {
        elm.addEventListener("wheel", elmObj.events.onWheel);
    },
    onMouseUp: (elm, elmObj) => {
        elm.addEventListener("mouseup", elmObj.events.onMouseUp);
    },
    onMouseDown: (elm, elmObj) => {
        elm.addEventListener("mousedown", elmObj.events.onMouseDown);
    },
    onMouseOver: (elm, elmObj) => {
        elm.addEventListener("mouseover", elmObj.events.onMouseOver);
    },
    onMouseEnter: (elm, elmObj) => {
        elm.addEventListener("mouseenter", elmObj.events.onMouseEnter);
    },
    onMouseMove: (elm, elmObj) => {
        elm.addEventListener("mousemove", elmObj.events.onMouseMove);
    },
    onMouseLeave: (elm, elmObj) => {
        elm.addEventListener("mouseleave", elmObj.events.onMouseLeave);
    },
    onFocus: (elm, elmObj) => {
        elm.addEventListener("focus", elmObj.events.onFocus);
    },
    onFocusIn: (elm, elmObj) => {
        elm.addEventListener("focusin", elmObj.events.onFocusIn);
    },
    onFocusOut: (elm, elmObj) => {
        elm.addEventListener("focusout", elmObj.events.onFocusOut);
    },
    onBlur: (elm, elmObj) => {
        elm.addEventListener("blur", elmObj.events.onBlur);
    },
    onSelect: (elm, elmObj) => {
        elm.addEventListener("select", elmObj.events.onSelect);
    },
    onCopy: (elm, elmObj) => {
        elm.addEventListener("copy", elmObj.events.onCopy);
    },
    onCut: (elm, elmObj) => {
        elm.addEventListener("cut", elmObj.events.onCut);
    },
    onPaste: (elm, elmObj) => {
        elm.addEventListener("paste", elmObj.events.onPaste);
    },
    onDrag: (elm, elmObj) => {
        elm.addEventListener("drag", elmObj.events.onDrag);
    },
    onDragEnd: (elm, elmObj) => {
        elm.addEventListener("dragend", elmObj.events.onDragEnd);
    },
    onDragStart: (elm, elmObj) => {
        elm.addEventListener("dragstart", elmObj.events.onDragStart);
    },
    onDrop: (elm, elmObj) => {
        elm.addEventListener("drop", elmObj.events.onDrop);
    },
};
