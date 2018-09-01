import React from 'react';
import axios from 'axios';
import Qs from 'qs';

const apiUrlForLocation = 'https://api.petfinder.com/pet.find';
const apiUrlForRandom = 'https://api.petfinder.com/pet.getRandom';
const apiKey = '03e269d9ab2bafaf6f5ace0f1ee278f1';

export const getPetDataByLocation = (location) => {
  return axios({
    url: 'https://proxy.hackeryou.com',
    method: 'GET',
    dataResponse: 'json',
    paramsSerializer: function (params) {
      return Qs.stringify(params, {
        arrayFormat: 'brackets'
      })
    },
    params: {
      reqUrl: apiUrlForLocation,
      params: {
        key: apiKey,
        format: 'json',
        output: 'full',
        location: location,
        animal: 'dog',
        count: 10,
      },
      proxyHeaders: {
        'header_params': 'value'
      },
      xmlToJSON: false
    }
  })
}

export const getRandomPetData = () => {
  return axios({
    url: 'https://proxy.hackeryou.com',
    method: 'GET',
    dataResponse: 'json',
    paramsSerializer: function (params) {
      return Qs.stringify(params, {
        arrayFormat: 'brackets'
      })
    },
    params: {
      reqUrl: apiUrlForRandom,
      params: {
        key: apiKey,
        format: 'json',
        output: 'full',
        animal: 'dog',
      },
      proxyHeaders: {
        'header_params': 'value'
      },
      xmlToJSON: false
    }
  })
}