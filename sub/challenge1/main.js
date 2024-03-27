var menu = '#';

function ChangePage(gen, pagenum){
    localStorage.setItem("gen", gen);
    localStorage.setItem("pagenum", pagenum);
    location.href = "sidepage.html";
}

function SidePage(){
    var genp = localStorage.getItem("gen");
    var pagenump = localStorage.getItem("pagenum");
    var m_bg = 'rgb(' + 116 + ',' + 90 + ',' + 100 + ')'; 
    var m_ct = 'rgb(' + 252 + ',' + 231 + ',' + 241 + ')'; 
    var f_bg ='rgb(' + 28 + ',' + 79 + ',' + 112 + ')';
    var f_ct = 'rgb(' + 0 + ',' + 131 + ',' + 179 + ')';

    var copyto = document.getElementById('sidetext');
    var textfile = '#';

    switch(genp){
        case 'm':
            //Background Elements
            document.getElementById('content-m').style.backgroundColor = m_bg;
            
            //Content Block
            document.getElementById('lonely').style.backgroundColor = m_ct;

            //Text Elements
            copyto.style.fontFamily = "BN Machine";
            copyto.style.fontSize = 32 + 'px';
            menu = 'side_m.html';

            switch(pagenump){
                case '1':
                    textfile = '../txt/textm1.txt';
                    break;
                case '2':
                    textfile = '../txt/textm2.txt';
                    break;
                case '3':
                    textfile = '../txt/textm3.txt';
                    break;
                case '4':
                    textfile = '../txt/textm4.txt';
                    break;
            }
            break;
        case 'f':
            //Background Elements      
            document.getElementById('content-m').style.backgroundColor = f_bg;

            //Content Block
            document.getElementById('lonely').style.backgroundColor = f_ct;

            //Text Elements
            copyto.style.fontFamily = "BolsterBold";
            copyto.style.fontSize = 32 + 'px';
            menu = 'side_f.html';
            switch(pagenump){
                case '1':
                    textfile = '../txt/textf1.txt';
                    break;
                case '2':
                    textfile = '../txt/textf2.txt';
                    break;
                case '3':
                    textfile = '../txt/textf3.txt';
                    break;
                case '4':
                    textfile = '../txt/textf4.txt';
                    break;
            }
            break;
    }

    var client = new XMLHttpRequest();
    client.open('GET', textfile);
    client.onreadystatechange = function(){
        copyto.innerHTML = client.responseText;
    }
    client.send();
}

function BackToMenu(){   
    location.href = menu;
}