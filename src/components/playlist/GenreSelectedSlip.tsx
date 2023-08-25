import { ItemSelectProps } from "../../utils/types";
import { polishGenreName } from "../../utils/utils";

interface GenreSelectedSlipProps extends ItemSelectProps {
  color: string;
}

export default function GenreSelectedSlip(props: GenreSelectedSlipProps) {
  return (
    <div className="selected-item-name-slip-div" style={{ backgroundColor: props.color }}>
      <p className="selected-item-name-slip" id={props.data} key={props.data}>
        {polishGenreName(props.data)}
      </p>
      <p
        className="remove-selected-x"
        onClick={(event) => props.handleClick(props.data)}
      >
        x
      </p>
    </div>
  );
}
