const { setSalario } = require('./setSalario')
module.exports = (t, exp) => {
    return new Promise( async (resolve, reject) => {
       const s = await setSalario(exp)
       
       const ff = ((1/t.ImpB2*s*t.FutC2)+(1/t.ImpB3*t.FutC3)+(1/t.ImpB4*t.FutC4)+(1/t.ImpB5*t.FutC5))
        
       console.log(ff)
       resolve(ff)
    })
}