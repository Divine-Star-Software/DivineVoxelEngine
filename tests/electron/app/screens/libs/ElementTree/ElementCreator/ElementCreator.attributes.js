export const attributeSetFunction = {
    id: (elm, data) => {
        if (!data.id)
            return;
        elm.id = data.id;
    },
    className: (elm, data) => {
        if (!data.className)
            return;
        elm.className = data.className;
    },
    cssText: (elm, data) => {
        if (!data.cssText)
            return;
        elm.style.cssText = data.cssText;
    },
    accesskey: (elm, data) => {
        if (!data.accesskey)
            return;
        elm.accessKey = data.accesskey;
    },
    contenteditable: (elm, data) => {
        if (!data.contenteditable)
            return;
        elm.contentEditable = String(data.contenteditable);
    },
    dir: (elm, data) => {
        if (!data.dir)
            return;
        elm.dir = String(data.dir);
    },
    draggable: (elm, data) => {
        if (!data.draggable)
            return;
        elm.draggable = data.draggable;
    },
    hidden: (elm, data) => {
        if (!data.hidden)
            return;
        elm.hidden = data.hidden;
    },
    lang: (elm, data) => {
        if (!data.lang)
            return;
        elm.lang = data.lang;
    },
    spellcheck: (elm, data) => {
        if (!data.spellcheck)
            return;
        elm.spellcheck = data.spellcheck;
    },
    tabindex: (elm, data) => {
        if (!data.tabindex)
            return;
        elm.tabIndex = data.tabindex;
    },
    translate: (elm, data) => {
        if (!data.translate)
            return;
        elm.translate = data.translate;
    },
    th: (elm, data) => {
        if (!data.th)
            return;
        for (const key of Object.keys(data.th)) {
            if (elm[key]) {
                elm[key] = data.th[key];
            }
        }
    },
    td: (elm, data) => {
        if (!data.td)
            return;
        for (const key of Object.keys(data.td)) {
            if (elm[key]) {
                elm[key] = data.td[key];
            }
        }
    },
    img: (elm, data) => {
        if (!data.img)
            return;
        for (const key of Object.keys(data.img)) {
            if (elm[key]) {
                elm[key] = data.img[key];
            }
        }
    },
    label: (elm, data) => {
        if (!data.label)
            return;
        for (const key of Object.keys(data.label)) {
            if (elm[key]) {
                elm[key] = data.label[key];
            }
        }
    },
    input: (elm, data) => {
        if (!data.input)
            return;
        for (const key of Object.keys(data.input)) {
            if (elm[key]) {
                elm[key] = data.input[key];
            }
        }
    },
    textarea: (elm, data) => {
        if (!data.textarea)
            return;
        for (const key of Object.keys(data.textarea)) {
            if (elm[key]) {
                elm[key] = data.textarea[key];
            }
        }
    },
    audio: (elm, data) => {
        if (!data.audio)
            return;
        for (const key of Object.keys(data.audio)) {
            if (elm[key]) {
                elm[key] = data.audio[key];
            }
        }
    },
    video: (elm, data) => {
        if (!data.video)
            return;
        for (const key of Object.keys(data.video)) {
            if (elm[key]) {
                elm[key] = data.video[key];
            }
        }
    },
    track: (elm, data) => {
        if (!data.track)
            return;
        for (const key of Object.keys(data.track)) {
            if (elm[key]) {
                elm[key] = data.track[key];
            }
        }
    },
    anchor: (elm, data) => {
        if (!data.anchor)
            return;
        for (const key of Object.keys(data.anchor)) {
            if (elm[key]) {
                elm[key] = data.anchor[key];
            }
        }
    },
    form: (elm, data) => {
        if (!data.form)
            return;
        for (const key of Object.keys(data.form)) {
            if (elm[key]) {
                elm[key] = data.form[key];
            }
        }
    },
    aria: (elm, data) => {
        if (!data.aria)
            return;
        const aria = data.aria;
        if (aria.autocomplete) {
            elm.ariaAutoComplete = String(aria.autocomplete);
        }
        if (aria.checked) {
            elm.ariaChecked = String(aria.checked);
        }
        if (aria.disabled) {
            elm.ariaDisabled = String(aria.disabled);
        }
        if (aria.expanded) {
            elm.ariaExpanded = String(aria.expanded);
        }
        if (aria.haspopup) {
            elm.ariaHasPopup = String(aria.haspopup);
        }
        if (aria.hidden) {
            elm.ariaHidden = String(aria.hidden);
        }
        if (aria.label) {
            elm.ariaLabel = String(aria.label);
        }
        if (aria.modal) {
            elm.ariaModal = String(aria.modal);
        }
        if (aria.multiline) {
            elm.ariaMultiLine = String(aria.multiline);
        }
        if (aria.multiselecttable) {
            elm.ariaMultiSelectable = String(aria.multiselecttable);
        }
        if (aria.orientation) {
            elm.ariaOrientation = String(aria.orientation);
        }
        if (aria.placeholder) {
            elm.ariaPlaceholder = aria.placeholder;
        }
        if (aria.pressed) {
            elm.ariaPressed = String(aria.pressed);
        }
        if (aria.readyonly) {
            elm.ariaReadOnly = String(aria.readyonly);
        }
        if (aria.required) {
            elm.ariaRequired = String(aria.required);
        }
        if (aria.selected) {
            elm.ariaSelected = String(aria.selected);
        }
        if (aria.selected) {
            elm.ariaSelected = String(aria.selected);
        }
        if (aria.sort) {
            elm.ariaSort = String(aria.sort);
        }
        if (aria.valuemax) {
            elm.ariaValueMax = String(aria.valuemax);
        }
        if (aria.valuenow) {
            elm.ariaValueNow = String(aria.valuenow);
        }
        if (aria.valuemin) {
            elm.ariaValueMin = String(aria.valuemin);
        }
        if (aria.valuetext) {
            elm.ariaValueText = String(aria.valuetext);
        }
        if (aria.busy) {
            elm.ariaBusy = String(aria.busy);
        }
        if (aria.live) {
            elm.ariaLive = String(aria.live);
        }
        if (aria.live) {
            elm.ariaLive = String(aria.live);
        }
        if (aria.atomic) {
            elm.ariaAtomic = String(aria.atomic);
        }
        if (aria.colcount) {
            elm.ariaColCount = String(aria.colcount);
        }
        if (aria.colindex) {
            elm.ariaColIndex = String(aria.colindex);
        }
        if (aria.posinset) {
            elm.ariaPosInSet = String(aria.posinset);
        }
        if (aria.rowcount) {
            elm.ariaRowCount = String(aria.rowcount);
        }
        if (aria.rowindex) {
            elm.ariaRowIndex = String(aria.rowindex);
        }
        if (aria.rowspan) {
            elm.ariaRowSpan = String(aria.rowspan);
        }
        if (aria.setsize) {
            elm.ariaSetSize = String(aria.setsize);
        }
        if (aria.roledescription) {
            elm.ariaRoleDescription = String(aria.roledescription);
        }
        if (aria.keyshortcuts) {
            elm.ariaKeyShortcuts = String(aria.keyshortcuts);
        }
    },
    dataSet: (elm, data) => {
        if (!data.dataSet)
            return;
        for (const dataKey of Object.keys(data.dataSet)) {
            elm.dataset[dataKey] = String(data.dataSet[dataKey]);
        }
    },
};
