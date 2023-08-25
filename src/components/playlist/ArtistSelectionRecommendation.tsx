import { useEffect } from "react";
import { useRecommendationPager } from "../../data/RecommendationPager";
import { ItemSelectionRecommendationProps, SelectionCardProps } from "../../utils/types";
import { RecommendationType } from "../../utils/constants";

export default function ArtistSelectionRecommendation(
  props: ItemSelectionRecommendationProps
) {
  const { data, addPage, hasNextPage, hasPreviousPage, goToNextPage, goToPreviousPage } = useRecommendationPager(RecommendationType.ARTISTS);

  return (
    <section className="selection-recommendations">
       <button onClick={() => addPage()}>ADD PAGE</button>
      <button onClick={() => console.log(data)}>SEE PAGER</button>
      <button onClick={() => goToNextPage()}>NEXT PAGE</button>
      <button onClick={() => goToPreviousPage()}>PREVIOUS PAGE</button>
      {hasNextPage() && <h3>HAS NEXT PAGE</h3>}
      {hasPreviousPage() && <h3>HAS PREVIOUS PAGE</h3>}
      <h3>Some of your favorites</h3>
      <section className="rec-cards-container">
        {props.topItemsList.length == 0 ? (
          <h3>Loading...</h3>
        ) : (
          data.currentPage.map(
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
