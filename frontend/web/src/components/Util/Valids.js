

export const validCellphone = (cellphone) => {
    let temp = cellphone.replace(/[^\d]+/g, '')

    if(temp.length < 11){
        console.log('CELL: ', temp)

        return false
    } 

    return true
}



export const validCpf = (cpf) => {
    let temp = cpf.replace(/[^\d]+/g,'')	
    if(temp === '') return false

    // Elimina CPFs invalidos conhecidos	
    if (temp.length !== 11 || 
        temp === "00000000000" || 
        temp === "11111111111" || 
        temp === "22222222222" || 
        temp === "33333333333" || 
        temp === "44444444444" || 
        temp === "55555555555" || 
        temp === "66666666666" || 
        temp === "77777777777" || 
        temp === "88888888888" || 
        temp === "99999999999")
            return false;	

    // Valida 1o digito	
    let add
    let rev

    add = 0;	
    for (let i=0; i < 9; i ++)		
        add += parseInt(temp.charAt(i)) * (10 - i);	
        rev = 11 - (add % 11);	
        if (rev === 10 || rev === 11)		
            rev = 0;	
        if (rev !== parseInt(temp.charAt(9)))		
            return false;

    // Valida 2o digito	
    add = 0;	
    for (let i = 0; i < 10; i ++)		
        add += parseInt(temp.charAt(i)) * (11 - i);	
    rev = 11 - (add % 11);	
    if (rev === 10 || rev === 11)	
        rev = 0;	
    if (rev !== parseInt(temp.charAt(10)))
        return false;		
    return true;   
}