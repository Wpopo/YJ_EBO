import { useState, useEffect } from 'react';
import { useDispatchEvent } from './useInterceptor';

const usePagination = onChange => {
  const dispatchEvent = useDispatchEvent();

  const [page, _setPage] = useState(1);
  const [perPage, _setPerPage] = useState(10);
  const [totalCount, _setTotalCount] = useState();

  useEffect(() => {
    onChange && onChange({ page, perPage });
  }, [page, perPage]);

  const setPage = async value => {
    if (await dispatchEvent('SET_PAGE', page, value)) return;
    _setPage(+value);
    // console.log('setPage', value);
  };

  const setPerPage = async value => {
    if (await dispatchEvent('SET_PER_PAGE', perPage, value)) return;
    _setPage(1);
    _setPerPage(+value);
    // console.log('setPerPage', value);
  };

  const setTotalCount = async value => {
    _setPage(1);
    _setTotalCount(+value);
    // console.log('setTotalCount', value);
  };

  return {
    page,
    perPage,
    onPageChange: setPage,
    onPerPageChange: setPerPage,
    onTotalCountChange: setTotalCount,
    setPage,
    setPerPage,
    setTotalCount,
  };
};

export default usePagination;
