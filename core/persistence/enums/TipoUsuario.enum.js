module.exports = {
    get ADMINISTRADOR() { return "Administrador"; },
    get AUXILIAR() { return "Auxiliar"; },
    get CONSULTOR() { return "Consultor"; },
    getAll() {
        return [this.ADMINISTRADOR, this.AUXILIAR, this.CONSULTOR];
    }
}