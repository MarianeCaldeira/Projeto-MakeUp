import axios from 'axios';

const APIKEY = '40294c5437msh3d5bb69e4e6457bp148209jsn69f748a29350';
const MakeApi = axios.create({
  baseURL: 'https://makeup.p.rapidapi.com',
  headers: {
    'x-rapidapi-host': 'makeup.p.rapidapi.com',
    'x-rapidapi-key': APIKEY
  }
});

export default MakeApi;