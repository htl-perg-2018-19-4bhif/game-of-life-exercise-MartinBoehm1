
window.onload = () => {
  const boardSize = 800;
  // Get reference to canvas
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  canvas.width = canvas.height = boardSize;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  const gameFieldLength = boardSize/10;

  let gameField: number[][]=[[], []];
  for(let i=0;i<gameFieldLength;i++){
    gameField[i]=[];
    for(let k=0;k<gameFieldLength;k++){
      gameField[i][k]=Math.floor(Math.random() * (2));
    }
  }

  // Call 'draw' function whenever browser renders a frame on the screen
  
  window.requestAnimationFrame(draw);
  function draw() {
    ctx.clearRect(0, 0, boardSize, boardSize);
    for(let i=0;i<gameField.length;i++){
      for(let k=0;k<gameField[i].length;k++){
        if(gameField[i][k]==0){
        
          ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        }else{
          ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        }
        ctx.fillRect(i*10, k*10, 10, 10);
      }
    }
    remakeField();
    window.requestAnimationFrame(draw);
  }
  function remakeField(){
    let newField: number[][]=[[], []];
  for(let i=0;i<gameFieldLength;i++){
    newField[i]=[];
    for(let k=0;k<gameFieldLength;k++){
      newField[i][k]=0;
    }
  }
    for(let i=0;i<gameFieldLength;i++){
      for(let k=0;k<gameFieldLength;k++){
        if(lives(i,k)){
          newField[i][k]=1;
        }else{
          newField[i][k]=0;
        }
      }
    }
    gameField=newField;
  }
  function lives(i:number,k:number){
    if(gameField[i][k]==0){
      if(neighbours(i,k)===2){
        return true;
      }
    }else{
      let j:number=neighbours(i,k);
      if(j===2||j===3){
        return true;
      }
    }return false;
  }
  function neighbours(i:number,k:number):number{
    let nrNeighbours=0;
    if(i>0&&k>0){
      if(gameField[i-1][k-1]===1){
        nrNeighbours++;
      }
    }
    if(i>0){
      if(gameField[i-1][k]===1){
        nrNeighbours++;
      }
    }
    if(k>0){
      if(gameField[i][k-1]===1){
        nrNeighbours++;
      }
    }
    if(i>0&&k<(boardSize/10)-1){
      if(gameField[i-1][k+1]===1){
        nrNeighbours++;
      }
    }
    if(k<(boardSize/10)-1){
      if(gameField[i][k+1]===1){
        nrNeighbours++;
      }
    }
      if(gameField[i][k]===1){
        nrNeighbours++;
      }
      if(i<(boardSize/10)-1&&k<(boardSize/10)-1){
        if(gameField[i+1][k+1]===1){
          nrNeighbours++;
        }
      }
      if(i<(boardSize/10)-1){
        if(gameField[i+1][k]===1){
          nrNeighbours++;
        }
      }
      if(i<(boardSize/10)-1&&k>0){
        if(gameField[i+1][k-1]===1){
          nrNeighbours++;
        }
      }
    return nrNeighbours;
  }
};