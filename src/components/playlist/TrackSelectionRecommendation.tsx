import { ItemSelectionRecommendationProps } from "../../utils/types";

export default function TrackSelectionRecommendation(
  props: ItemSelectionRecommendationProps
) {
  return (
    <section className="selection-recommendations">
      <h3>Some of your favorites</h3>
      <section className="rec-cards-container">
        {props.topItemsList.length == 0 ? (
          <h3>Loading...</h3>
        ) : (
          props.topItemsList.map(
            (track, index) =>
              index < 8 && (
                <span
                  className={
                    "rec-card-container" +
                    (props.selectedItems.some((item) => item.id === track.id)
                      ? " selected"
                      : "")
                  }
                  key={track.name + "_card"}
                  onClick={(event) => {
                    props.handleItemClick(track);
                  }}
                >
                  <img
                    className="rec-item-img"
                    src={
                      track.album.images.length > 0
                        ? track.album.images[0].url
                        : ""
                    }
                    alt={`${track.name}`}
                  />
                  <p className="rec-item-text">{track.name}</p>
                </span>
              )
          )
        )}
      </section>
    </section>
  );
}
