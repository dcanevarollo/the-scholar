function secureRender(req, res) {
  if (
    (req.method === 'PUT' || req.method === 'PATCH') &&
    req.url.search('users') >= 0
  ) {
    delete res.locals.data.password;
  }

  res.jsonp(res.locals.data);
}

module.exports = secureRender;
