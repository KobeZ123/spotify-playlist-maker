import { ItemSelectionRecommendationProps } from "../../utils/types";

export default function ArtistSelectionRecommendation(
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
            (artist, index) =>
              index < 8 && (
                <span
                  className={
                    "rec-card-container" +
                    (props.selectedItems.some((item) => item.id === artist.id)
                      ? " selected"
                      : "")
                  }
                  key={artist.name + "_card"}
                  onClick={(event) => {
                    props.handleItemClick(event, artist);
                  }}
                >
                  <img
                    className="item-img"
                    src={artist.images.length > 0 ? artist.images[0].url : ""}
                    alt={`${artist.name}`}
                  />
                  <p className="item-text">{artist.name}</p>
                </span>
              )
          )
        )}
      </section>
    </section>
  );
}
