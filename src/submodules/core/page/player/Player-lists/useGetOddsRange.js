import React, { useState, useEffect, useMemo } from 'react';
import { PLAYER_LISTS as API } from 'Constants/api/api';
import { useDispatch } from 'react-redux';
import useAxiosSelector2 from 'Hooks/useAxiosSelector2';
//Redux
import {
  getOddsRangeAction,
  getTopLineOddsRangeAction,
  checkTopLineAccountAction,
} from 'Redux/axios/action';

const useGetOddsRange = (
  oddsRangeParams = null,
  successCallback = v => null
) => {
  const dispatch = useDispatch();
  const defaultOddsRange =
    useAxiosSelector2(API.GET_PLAYER_ODDS_RANGE)?.oddsRange || [];

  const topLineOddsRange = useAxiosSelector2(API.GET_TOPLINE_ODDS_RANGE)
    ?.oddsRange;
  const topLineExist = useAxiosSelector2(API.GET_TOPLINE_ACCOUNT);

  const [oddsRange, setOddsRange] = useState([]);
  const [message, setMessage] = useState('');
  const [topLineCheckbox, setTopLineCheckbox] = useState(false);

  useEffect(() => {
    if (oddsRangeParams) {
      dispatch(getOddsRangeAction(oddsRangeParams));
    }
  }, []);

  useEffect(() => {
    if (topLineExist?.exist) {
      dispatch(getTopLineOddsRangeAction(topLineExist.account));
    }
  }, [topLineExist]);

  useEffect(() => {
    if (defaultOddsRange) {
      setOddsRange(defaultOddsRange);
      setMessage('default');
    }
  }, [defaultOddsRange]);

  useEffect(() => {
    if (topLineExist?.exist && topLineOddsRange) {
      setOddsRange(topLineOddsRange);
      setMessage('topLineOdds');
    } else if (topLineExist?.exist && !topLineOddsRange) {
      setMessage('Loading');
    } else {
      setMessage('TopLineNotFound');
    }
  }, [topLineOddsRange]);

  useEffect(() => {
    setOddsRange(defaultOddsRange);
    setMessage('default');
  }, [topLineCheckbox]);

  useEffect(() => {
    if (message === 'topLineOdds') {
      successCallback();
    }
  }, [message]);

  const checkTopLineExist = topLineAccount => {
    dispatch(checkTopLineAccountAction({ topLineID: topLineAccount }));
  };

  if (!oddsRangeParams) {
    return null;
  } else
    return {
      oddsRange: oddsRange,
      checkTopLineExist,
      oddsMessage: message,
      topLineCheckbox,
      setTopLineCheckbox,
      confirmedTopLine: topLineExist?.account,
    };
};

export default useGetOddsRange;
