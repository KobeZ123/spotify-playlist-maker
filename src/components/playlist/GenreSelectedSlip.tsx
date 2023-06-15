import { ItemSelectProps } from "../../utils/types";
import { polishGenreName } from "../../utils/utils";

export default function GenreSelectedSlip(props: ItemSelectProps) {
  return (
    <div className="selected-item-name-slip-div">
      <p
        className="selected-item-name-slip"
        id={props.data}
        key={props.data}
      >
        {polishGenreName(props.data)}
      </p>
      <p
        className="remove-selected-x"
        onClick={(event) => props.handleClick(event, props.data)}
      >
        x
      </p>
    </div>
  );
}
