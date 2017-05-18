import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchStoreData, GET_STORE_DATA, GET_STORE_DATA_FAILURE, GET_STORE_DATA_SUCCESS } from './actionCreators';
import nock from 'nock';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const data = [
  {
    "uid": "zone_1",
    "name": "Check-out",
    "description": "",
    "location": "store_1",
    "parentZone": "zone_101",
    "function": "TBD"
  },
  {
    "uid": "zone_2",
    "name": "Beverage cooler",
    "description": "",
    "location": "store_1",
    "parentZone": "zone_101",
    "function": "TBD"
  }
]

const error = [
  {
    "status": 404,
    "message": "Test Error!"
  }
];

it(`Should dispatch GET_STORE_DATA and GET_STORE_DATA_SUCCESS actions`, () => {
  nock(`https://acree001.mybluemix.net/api/v0001`)
  .get(`/zones`)
  .reply(200, data);

  const expectedActions = [
    { type: GET_STORE_DATA },
    { type: GET_STORE_DATA_SUCCESS, payload: data }
  ];

  const store = mockStore({
    fetchingData: false,
    fetchDataError: null,
    storeData: {}
  });

  return store.dispatch(fetchStoreData())
  .then(() => {
    expect(store.getActions()).toEqual(expectedActions)
  })
});

it(`Should dispatch GET_STORE_DATA and GET_STORE_DATA_FAILURE action`, () => {
  nock(`https://api.github.com/user/orgs`)
  .get(`/zones`)
  .reply(404, error);

  const expectedActions = [
    { type: GET_STORE_DATA },
    { type: GET_STORE_DATA_FAILURE, payload: error }
  ];

  const store = mockStore({
    fetchingData: false,
    fetchDataError: error
  });

  return store.dispatch(fetchStoreData())
  .then(() => {
    expect(store.getActions()).toEqual(expectedActions)
  })
});
