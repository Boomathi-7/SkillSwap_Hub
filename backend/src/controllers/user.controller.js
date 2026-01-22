export const me = (req, res) => {
  const { password, ...safeUser } = req.user;
  res.json(safeUser);
};
