import { ItemSelectionRecommendationProps, SelectionCardProps } from "../../utils/types";

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
                <ArtistSelectionCard 
                  data={artist} 
                  selected={props.selectedItems.some((item) => item.id === artist.id)}
                  onSelected={props.handleItemClick} />
              )
          )
        )}
      </section>
    </section>
  );
}



const ArtistSelectionCard = ({data, selected, onSelected}: SelectionCardProps) => {
  return (
    <span
      className={
        "rec-card-container" + (selected ? " selected" : "")
      }
      key={data.name + "_card"}
      onClick={() => {
        onSelected(data);
      }}
    >
      <img
        className="rec-item-img"
        src={data.images.length > 0 ? data.images[0].url : ""}
        alt={`${data.name}`}
      />
      <p className="rec-item-text">{data.name}</p>
    </span>
  )
}
