/**
 * Created by h205p2 on 12/5/16.
 */

var findRoom = function(){
    return rooms[player.location];
};

var findIntro = function(){
    return intros[findRoom().introId];
};

var findEffect = function(){
    return effects[findRoom().options]
};

var inIntro = function(){
    return player.inIntro
};

var reuse = function(){
    if(findEffect().oneUse == 1) {
        findEffect().oneUse = 2
    }
};

var findParallel = function(){
    return player.parallel
};

$(document).ready(function(){
    
    $('.options').hide();
    introHappens();
        $('.options').click(function(){
            if (inIntro() == effect){
                runFunction(this.id,effect,findParallel());
            }else{
                if(inIntro()){
                    runFunction(this.id,true,'none');
                }else{
                    runFunction(this.id,false,'none');
                }
            }
        });

    $('#roomText').text(findIntro().description);

    $('#navigation').mouseover(function(){
        $('li').each(function(){
            if(findRoom().navigation[this.id] != 'n'){
                $(this).show();
            }
        });
    });

    $('#navigation').mouseout(function(){
        $('li').hide();
    });

    $('li').click(function(){
        $('.options').hide();
        player.location = findRoom().navigation[this.id];
        if(findRoom().oldNew){
            introHappens();
            findRoom().oldNew = false;
        }else{
            $('#roomText').text(findRoom().description);
//watch this fully: https://www.youtube.com/watch?v=52Gg9CqhbP8&index=16&list=RDwj9v7DNogp4
            document.getElementById("6").innerHTML = findEffect().button[0];
            document.getElementById("7").innerHTML = findEffect().button[1];
            document.getElementById("8").innerHTML = findEffect().button[2];
            document.getElementById("9").innerHTML = findEffect().button[3];
            if(findEffect().oneUse != 2){
                $('.options').each(function(){
                    if(document.getElementById(this.id).innerHTML != 'none'){
                        $(this).show();
                    }
                });
            }

        }
    });
});

var runFunction = function(witchButton,t,introNumber){
    if(t == effect){
        if( witchButton == 6){
            functions[intros[introNumber].functions[0]]()
        }
        if( witchButton == 7){
            functions[intros[introNumber].functions[1]]()
        }
        if( witchButton == 8){
            functions[intros[introNumber].functions[2]]()
        }
        if( witchButton == 9) {
            functions[intros[introNumber].functions[3]]()
        }
    }else{
        if(t){
            if( witchButton == 6){
                functions[findIntro().functions[0]]()
            }
            if( witchButton == 7){
                functions[findIntro().functions[1]]()
            }
            if( witchButton == 8){
                functions[findIntro().functions[2]]()
            }
            if( witchButton == 9) {
                functions[findIntro().functions[3]]()
            }
        }else{
            if( witchButton == 6){
                functions[findEffect().functions[0]]()
            }
            if( witchButton == 7){
                functions[findEffect().functions[1]]()
            }
            if( witchButton == 8){
                functions[findEffect().functions[2]]()
            }
            if( witchButton == 9) {
                functions[findEffect().functions[3]]()
            }
        }
    }
};

var introHappens = function(){
    player.inIntro = true;
    $('#roomText').text(findIntro().description);
    $('#navigation').hide();
    document.getElementById("6").innerHTML = findIntro().button[0];
    document.getElementById("7").innerHTML = findIntro().button[1];
    document.getElementById("8").innerHTML = findIntro().button[2];
    document.getElementById("9").innerHTML = findIntro().button[3];
    $('.options').each(function(){
        if(document.getElementById(this.id).innerHTML != 'none'){
            $(this).show();
        }
    });
};

var effectHappens = function(introNumber){
    player.parallel = introNumber;
    player.inIntro = effect;
    $('.options').hide();
    $('#roomText').text(intros[introNumber].description);
    $('#navigation').hide();
    document.getElementById("6").innerHTML = intros[introNumber].button[0];
    document.getElementById("7").innerHTML = intros[introNumber].button[1];
    document.getElementById("8").innerHTML = intros[introNumber].button[2];
    document.getElementById("9").innerHTML = intros[introNumber].button[3];
    $('.options').each(function(){
        if(document.getElementById(this.id).innerHTML != 'none'){
            $(this).show();
        }
    });
};