import { useRecommendationPager } from "../../data/RecommendationPager";
import { ItemSelectionRecommendationProps, SelectionCardProps } from "../../utils/types";
import { RecommendationType } from "../../utils/constants";
import right_arrow from "../../assets/arrow-icon-right.png";
import left_arrow from "../../assets/arrow-icon-left.png";
import { useEffect } from "react";
import { LoadingSelectionCardPlaceholder } from "./LoadingSelectionCardPlaceholder";

export default function ArtistSelectionRecommendation(
  props: ItemSelectionRecommendationProps
) {
  const { data, hasNextPage, hasPreviousPage, goToNextPage, goToPreviousPage } = useRecommendationPager(RecommendationType.ARTISTS);

  useEffect(() => {
    console.log(data);
    console.log(hasPreviousPage());
    console.log(hasNextPage());
  }, [data]);

  return (
    <section className="selection-recommendations">
      <h3>Some of your favorites</h3>
      <div className="rec-cards-pager-container">
        <button className={`change-page-btn ${data.currentPage != null && hasPreviousPage() ? '' : 'hidden'}`} onClick={goToPreviousPage}>
          <img src={left_arrow} width={36} height={36} />
        </button>
        <section className="rec-cards-container">
          {data.currentPage == null || data.currentPage.length == 0 ? (
            Array.from({ length: 8 }, (_, i) => (
              <LoadingSelectionCardPlaceholder />
            ))
          ) : (
            data.currentPage.map(
              (artist, index) =>
                index < 8 && (
                  <ArtistSelectionCard 
                    key={artist.id}
                    data={artist} 
                    selected={props.selectedItems.some((item) => item.id === artist.id)}
                    onSelected={props.handleItemClick} />
                )
            )
          )}
        </section>
        
        <button className={`change-page-btn ${data.currentPage != null && hasNextPage() ? '' : 'hidden'}`} onClick={goToNextPage}>
          <img src={right_arrow} width={36} height={36}/>
        </button>
      </div>
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
