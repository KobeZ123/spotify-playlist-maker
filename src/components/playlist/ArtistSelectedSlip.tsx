import { ItemSelectProps } from "../../utils/types";

export default function ArtistSelectedSlip(props: ItemSelectProps) {
  return (
    <div className="selected-item-name-slip-div">
      <p
        className="selected-item-name-slip"
        id={props.data["id"]}
        key={props.data["id"]}
      >
        {props.data["name"]}
      </p>
      <p
        className="remove-selected-x"
        onClick={() => props.handleClick(props.data)}
      >
        x
      </p>
    </div>
  );
}
