import { useEffect, useState } from "react";
import { useRecommendationFetcher } from "./RecommendationsFetcher";
import { RecommendationType } from "../utils/constants";

export function useRecommendationPager() {
  const COUNT_PER_PAGE = 8;
  const [pager, setPager] = useState<any[][]>([]);
  const { fetchRecommendations, requestRecommendations } = useRecommendationFetcher(RecommendationType.ARTISTS);
  useEffect(() => {
    fetchRecommendations();
    initializePager();
  }, []);

  const initializePager = () => {
    let requestedRecommendations = requestRecommendations(COUNT_PER_PAGE);
    if (requestedRecommendations != null) {
      pager.push(requestedRecommendations);
    }
    setPager(pager);
    console.log(requestedRecommendations);
  }
}