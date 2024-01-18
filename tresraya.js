let casillas=[]
let simbolos=["&#11093;","&#10060;"]
let turno=0
let conta=0

function crearCasillas(){
    for(let i=0; i<9;i++){
        let casilla={
            simbolo: "nada",
            muestraSimbolo: false
        }
        casillas.push(casilla)
    }

    for(let i=0; i<3;i++){
        for(let j=0;j<3;j++){
            let casillaact=document.getElementById(i+";"+j)
            casillaact.disabled=false
        }
    }
}

function devolverCasilla(row,col) {
    const pos = row*3+col
    return casillas[pos]
}

function actualizarTablero(){
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            const but=document.getElementById(i+";"+j)
            const casilla=devolverCasilla(i,j)
            if(casilla.muestraSimbolo){
                but.innerHTML=casilla.simbolo
            }
        }
    }
}

function verificarGanar(row,col){
    let vertical=true
    let horizontal=true
    let diagonal1=true
    let diagonal2=true
    for(let i=0;i<3;i++){
        if(devolverCasilla(row,i).simbolo!=simbolos[turno]){
            horizontal=false
        }
        if(devolverCasilla(i,col).simbolo!=simbolos[turno]){
            vertical=false
        }
        if(devolverCasilla(i,i).simbolo!=simbolos[turno]){
            diagonal1=false
        }
        if(devolverCasilla(i,2-i).simbolo!=simbolos[turno]){
            diagonal2=false
        }
    }

    if(vertical||horizontal||diagonal1||diagonal2){
        return true
    }
    return false
}

function ganar(flag){
    for(let i=0; i<3;i++){
        for(let j=0;j<3;j++){
            let casillaact=document.getElementById(i+";"+j)
            casillaact.disabled=true
        }
    }
    if(flag==1){
        document.getElementById("titulo1").innerHTML="El jugador "+(turno+1)+" ganó"
    }else{
        document.getElementById("titulo1").innerHTML="Empate"
    }
}

function casillaOnClick(row,col){
    let casilla=devolverCasilla(row,col)
    if(casilla.muestraSimbolo==false){
        conta++;
        casilla.muestraSimbolo=true
        if(turno==0){
            casilla.simbolo=simbolos[turno]
            actualizarTablero()
            if(verificarGanar(row,col)){
                ganar(1)
            }
            turno=1
        }else{
            casilla.simbolo=simbolos[turno]
            actualizarTablero()
            if(verificarGanar(row,col)){
                ganar(1)
            }
            turno=0
        }
        if(conta==9){
            ganar(0)
        }
    }
}

function main(){
    crearCasillas()
    console.log(casillas)
}

main()