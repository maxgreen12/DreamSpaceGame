/**
 * Created by h205p2 on 12/15/16.
 */
function room(introId,description,rooms,optionId,oldNew,img,mp3){
    this.introId=introId;
    this.description=description;
    this.navigation=rooms;
    this.options=optionId;
    this.oldNew=oldNew;
    this.img=img;
    this.music=mp3;
}

function intro(description,functionId,buttonNames){
    this.description=description;
    this.functions=functionId;
    this.button= buttonNames
}

function effect(functionId,buttonNames,oneUse){
    this.functions=functionId;
    this.button= buttonNames;
    this.oneUse= oneUse
}

function items(id,trueFalse,effectId){
    this.id=id;
    this.combat=trueFalse;
    this.effect=effectId;
}

var player={
    name:"",
    location:0,
    inventory:[],
    inIntro:false,
    parallel:1000,
    bff: '',
    findBff: function(){
        return player.bff
    }
};

var intros = [
    //intro(description,[functionId],buttonNames)
    new intro('"ow." Your head hurts.',[1,1,0,0], ['damn, it does...', 'wait, what happened?','none','none']), //0
    new intro('that party must have gotten crazy!',[3,3,0,0],['what party?!', "yea... can't remember much...",'none','none']), //1
    new intro('oh yea... somethings missing.',[5,5,0,0],['oh yea.','oh yea?','none','none'] ), //2
    new intro('to be set',[2,2,0,0],["geuss I should go find 'em ","ugh. This means responsibility doesn't it...",'none','none']), //3
    new intro("you step outside into a courtyard. The bright sun makes your head pound.",[8,8,8,8], ["where am I?",'what time is it?',"I'm hungry",'none']), //4
    new intro("you reach into your pocket and fish out your phone. It's missing a screen.",[2,2,0,0],['why do bad things happen to good people.','to be set','none','none']), //5
    new intro('blank',[2,2,2,2],['blank','none','none','none']),//6
    new intro('blank',[2,2,2,2],['blank','none','none','none']),//7
    new intro('blank',[2,2,2,2],['blank','none','none','none']),//8
    new intro('blank',[2,2,2,2],['blank','none','none','none']),//9
    new intro('blank',[2,2,2,2],['blank','none','none','none']), //10
    new intro('blank',[2,2,2,2],['blank','none','none','none']) //11, this is the intro to the room you started in

];

var rooms = [
    //room(introId,description,[lf,f,rf,rb,b,lb],optionId,oldNew,img,mp3)
    new room(0,'there is an opening against the wall',['barred door',1,'barred door','n','n','n'],1,false,'https://s-media-cache-ak0.pinimg.com/originals/86/1b/da/861bda7d76e58f26f657789cf79893d8.jpg'), //0
    new room(4,'you find yourself in a courtyard that has six rooms surrounding it, and a nice fountain in the middle',[2,3,4,5,0,6],1,true,'https://upload.wikimedia.org/wikipedia/en/3/3a/Freer_Courtyard.jpg'), //1
    new room(6,'egyptian temple',['n','n','n','barred door',1,'barred door'],0,true),
    new room(7,'exit',['n','n','n','barred door',1,'barred door'],0,true),
    new room(8,'jungle house',['n','n','n','barred door',1,'barred door'],0,true),
    new room(9,'arcade',['n','n','n','barred door',1,'barred door'],0,true),
    new room(10,'ice caves',['n','n','n','barred door',1,'barred door'],0,true)
];

var effects = [
    //effect([functionId],buttonNames,oneUse)
    new effect([0,0,0,0],['none','none','none','none'],0),
    new effect([6,0,0,0],['pull out your phone','go back to sleep','none','none'],0)
];

var functions = [
    function(){
        $('.options').hide();
        console.log('0 HAPPEND');
    },
    function(){
        effectHappens(1);
        console.log('1 HAPPEND');
    },
    function(){
        $('#roomText').text(findRoom().description);
        $('#navigation').show();
        $('.options').hide();
        player.inIntro = false;
        document.getElementById("6").innerHTML = findEffect().button[0];
        document.getElementById("7").innerHTML = findEffect().button[1];
        document.getElementById("8").innerHTML = findEffect().button[2];
        document.getElementById("9").innerHTML = findEffect().button[3];
        $('.options').each(function(){
            if(findEffect().oneUse != 2){
                $('.options').each(function(){
                    if(document.getElementById(this.id).innerHTML != 'none'){
                        $(this).show();
                    }
                });
            }
        });
        console.log('2 HAPPEND');
    },
    function(){
        effectHappens(2);
        console.log('3 HAPPEND');
    },
    function(itemInQuotes,introNumber){
        //check item
        if ( $.inArray(itemInQuotes,player.inventory) > -1){
            effectHappens(introNumber);
            reuse();
        }else{
            $('#roomText').text("you don't have a " + itemInQuotes);
        }
        console.log('4 happened');
    },
    function(){
        player.bff = prompt('Who did you forget at that party?');
        console.log(intros[3]);
        intros[3].description = 'damn! I need to find '+ player.bff + ". Dude, where did I leave them?";
        console.log(intros[3]);
        effectHappens(3);
        console.log(player.bff);
        console.log('5happened');
    },
    function(){
        intros[5].button[1] = 'I bet this was ' +player.bff+ "'s fault.";
        effects[1].button[0] = 'none';
        console.log('6happened');
        effectHappens(5);
    },
    function(){
        effectHappens(introNumber);
        console.log('7happened');
        reuse();
    },
    function(){
        rooms[0].introId = 11;
        rooms[0].oldNew = true;
        $('#roomText').text(findRoom().description);
        $('#navigation').show();
        $('.options').hide();
        player.inIntro = false;
        document.getElementById("6").innerHTML = findEffect().button[0];
        document.getElementById("7").innerHTML = findEffect().button[1];
        document.getElementById("8").innerHTML = findEffect().button[2];
        document.getElementById("9").innerHTML = findEffect().button[3];
        $('.options').each(function(){
            if(findEffect().oneUse != 2){
                $('.options').each(function(){
                    if(document.getElementById(this.id).innerHTML != 'none'){
                        $(this).show();
                    }
                });
            }
        });
        console.log('8 HAPPEND')
    }
];
// function(itemNameInQuotes,introNumber){
//GIVE ITEM
//player.inventory[player.inventory.length] = itemNameInQuotes;
//effectHappens(introNumber);
//console.log('3 HAPPEND');
//reuse();
//}