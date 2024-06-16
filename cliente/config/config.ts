import { environment } from 'src/environments/environment';
import json from '../package.json';

export default {
  URL_BASE: environment.url,
  URL_BASE_PATH: environment.baseUrl,
  URL_API_BASE: environment.urlApi,
  VERSION: json.version,
};
