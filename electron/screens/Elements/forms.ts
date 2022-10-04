import { ElementTree, ElementTreeData } from "../libs/index.js";
export const div = (
 className: string,
 children: ElementTreeData
): ElementTreeData => {
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

export const hformOptionSelect = (
 options: { text: string; value: string; active?: boolean }[],
 onChange: (value: string) => void
): ElementTreeData => {
 const cascadeProps = { option: "" };
 const [cascade] = ElementTree.cascade(cascadeProps);

 const elements: ElementTreeData = [];
 for (const option of options) {
  if (option.active) {
   cascadeProps.option = option.value;
  }
  elements.push(
   formOption(option, cascadeProps, () => {
    cascadeProps.option = option.value;
    cascade();
    onChange(option.value);
   })
  );
 }
 return div("hform-optin-group", elements);
};

export const formButton = (text: string, onClick: Function) => {
 return div("form-group", [
  {
   type: "button",
   attrs: {
    className: "form-buttom",
   },
   text: text,
   events: {
    onClick: (event: any) => {
     event.preventDefault();
     onClick();
    },
   },
  },
 ]);
};

const formOption = (
 option: { text: string; value: string; active?: boolean },
 cascadeProps: any,
 onClick: Function
): ElementTreeData => {
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
    receiver: (elm: HTMLElement, props) => {
     if (props.option == option.value) {
      elm.classList.remove("inactive");
      elm.classList.add("active");
     } else {
      elm.classList.add("inactive");
      elm.classList.remove("active");
     }
    },
   },
   events: {
    onClick: onClick,
    onKeyDown: (event: KeyboardEvent) => {
     if (event.key == " " || event.key == "Enter") {
      onClick();
      (event as any).target.click();
     }
    },
   },
  },
 ];
};
