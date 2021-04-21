// 5 * 5 2차원배열 선언
var alphabetBoard = new Array(5);
for (var i = 0; i < alphabetBoard.length; i++){
    alphabetBoard[i] = new Array(5);
}

// 홀수일 때 x추가 여부를 확인하기 위한 변수
var oddFlag = false;
var decdec = "";

function main(){
    var zCheck = "";
    var decryption;
    var encryption;           
    var blankCheck = "";

    var key = document.getElementById('key').value; //입력받은 key값 가져옴
    var str = document.getElementById('str').value; //입력받은 str값 가져옴

    document.write('<center>');
    document.write("암호화 할 key : ", key);
    document.write('<br>');
    document.write("암호화 할 문자열 : ", str);
    document.write('</center>');

    //암호판 생성
    setBoard(key);

    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) == ' ') //공백제거
        {
            str = str.substring(0, i) + str.substring(i + 1, str.length); // 공백제거 후 다시 문장 이어붙임
            blankCheck += 10;   // 공백처리 후 10 증가
        }
        else {
            blankCheck += 0; // 공백이 없을 시 증가 x
        }
        if (str.charAt(i) == 'z') //z를 q로 바꿔줘서 처리함.
        {
            str = str.substring(0, i) + 'q' + str.substring(i + 1, str.length); 
            zCheck += 1;
        }
        else {
            zCheck += 0;
        }
    }

    // 암호화 함수
    encryption = strEncryption(str);

    //출력부분  
    document.write('<center>');
    document.write("<br>암호화된 문자열 : " + encryption);

    for (var i = 0; i < encryption.length; i++) {
        if (encryption.charAt(i) == ' ') //공백제거
            encryption = encryption.substring(0, i) + encryption.substring(i + 1, encryption.length);
    }

    // 복호화 함수
    decryption = strDecryption(key, encryption, zCheck);

    for (var i = 0; i < decryption.length; i++) {
        if (blankCheck.charAt(i) == '1') {
            //공백이 존재했다면 다시 추가함
            decryption = decryption.substring(0, i) + " " + decryption.substring(i, decryption.length);
        }
    }
    
    //출력문
    document.write("<br>복호화된 문자열 : " + decryption);
    document.write('</center>');

}
    
function strDecryption(key, encryption, zCheck) {   //복호화 함수
    var playFair = new Array(); //바꾸기 전 쌍자암호를 저장할 곳
    var decPlayFair = new Array(); //바꾼 후의 쌍자암호 저장할 곳
    var x1 = 0 , x2 = 0 , y1 = 0, y2 = 0; //쌍자 암호 두 글자의 각각의 행,열 값
    var decStr ="";
    
    for( var i = 0 ; i < encryption.length ; i+=2 ) 
    {
        var tmpArr = new Array(2);
        tmpArr[0] = encryption.charAt(i);
        tmpArr[1] = encryption.charAt(i+1);
        playFair.push(tmpArr); //암호문 넣어줌
    }

    for(var i = 0 ; i < playFair.length ; i++ ) //암호화와 반대로 해줌
    {
        var tmpArr = new Array(2);
        for( var j = 0 ; j < alphabetBoard.length ; j++ )
        {
            for( var k = 0 ; k < alphabetBoard[j].length ; k++ )
            {
                if(alphabetBoard[j][k] == playFair[i][0]) //암호화 첫번째 값과 alphabetBoard의 값이 같으면
                {
                    x1 = j; 
                    y1 = k; 
                }
                if(alphabetBoard[j][k] == playFair[i][1]) //암호화 두번째 값과 alphabetBoard의 값이 같으면
                {
                    x2 = j; 
                    y2 = k; 
                }
            }
        }
        
        if(x1==x2)//행이 같은 경우 각각 바로 아래열 대입
        {
            tmpArr[0] = alphabetBoard[x1][(y1+4)%5];
            tmpArr[1] = alphabetBoard[x2][(y2+4)%5];
        }
        else if(y1==y2) //열이 같은 경우 각각 바로 옆 열 대입
        {
            tmpArr[0] = alphabetBoard[(x1+4)%5][y1];
            tmpArr[1] = alphabetBoard[(x2+4)%5][y2];
        }
        else//행, 열 다른경우 각자 대각선에 있는 곳.
        {
            tmpArr[0] = alphabetBoard[x2][y1];
            tmpArr[1] = alphabetBoard[x1][y2];
        }
   
        decPlayFair.push(tmpArr);
    }
   
    for(var i = 0 ; i < decPlayFair.length ; i++) //중복 문자열 돌려놓음
    {
        if(i!=decPlayFair.length-1 && decPlayFair[i][1]=='x'  //만약 x가 있다면  
                && decPlayFair[i][0]==decPlayFair[i][0])
        {	
            decStr += decPlayFair[i][0];    //x데거 후 추가
        }
        else
        {
            // 아닐 시 원상복구
            decStr += decPlayFair[i][0] + "" + decPlayFair[i][1];   
        }
    }
    
    for(var i = 0 ; i < zCheck.length ; i++ )
    {
        if( zCheck.charAt(i) == '1' ) //z가 존재하면 
           //다시 추가해서 돌려줌
            decStr = decStr.substring(0,i)+'z'+decStr.substring(i+1,decStr.length); 
    }
    
    if(oddFlag) decStr = decStr.substring(0,decStr.length-1);   

    return decStr;
}

function strEncryption(sentence) {  //암호화 함수
    sentence = sentence.toLowerCase();  
    var playFair = []; // 바꾸기 전 암호 저장할 곳
    var encPlayFair = []; // 바꾼 후 암호 저장할 곳
    var x1 = 0, x2 = 0, y1 = 0, y2 = 0;
    var encStr = ""; 

    for(var i=0; i<sentence.length; i+=2) { //문자를 2개씩 묶기위해 2씩 증가
        var tmpArr = new Array(2);
        tmpArr[0] = sentence.charAt(i);
        if(sentence.charAt(i) == sentence.charAt(i+1)) { //첫 문자와 두번째 문자가 같으면 
            tmpArr[1] = 'x'; // 두번째 문자를 x로 변경
            i--; // i를 1 감소하면서 다음 문자를 다시 비교함
        }else{
            tmpArr[1] = sentence.charAt(i+1);  // 같지 않으면 그대로
        }

        if(i == sentence.length-1) {  // i길이가 홀수이면
            tmpArr[1] = 'x';   //x로 설정
            oddFlag = true; 
        }

        playFair.push(tmpArr);
        
    }
    document.write('<center>');
    for(var i=0; i<playFair.length; i++) {
        document.write(playFair[i][0] + ""+ playFair[i][1] + " ");
    }
    document.write('</center>');

    for(var i=0; i<playFair.length; i++) {
        var tmpArr2 = new Array(2);
        for(var j=0; j<alphabetBoard.length; j++) { 
            for(var k=0; k<alphabetBoard[j].length; k++) {  
                if(alphabetBoard[j][k] === playFair[i][0]) {    
                    x1 = j; 
                    y1 = k; 
                }
                if(alphabetBoard[j][k] === playFair[i][1]) {   
                    x2 = j; 
                    y2 = k; 
                }
            }
        }

        if(x1 === x2) { 
            tmpArr2[0] = alphabetBoard[x1][(y1+1)%5];   
            tmpArr2[1] = alphabetBoard[x2][(y2+1)%5];   
        }else if(y1 === y2) {   
            tmpArr2[0] = alphabetBoard[(x1+1)%5][y1];  
            tmpArr2[1] = alphabetBoard[(x2+1)%5][y2];  
        }else { 
            tmpArr2[0] = alphabetBoard[x2][y1];
            tmpArr2[1] = alphabetBoard[x1][y2];
        }
        encPlayFair.push(tmpArr2);
    }

    for(var i=0; i<encPlayFair.length; i++) {   
        encStr += encPlayFair[i][0] + "" + encPlayFair[i][1] + " ";
    }

    return encStr;
}

function setBoard(key) {
    var keyForSet = "";					// 중복된 문자가 제거된 문자열을 저장할 문자열.
    var duplicationFlag = false;		// 문자 중복을 체크하기 위한 flag 변수.
    var keyLengthCount = 0;					// alphabetBoard에 keyForSet을 넣기 위한 count변수.

    key += "abcdefghijklmnopqrstuvwxyz"; 	// 키에 모든 알파벳을 추가.

    // 중복처리
    for (var i = 0; i < key.length; i++) {
        for (var j = 0; j < keyForSet.length; j++) {
            if (key.charAt(i) == keyForSet.charAt(j)) {
                duplicationFlag = true;
                break;
            }
        }
        if (!(duplicationFlag)) keyForSet += key.charAt(i);
        duplicationFlag = false;
    }

    //배열에 대입
    for (var i = 0; i < alphabetBoard.length; i++) {
        for (var j = 0; j < alphabetBoard[i].length; j++) {
            alphabetBoard[i][j] = keyForSet.charAt(keyLengthCount++);
        }
    }

    //배열에 대입
    // table 생성
    document.write('<center>');
    document.write('<table border="2" width = "300"; height = "300px"');
    document.write('<tbody>');
    // for문으로 배열을 한칸마다 하나씩 삽입
    for (var i = 0; i < alphabetBoard.length; i++) {
        for (var j = 0; j < alphabetBoard[i].length; j++) {
            document.write('<td>' + '&nbsp&nbsp&nbsp&nbsp' + alphabetBoard[i][j] + '</td>');
        }
        document.write("<br>");
        document.write('</tr>');
    }
    document.write('</tbody>');
    document.write('</table>');
    document.write('<br>')
    document.write('</center>');
}