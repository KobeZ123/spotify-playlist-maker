import { useEffect, useState } from "react";
import { useRecommendationFetcher } from "./RecommendationsFetcher";
import { RecommendationType } from "../utils/constants";

export function useRecommendationPager() {
  const COUNT_PER_PAGE = 8;
  const [pager, setPager] = useState<any[][]>([]);
  const { data, fetchRecommendations, requestRecommendations } = useRecommendationFetcher(RecommendationType.ARTISTS);
  useEffect(() => {
    fetchRecommendations();
    if (data.length > 0 && pager.length === 0) {
      addPage();
    }
  }, [data]);

  const addPage = () => {
    let requestedRecommendations = requestRecommendations(COUNT_PER_PAGE);
    if (requestedRecommendations != null) {
      pager.push(requestedRecommendations);
    }
    console.log("pager");
    console.log(pager);
    setPager(pager);
    console.log(requestedRecommendations);
  }

  return { data: pager, addPage };
}