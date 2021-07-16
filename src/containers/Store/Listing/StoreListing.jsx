import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BarLoader from '../../../components/helper/UI/Loaders/BarLoader/BarLoader';
import StoreHeader from "../../../components/main/Store/StoreHeader/StoreHeader";
import StoreBody from '../../../components/main/Store/Storebody/StoreBody';

import { getAllStores } from '../../../store/actions';
import { LOADERS } from '../../../utils/constants';

const defaultLimit = 5;

const StoreListing = () => {

  const [filterInput, setFiltersInput] = useState({});
  const [filtersAppliedCount, setFiltersAppliedCount] = useState(false);
  const paginationInputRef = useRef({ limit: defaultLimit, offset: 0 });

  const dispatch = useDispatch();
  const store = useSelector(state => state.store);
  const loading = store.loader === LOADERS.GET_ALL_STORES;


  const getAllStoreshandler = (data = {}, response_function) => {
    const payload = {
      ...data,
      ...paginationInputRef.current
    };
    dispatch(getAllStores(payload, response_function));
  }

  const filterInputHandler = (e) => {
    const { name, value } = e.target;
    setFiltersInput((prevState) => ({ ...prevState, [name]: value || undefined }));
  }

  const clearFiltersHandler = () => {
    setFiltersInput({});
    setFiltersAppliedCount(0);
    getAllStoreshandler();
  }

  const paginationInputHandler = (values={}) => {
    paginationInputRef.current = {...paginationInputRef.current, ...values};
    getAllStoreshandler();
  }

  const applyFiltersHandler = () => {
    getAllStoreshandler(filterInput, () => setFiltersAppliedCount(Object.values(filterInput).filter(Boolean).length));
  }

  useEffect(() => {
    !store.stores.length && getAllStoreshandler()
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <React.Fragment>
      <StoreHeader inputValues={filterInput} filtersAppliedCount={filtersAppliedCount} inputHandler={filterInputHandler} applyFiltersHandler={applyFiltersHandler} clearFiltersHandler={clearFiltersHandler} />
      {loading && <BarLoader />}
      <StoreBody stores={store.stores} total_stores={store.total_stores} paginationInputHandler={paginationInputHandler} />

    </React.Fragment>
  );
};

export default StoreListing;
