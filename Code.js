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
var returnBarredDoor = function(){
    $('li').each(function() {
        if(document.getElementById(this.id).innerHTML == 'barred door') {
            if(this.id == 0) {
                document.getElementById(this.id).innerHTML = 'left forward';
            }
            if(this.id == 1) {
                document.getElementById(this.id).innerHTML = 'straight forward';
            }
            if(this.id == 2) {
                document.getElementById(this.id).innerHTML = 'right forward';
            }
            if(this.id == 3) {
                document.getElementById(this.id).innerHTML = 'right back';
            }
            if(this.id == 4) {
                document.getElementById(this.id).innerHTML = 'straight back';
            }
            if(this.id == 5) {
                document.getElementById(this.id).innerHTML = 'left back';
            }
        }
    });
};

var setEffects = function(){
    $('#roomText').text(findRoom().description);
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
};

var makeNewRoom = function(){
    returnBarredDoor();
    $('.options').hide();
    player.location = findRoom().navigation[this.id];
    var img = findRoom().img;
    document.body.style.background = "url(" + img + ") ";
    document.body.style.backgroundSize = 'cover';
    if(findRoom().oldNew){
        introHappens();
        findRoom().oldNew = false;
    }else{
        setEffects();
    }
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
            if(findRoom().navigation[this.id] == 'barred door'){
                document.getElementById(this.id).innerHTML = 'barred door'
            }
        });
    });

    $('#navigation').mouseout(function(){
        $('li').hide();
    });

    $('li').click(function(){
        $('li').hide();
        if(document.getElementById(this.id).innerHTML != 'barred door'){
            makeNewRoom();
        } else{
            $('#roomText').text('that is a '+ document.getElementById(this.id).innerHTML +', dude.');
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