/**
 * Created by h205p2 on 12/15/16.
 */
function room(introId,description,rooms,optionId,oldNew,img,mp3){
    this.introId=introId;
    this.description=description;
    this.navigation=rooms;
    this.options=optionId;
    this.oldNew=oldNew;
    this.background=img;
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
    parallel:1000
};

var intros = [
    //intro(description,[functionId],buttonNames)
    new intro("'ow.' Your head hurts.",[1,1,0,0], ['damn, it does...', 'wait, what happened?','none','none']), //0
    new intro('that party must have gotten crazy!',[3,3,0,0],['what party?!', "yea... can't rember much...",'none','none']), //1
    new intro("lots of white light",[2,2,2,2], ["kk",'none','none','none'])

];

var rooms = [
    //room(introId,description,[lf,f,rf,rb,b,lb],optionId,oldNew,img,mp3)
    new room(0,'there is an opening against the wall',['n',1,'n','n','n','n'],0,false),
    new room(1,'you find yourself in a courtyard that has six rooms like yours surrounding it',[2,3,4,5,0,6],0,true)
];

var effects = [
    //effect([functionId],buttonNames,oneUse)
    new effect([0,0,0,0],['none','none','none','none'])
];

var functions = [
    function(){
        $('.options').hide();
        console.log('0 HAPPEND');
    },

    function(){
        effectHappens(1);
        reuse();
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
        console.log('2 HAPPEND')
    },

    function(){
        //give item
        player.inventory[player.inventory.length] = 'sword';
        effectHappens(3);
        console.log(player.inventory);
        console.log('3 HAPPEND');
        reuse();
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
        player.location = 7;
        introHappens();
        console.log('5happened');
        reuse();
        console.log(findEffect().oneUse)
    },

    function(roomnumber){
        player.location = roomnumber;
        functions[2]();
        console.log('6happened');
        reuse();
    },
    function(){
        effectHappens(7);
        console.log('7happened');
        reuse();
    }
];