import { useCallback, useState } from "react";
import { LONG_TERM, MEDIUM_TERM, RecommendationType, SHORT_TERM } from "../utils/constants";
import { getTopItemByTerm } from "../api/loadData";
import useStore from "../stores/useStore";
import { getRandomInt } from "../utils/utils";



export function useRecommendationFetcher(recommendationType: RecommendationType) {

  // constants
  const SHORT_TERM_LIMIT = 30;
  const MEDIUM_TERM_LIMIT = 20;
  const LONG_TERM_LIMIT = 20;

  const [shortTermItems, setShortTermItems] = useState<any[]>([]);
  const [mediumTermItems, setMediumTermItems] = useState<any[]>([]);
  const [longTermItems, setLongTermItems] = useState<any[]>([]);

  const [alreadySelected, setAlreadySelected] = useState<any[][]>([]);

  const token = useStore((state) => state.token);

  // fetches recommendations from spotify api for cacheing purposes
  const fetchRecommendations = useCallback(async () => {
    if (token != null) {
      // fetches top artists from each term length 
      await getTopItemByTerm(token, recommendationType, SHORT_TERM, setShortTermItems, SHORT_TERM_LIMIT);
      await getTopItemByTerm(token, recommendationType, MEDIUM_TERM, setMediumTermItems, MEDIUM_TERM_LIMIT);
      await getTopItemByTerm(token, recommendationType, LONG_TERM, setLongTermItems, LONG_TERM_LIMIT);
      
      console.log(shortTermItems);
      console.log(mediumTermItems);
      console.log(longTermItems);
      // initialize alreadySelected array
      let arrayWithZeros = [];

      for (let i = 0; i < 3; i++) {
        const termLimit = i === 0 ? SHORT_TERM_LIMIT : (i === 1 ? MEDIUM_TERM_LIMIT : LONG_TERM_LIMIT);
        const zerosArray = new Array(termLimit).fill(0);
        arrayWithZeros.push(zerosArray);
      }
      setAlreadySelected(arrayWithZeros);
    } 
  }, [getTopItemByTerm]);

  // requests a list of {amount} items
  const requestRecommendations = (amount: number) => {
    if (alreadySelected != null) {
      let result = []
      let count = 0

      const topItemsArray = [shortTermItems, mediumTermItems, longTermItems];
      while (count < amount) {
        let randomListIndex = getRandomInt(3);
        let resultList = topItemsArray[randomListIndex];
        let randomItemIndex = getRandomInt(resultList.length);

        if (alreadySelected[randomListIndex][randomItemIndex] === 0) {
          result.push(resultList[randomItemIndex]);
          alreadySelected[randomListIndex][randomItemIndex] = 1;
          count++;
        }
      }

      console.log(alreadySelected);
      setAlreadySelected(alreadySelected);
      
      return result;
    }
  };

  return { fetchRecommendations, requestRecommendations };
}
