import {
  GET_ALL_DOGS,
  GET_ALL_TEMPS,
  GET_DOG_BY_ID,
  GET_DOG_BY_NAME,
  CREATE_DOG,
  ORDER_DOGS,
  FILTER_DOGS,
  PAGINATION,
  DELETE_DOG,
  CLEAR_SEARCH,
  TOGGLE_FETCHING,
} from "../types";

// Seteamos el estado inicial del reducer
const initialState = {
  allDogs: [],
  filteredDogs: [],
  shownDogs: [],
  allTemps: [],
  createdDogs: [],
  detailDog: {},
  searchDogs: [],
  currentPage: 1,
  itemsPerPage: 8,
  dogsQty: 0,
  fetching: false,
};

// Seteamos el reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FETCHING:
      return {
        ...state,
        fetching: !state.fetching,
      };

    case GET_ALL_DOGS:
      const createdDogs = action.payload.filter((dog) => dog.created);
      const dogsPayload = [...action.payload];
      const dog = action.payload.splice(0, state.itemsPerPage);
      return {
        ...state,
        allDogs: [...dogsPayload],
        filteredDogs: [...dogsPayload],
        shownDogs: [...dog],
        createdDogs: [...createdDogs],
        dogsQty: action.payload.length,
      };

    case GET_ALL_TEMPS:
      const orderedTemps = action.payload.sort((a, b) => a.localeCompare(b));
      return {
        ...state,
        allTemps: [...orderedTemps],
      };

    case GET_DOG_BY_ID:
      return {
        ...state,
        detailDog: action.payload,
      };

    case GET_DOG_BY_NAME:
      let response;
      if (action.payload.msg) response = [];
      else response = action.payload;
      return {
        ...state,
        searchDogs: response,
      };

    case CLEAR_SEARCH:
      return {
        ...state,
        searchDogs: [],
      };

    case CREATE_DOG:
      const addDogCreated = [...state.createdDogs];
      const addDogAll = [...state.allDogs];
      addDogAll.push(action.payload);
      addDogCreated.push(action.payload);
      return {
        ...state,
        createdDogs: [...addDogCreated],
        allDogs: [...addDogAll],
        detailDog: {},
        filteredDogs: [...addDogAll],
      };

    case DELETE_DOG:
      const notDeletedCreated = state.createdDogs.filter(
        (dog) => dog.id !== action.payload
      );
      const notDeletedAll = state.allDogs.filter(
        (dog) => dog.id !== action.payload
      );
      const notDeletedFiltered = state.filteredDogs.filter(
        (dog) => dog.id !== action.payload
      );
      return {
        ...state,
        createdDogs: [...notDeletedCreated],
        allDogs: [...notDeletedAll],
        filteredDogs: [...notDeletedFiltered],
        shownDogs: [...notDeletedFiltered].splice(0, state.itemsPerPage),
        detailDog: {},
      };

    case FILTER_DOGS:
      const { filter, created } = action.payload;
      let updatedDogs;

      // Si created es false, mostrar creados y no creados
      if (!created) {
        // Si filter es "show all" o "rerender", mostrar todos
        if (filter === "Show all" || filter === "rerender") {
          updatedDogs = state.allDogs;
        }
        // Si filter es cualquier otra cosa, mostrar todos los que incluyan el filtro
        else {
          updatedDogs = [...state.allDogs].filter((dog) => {
            if (typeof dog.temperament === "string")
              return dog.temperament.includes(filter);
            return false;
          });
        }
      }
      // Si created no es false, mostrar creados
      else {
        // Si filter es "show all", mostrar todos los creados
        if (filter === "Show all") {
          updatedDogs = state.createdDogs;
        }
        // Si filter es "rerender" mostrar el filtro actual solo con los creados
        else if (filter === "rerender") {
          updatedDogs = state.filteredDogs.filter((dog) => dog.created);
        }
        // Si filter es cualquier otra cosa, mostrar los creados que incluyan el filtro
        else {
          updatedDogs = [...state.createdDogs].filter((dog) => {
            if (typeof dog.temperament === "string")
              return dog.temperament.includes(filter);
            return false;
          });
        }
      }

      return {
        ...state,
        filteredDogs: [...updatedDogs],
        shownDogs: [...updatedDogs].slice(0, state.itemsPerPage),
        currentPage: 1,
        dogsQty: updatedDogs.length,
        detailDog: {},
      };

    case ORDER_DOGS:
      const { payload } = action;
      let filtOrderedDogs;
      let allOrderedDogs;

      if (payload === "NAscendente") {
        filtOrderedDogs = state.filteredDogs.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        allOrderedDogs = state.allDogs.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else if (payload === "NDescendente") {
        filtOrderedDogs = state.filteredDogs.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        allOrderedDogs = state.allDogs.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      } else if (payload === "WAscendente") {
        filtOrderedDogs = state.filteredDogs.sort((a, b) => {
          if (isNaN(a.weight.slice(-2))) return -1;
          if (isNaN(b.weight.slice(-2))) return 1;
          if (Number(a.weight.slice(-2)) < Number(b.weight.slice(-2)))
            return -1;
          if (Number(a.weight.slice(-2)) > Number(b.weight.slice(-2))) return 1;
          if (Number(a.weight.slice(-2)) === Number(b.weight.slice(-2)))
            return 1;
          return false;
        });
        allOrderedDogs = state.allDogs.sort((a, b) => {
          if (isNaN(a.weight.slice(-2))) return -1;
          if (isNaN(b.weight.slice(-2))) return 1;
          if (Number(a.weight.slice(-2)) < Number(b.weight.slice(-2)))
            return -1;
          if (Number(a.weight.slice(-2)) > Number(b.weight.slice(-2))) return 1;
          if (Number(a.weight.slice(-2)) === Number(b.weight.slice(-2)))
            return 1;
          return false;
        });
      } else if (payload === "WDescendente") {
        filtOrderedDogs = state.filteredDogs.sort((a, b) => {
          if (isNaN(a.weight.slice(-2))) return -1;
          if (isNaN(b.weight.slice(-2))) return 1;
          if (Number(a.weight.slice(-2)) > Number(b.weight.slice(-2)))
            return -1;
          if (Number(a.weight.slice(-2)) < Number(b.weight.slice(-2))) return 1;
          if (Number(a.weight.slice(-2)) === Number(b.weight.slice(-2)))
            return 1;
          return false;
        });
        allOrderedDogs = state.allDogs.sort((a, b) => {
          if (isNaN(a.weight.slice(-2))) return -1;
          if (isNaN(b.weight.slice(-2))) return 1;
          if (Number(a.weight.slice(-2)) > Number(b.weight.slice(-2)))
            return -1;
          if (Number(a.weight.slice(-2)) < Number(b.weight.slice(-2))) return 1;
          if (Number(a.weight.slice(-2)) === Number(b.weight.slice(-2)))
            return 1;
          return false;
        });
      }

      return {
        ...state,
        filteredDogs: [...filtOrderedDogs],
        allDogs: [...allOrderedDogs],
        shownDogs: [...filtOrderedDogs].splice(0, state.itemsPerPage),
        currentPage: 1,
        detailDog: {},
      };

    case PAGINATION:
      let page;
      let dogs;

      // If next page
      if (action.payload === "next") {
        page = state.currentPage + 1;
        dogs = [...state.filteredDogs].splice(
          state.currentPage * state.itemsPerPage,
          state.itemsPerPage
        );
      }

      // If previous page
      if (action.payload === "prev") {
        page = state.currentPage - 1;
        dogs = [...state.filteredDogs].splice(
          (page - 1) * state.itemsPerPage,
          state.itemsPerPage
        );
      }

      // If start
      if (action.payload === "start") {
        page = 1;
        dogs = [...state.filteredDogs].splice(
          (page - 1) * state.itemsPerPage,
          state.itemsPerPage
        );
      }

      // If end
      if (action.payload === "end") {
        let futurePage = 1;
        while (futurePage * state.itemsPerPage < state.dogsQty) {
          futurePage++;
        }
        page = futurePage;
        dogs = [...state.filteredDogs].splice(
          (page - 1) * state.itemsPerPage,
          state.itemsPerPage
        );
      }

      return {
        ...state,
        currentPage: page,
        shownDogs: [...dogs],
        detailDog: {},
      };

    default:
      return state;
  }
}
