
let gridElem = document.querySelector('.grid');
let vals = [[0,0,0],[0,0,0],[0,0,0]];

console.log(vals);
vals[0][0]= 1 ; 
console.log(vals);


let ch = 'X', r= false;

vals.forEach((v,i)=>{
    let row = `<div class="r" id="r${i}"></div>`;
    gridElem.innerHTML += row;
    rowElem = document.querySelector(`#r${i}`);
    let s1 = `border-top: ${Math.ceil(i/2)*2}px dashed rgba(255, 255, 255, 0.892);`;
    rowElem.style = s1;

    v.forEach((_,ind)=>{
        let box = `<div class="b" id="b${i*3 +ind}"></div>`;
        // let s1 = `border-left: ${i*2}px dashed rgba(255, 255, 255, 0.892);`;
        rowElem.innerHTML += box;
        boxElem = document.querySelector(`#b${i*3 +ind}`);
        let s2 = `border-left: ${Math.ceil(ind/2)*2}px dashed rgba(255, 255, 255, 0.892);`;
        boxElem.style = s2;
    })   
})

function check(indd){
    let solved = false, i = Math.floor(indd/3), j = indd%3;
    solved = vals[0][j]===vals[1][j] && vals[2][j]===vals[1][j];
    solved = solved || (vals[i][0]===vals[i][1]&& vals[i][1]===vals[i][2]);
    if(i===j){
        solved = solved || (vals[0][0]===vals[1][1]&& vals[1][1]===vals[2][2]);
    }
    if(i+j===2){
        solved = solved || (vals[0][2]===vals[1][1]&& vals[1][1]===vals[2][0]);
    }
    return solved;
}

function reset(cha){
    let bann = document.querySelector('.banner');
    bann.innerHTML= `Player ${cha} won!!
    Click anywhere to continue.`;
    
    r = true;
    // let p =0;
    // document.addEventListener("click",handleReset(p));
}

document.addEventListener("click", (e)=>{
    let elem = e.target;
    console.log(elem.id);

    //use vals instead of setting per element
    if(r){
        let bann = document.querySelector('.banner');

        document.querySelectorAll('.b').innerHTML = '';
        for(let i=0; i<3; i++){
            for(let j=0;j<3; j++){
                vals[i][j]=0;  
                document.querySelector(`#b${i*3+j}`).innerHTML = '';         
            }
        }
        bann.innerHTML = `Player ${ch}'s turn!`;
        r = false;
    } else if(elem.className==='b'  && !elem.innerHTML){
        elem.innerHTML = ch;
        // console.log(elem.id); 
        let ind = Number(elem.id.slice(1));
        // console.log(ind);
        vals[Math.floor(ind/3)][ind%3] = ch;
        
        console.log(check(ind));

        let bann = document.querySelector('.banner');
        if(check(ind))reset(ch);
        else {
            
            if(ch==='X'){
                ch= "O";
            } else {
                ch="X";
            }
            bann.innerHTML = `Player ${ch}'s turn!`;

            let filled = true;
            for(let ii=0; ii<3;ii++){
                for(let jj=0; jj<3; jj++){
                    if(vals[ii][jj]==0){
                        filled = false;
                    }
                }
            }
            if(filled){
                bann.innerHTML = 'Nobody won!!';
                r = true;
            }
        }        
        
        console.log(vals);
    }
})

