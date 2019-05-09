exports.pay = function(req, res) {
  const statuses = ['declined', 'confirmed']
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
  res.json({ status: randomStatus })
};
