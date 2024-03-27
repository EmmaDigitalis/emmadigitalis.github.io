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
    var f_ct = 'rgb(' + 58 + ',' + 181 + ',' + 226 + ')';


    var copyto = document.getElementById('sidetext');
    var textfile = '#';

    switch(genp){
        case 'm':
            //Background Elements
            document.getElementById('content-m').style.backgroundColor = m_bg;
            
            //Content Block
            document.getElementById('lonely').style.backgroundColor = m_ct;

            //Text Elements
            copyto.style.fontFamily = "MyBNMachine";
            copyto.style.fontSize = 32 + 'px';
            document.getElementById('fml-text').style.fontFamily = 'MyBNMachine';
            menu = 'side_m.html';

            switch(pagenump){
                case '1':
                    textfile = 'txt/textm1.txt';
                    document.getElementById('fml-img').src = 'img/vectors/w/m-gaming.svg';
                    document.getElementById('fml-text').innerHTML = 'Gaming';
                    document.getElementById('sideimg').src = 'img/games.jpg';
                    break;
                case '2':
                    textfile = 'txt/textm2.txt';
                    document.getElementById('fml-img').src = 'img/vectors/w/m-programming.svg';
                    document.getElementById('fml-text').innerHTML = 'Programming';
                    document.getElementById('sideimg').src = 'img/programming.jpg';
                    break;
                case '3':
                    textfile = 'txt/textm3.txt';
                    document.getElementById('fml-img').src = 'img/vectors/w/m-crafts.svg';
                    document.getElementById('fml-text').innerHTML = 'Crafting';
                    document.getElementById('sideimg').src = 'img/larp-crafting.jpg';
                    break;
                case '4':
                    textfile = 'txt/textm4.txt';
                    document.getElementById('fml-img').src = 'img/vectors/w/fm-rant.svg';
                    copyto.style.fontSize = 18 + 'px';
                    document.getElementById('fml-text').innerHTML = 'Rant - M';
                    document.getElementById('sideimg').src = 'img/girl-game.jpg';
                    break;
            }
            break;
        case 'f':
            //Background Elements      
            document.getElementById('content-m').style.backgroundColor = f_bg;

            //Content Block
            document.getElementById('lonely').style.backgroundColor = f_ct;

            //Text Elements
            copyto.style.fontFamily = "MyBolsterBold";
            copyto.style.fontSize = 32 + 'px';
            document.getElementById('fml-text').style.fontFamily = 'MyBolsterbold';
            menu = 'side_f.html';

            switch(pagenump){
                case '1':
                    textfile = 'txt/textf1.txt';
                    document.getElementById('fml-img').src = 'img/vectors/w/f-clothing.svg';
                    document.getElementById('fml-text').innerHTML = 'Fashion';
                    document.getElementById('sideimg').src = 'img/clothing.jpg';
                    break;
                case '2':
                    textfile = 'txt/textf2.txt';
                    document.getElementById('fml-img').src = 'img/vectors/w/f-makeup.svg';
                    document.getElementById('fml-text').innerHTML = 'Makeup';
                    copyto.style.fontSize = 28 + 'px';
                    document.getElementById('sideimg').src = 'img/makeup.jpg';
                    break;
                case '3':
                    textfile = 'txt/textf3.txt';
                    document.getElementById('fml-img').src = 'img/vectors/w/f-crafts.svg';
                    document.getElementById('fml-text').innerHTML = 'Crafting';
                    document.getElementById('sideimg').src = 'img/deemo-sewing.jpg';
                    break;
                case '4':
                    textfile = 'txt/textf4.txt';
                    document.getElementById('fml-img').src = 'img/vectors/w/fm-rant.svg'
                    document.getElementById('fml-text').innerHTML = 'Rant - F';
                    copyto.style.fontSize = 18 + 'px';
                    document.getElementById('sideimg').src = 'img/guy-dress.jpg';
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