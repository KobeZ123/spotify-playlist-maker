import { useCallback, useEffect, useState } from "react";
import { LONG_TERM, MEDIUM_TERM, RecommendationType, SHORT_TERM } from "../utils/constants";
import { getTopItemByTerm } from "../api/loadData";
import useStore from "../stores/useStore";
import { getRandomInt } from "../utils/utils";


export function useRecommendationPager(recommendationType: RecommendationType) {
  const token = useStore((state) => state.token);
  
  // constants
  const COUNT_PER_PAGE = 8;
  const MAX_PAGES = 3;
  const SHORT_TERM_LIMIT = 30;
  const MEDIUM_TERM_LIMIT = 20;
  const LONG_TERM_LIMIT = 20;

  const [shortTermItems, setShortTermItems] = useState<any[]>([]);
  const [mediumTermItems, setMediumTermItems] = useState<any[]>([]);
  const [longTermItems, setLongTermItems] = useState<any[]>([]);
  const [currentPageIdx, setCurrentPageIdx] = useState<number>(0);

  const [alreadySelected, setAlreadySelected] = useState<any[][]>([]);

  const [pager, setPager] = useState<any[][]>([]);
  
  useEffect(() => {
    fetchRecommendations(); // Call fetchRecommendations when the hook is used
  }, []);

  useEffect(() => {
    if (alreadySelected.length > 0) {
      addPage();
    }
  }, [alreadySelected]); 

  useEffect(() => {
    console.log("pager");
    console.log(pager);
  }, [pager]);

  // fetches recommendations from spotify api for cacheing purposes
  const fetchRecommendations = useCallback(async () => {
    if (token != null) {
      // fetches top artists from each term length 
      await getTopItemByTerm(token, recommendationType, SHORT_TERM, setShortTermItems, SHORT_TERM_LIMIT);
      await getTopItemByTerm(token, recommendationType, MEDIUM_TERM, setMediumTermItems, MEDIUM_TERM_LIMIT);
      await getTopItemByTerm(token, recommendationType, LONG_TERM, setLongTermItems, LONG_TERM_LIMIT);
      
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
    if (alreadySelected.length > 0) {
      let result: any[] = []
      let count = 0

      const topItemsArray = [shortTermItems, mediumTermItems, longTermItems];
      while (count < amount) {
        let randomListIndex = getRandomInt(3);
        let resultList = topItemsArray[randomListIndex];
        let randomItemIndex = getRandomInt(resultList.length);

        if (alreadySelected[randomListIndex][randomItemIndex] === 0) {
          let randomItem = resultList[randomItemIndex];
          setAlreadySelected((prevAlreadySelected) => {
            const updatedArray = [...prevAlreadySelected];
            updatedArray[randomListIndex][randomItemIndex] = 1;
            return updatedArray;
          });
          if (!result.some((item) => item.id === randomItem.id)) {
            result.push(randomItem);
            count++;
          }
        }
      }

      console.log(alreadySelected);
      setAlreadySelected(alreadySelected);
      
      return result;
    }
    return null;
  };

  const addPage = () => {
    let requestedRecommendations = requestRecommendations(COUNT_PER_PAGE);
    setPager((prevPager) => {
      if (requestedRecommendations != null) {
        prevPager.push(requestedRecommendations)
      }
      return prevPager}
    );
  }
  
  const goToNextPage = () => {
    if (pager.length < MAX_PAGES && currentPageIdx + 1 >= pager.length) {
      addPage();
      setCurrentPageIdx(currentPageIdx + 1);
    }  
    else if (currentPageIdx < pager.length - 1) {
      setCurrentPageIdx(currentPageIdx + 1);
    }
  }

  const hasNextPage = () => {
    console.log("current page");
    console.log(currentPageIdx);
    console.log("total pages");
    console.log(MAX_PAGES - 1);
    return currentPageIdx < MAX_PAGES - 1;
  }

  const goToPreviousPage = () => {
    if (currentPageIdx > 0) {
      setCurrentPageIdx(currentPageIdx - 1);
    }
  }

  const hasPreviousPage = () => {
    return currentPageIdx > 0;
  }

  return { data: { pager: pager, currentPage: pager[currentPageIdx]}, addPage, hasNextPage, hasPreviousPage, goToNextPage, goToPreviousPage};
}