const { setSalario } = require('./setSalario')
module.exports = (t, exp) => {
    return new Promise( async (resolve, reject) => {
       const s = await setSalario(exp)


       const fi = ((1/t.ImpB2*s*t.ImpB8)+(1/t.ImpB3*t.ImpB9)+(1/t.ImpB4*t.ImpB10)+(1/t.ImpB5*t.ImpB11))
        
       console.log(fi)
       resolve(fi)
    })
}



/**
 * felicidadInicial = (1.0/b2*salario*200*b8)+(1.0/b3*b9)+(1.0/b4*b10)+(1.0/b5*b11);
 * 
 * felicidadFinal = (1.0/b2*salario*200*c2)+(1.0/b3*c3)+(1.0/b4*c4)+(1.0/b5*c5);
 */