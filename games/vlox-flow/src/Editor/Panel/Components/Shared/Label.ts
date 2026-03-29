export default function (ownerDocument: Document, label: string) {
  const labelContainer = ownerDocument.createElement("div");
  labelContainer.className = "label";
  const labelText = ownerDocument.createElement("p");
  labelContainer.append(labelText);
  labelText.innerText = label;
  return labelContainer;
}
