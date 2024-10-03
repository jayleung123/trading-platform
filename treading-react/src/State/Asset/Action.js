import * as types from "./ActionTypes";
import api from "@/config/api";

export const getAssetById = ({jwt, assetId}) => async(dispatch) => {
    dispatch({type: types.GET_ASSET_REQUEST});

    try{
        const response = await api.get(`/api/asset/${assetId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        
        dispatch({
            type: types.GET_ASSET_SUCCESS,
            payload: response.data,
        });
        console.log("get asset by id ", response.data);
    }
    catch(error) {
        console.log(error);
        dispatch({
            type: types.GET_ASSET_FAILURE,
            error: error.message,
        });
    }
};

export const getAssetDetails = ({jwt, coinId}) => async(dispatch) => {
    dispatch({type: types.GET_ASSET_DETAILS_REQUEST});

    try{
        const response = await api.get(`/api/asset/coin/${coinId}/user`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        
        dispatch({
            type: types.GET_ASSET_DETAILS_SUCCESS,
            payload: response.data,
        });
        console.log("Asset details ", response.data);
    }
    catch(error) {
        console.log(error);
        dispatch({
            type: types.GET_ASSET_DETAILS_FAILURE,
            error: error.message,
        });
    }
};

export const getUserAssets = (jwt) => async(dispatch) => {
    dispatch({type: types.GET_USER_ASSETS_REQUEST});

    try{
        const response = await api.get(`/api/asset`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        
        dispatch({
            type: types.GET_USER_ASSETS_SUCCESS,
            payload: response.data,
        });
        console.log("get user Asset ", response.data);
    }
    catch(error) {
        console.log(error);
        dispatch({
            type: types.GET_USER_ASSETS_FAILURE,
            error: error.message,
        });
    }
};
