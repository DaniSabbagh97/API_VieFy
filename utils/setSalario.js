module.exports = (int) => {
    return new Promise((resolve, reject) => {

        const calculo = (int).toString().split('').reduce((total, actual) => total + +actual, 0)

        const saldoAutonomo = calculo*200
        //const saldoEmpresa = calculo*2000
        resolve(saldoAutonomo)
    })
}


