import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';

//pages

import store from './store/MainStore'

const url = 'http://xn--80adaa4bwteehh3b.xn--p1ai/wp-admin/admin-ajax.php'
let prods = null

$.ajax({
  type: 'GET',
  url: url,
  data: {
    action: 'get_cats'
  },
  success: (data) => {
    store.products = JSON.parse(data)
    ReactDOM.render(<App store={store} />, document.querySelector("#app"));
  }
})


