import { ElementTree } from "../libs/index.js";
export const div = (className, children) => {
    return [
        {
            type: "div",
            attrs: {
                className: className,
            },
            children: children,
        },
    ];
};
export const hformOptionSelect = (options, onChange) => {
    const cascadeProps = { option: "" };
    const [cascade] = ElementTree.cascade(cascadeProps);
    const elements = [];
    for (const option of options) {
        if (option.active) {
            cascadeProps.option = option.value;
        }
        elements.push(formOption(option, cascadeProps, () => {
            cascadeProps.option = option.value;
            cascade();
            onChange(option.value);
        }));
    }
    return div("hform-optin-group", elements);
};
export const formButton = (text, onClick) => {
    return div("form-group", [
        {
            type: "button",
            attrs: {
                className: "form-buttom",
            },
            text: text,
            events: {
                onClick: (event) => {
                    event.preventDefault();
                    onClick();
                },
            },
        },
    ]);
};
const formOption = (option, cascadeProps, onClick) => {
    let className = "form-option";
    if (option.active) {
        className += " active";
    }
    return [
        {
            type: "div",
            attrs: {
                className: className,
                tabindex: 0,
            },
            children: [
                {
                    type: "p",
                    attrs: {
                        className: "form-option-text",
                    },
                    text: option.text,
                },
            ],
            cascade: {
                origin: cascadeProps,
                receiver: (elm, props) => {
                    if (props.option == option.value) {
                        elm.classList.remove("inactive");
                        elm.classList.add("active");
                    }
                    else {
                        elm.classList.add("inactive");
                        elm.classList.remove("active");
                    }
                },
            },
            events: {
                onClick: onClick,
                onKeyDown: (event) => {
                    if (event.key == " " || event.key == "Enter") {
                        onClick();
                        event.target.click();
                    }
                },
            },
        },
    ];
};
