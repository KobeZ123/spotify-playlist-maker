import { ItemSelectProps } from "../../utils/types";
import { reduceArtistNamesToString } from "../../utils/utils";

export default function TrackSelectedSlip(props: ItemSelectProps) {
  return (
    <div className="selected-item-name-slip-div">
      <p
        className="selected-item-name-slip"
        id={props.data["id"]}
        key={props.data["id"]}
      >
        {props.data["name"] +
          " - " +
          reduceArtistNamesToString(props.data["artists"])}
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
