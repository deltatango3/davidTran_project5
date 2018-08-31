import React from 'react';
import axios from 'axios';
import Qs from 'qs';

const apiUrlForRandom = 'https://api.petfinder.com/pet.getRandom';
const apiKey = '03e269d9ab2bafaf6f5ace0f1ee278f1';

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