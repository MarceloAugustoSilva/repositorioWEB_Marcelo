// Middleware de autorização por perfil (role)
// Uso: router.delete('/:id', auth, autorizar('admin'), controller.remover)
function autorizar(...rolesPermitidas) {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ erro: 'Não autenticado' });
    }
    if (!rolesPermitidas.includes(req.usuario.role)) {
      return res.status(403).json({
        erro: 'Acesso negado: você não tem permissão para esta ação',
        roleNecessaria: rolesPermitidas,
        suaRole: req.usuario.role
      });
    }
    next();
  };
}

module.exports = autorizar;
