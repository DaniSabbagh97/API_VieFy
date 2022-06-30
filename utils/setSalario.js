module.exports = {
    setSalario: (int) => {
        return new Promise((resolve, reject) => {
            const calculo = (int).toString().split('').reduce((total, actual) => total + +actual, 0)
            const saldoAutonomo = calculo*200
            resolve(saldoAutonomo)
        })
    },
    setSalarioEmpresa: (int) => {
        return new Promise((resolve, reject) => {
            const calculo = (int).toString().split('').reduce((total, actual) => total + +actual, 0)
            const saldoEmpresa = calculo*2000
            resolve(saldoEmpresa)
        })
    },
}