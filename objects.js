/**
 * Created by h205p2 on 12/15/16.
 */
function room(introId,description,rooms,optionId,oldNew,mirrorRoom,img,mp3){
    this.introId=introId;
    this.description=description;
    this.navigation=rooms;
    this.options=optionId;
    this.oldNew=oldNew;
    this.mirrorRoom=mirrorRoom;
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
    hasSoul: true,
    mirrorLocation:0,
    dreamLocation: 7,
    inDream: false
};

var intros = [
    //intro(description,[functionId],buttonNames)
    new intro('"ow." Your head hurts.',[1,1,0,0], ['damn, it does...', 'wait, what happened?','none','none']), //0
    new intro('that party must have gotten crazy!',[3,3,0,0],['what party?!', "yea... can't remember much...",'none','none']), //1
    new intro('oh yea... somethings missing.',[5,5,0,0],['oh yea.','oh yea?','none','none'] ), //2
    new intro('to be set',[2,2,0,0],["geuss I should go find 'em ","ugh. This means responsibility doesn't it...",'none','none']), //3
    new intro("you step outside into a courtyard. The bright sun makes your head pound.",[8,8,8,8], ["where am I?",'what time is it?',"I'm hungry",'none']), //4
    new intro("you reach into your pocket and fish out your phone. It's missing a screen.",[2,2,0,0],['why do bad things happen to good people.','to be set','none','none']), //5
    new intro('you step through a crumbling stone door way into a room full of must. It smells like an old book. The walls are littered with pictographs',[2,2,2,2],['what is must?','mmmm old book smell.','why are there lights in here?','none']),//6
    new intro('you see before you the exit n stuff',[2,2,2,2],['blank','none','none','none']),//7
    new intro("you walk into a humid environment. before you stands a tree that looks like it's holding the weight of the world. This place is ancient.",[2,2,2,2],['as ancient as grandma?','hey look, a fern.','none','none']),//8
    new intro("you feel like you just got put into tron. flashy lights and little beeps and boops fill the atmosphere. It's a lot to take in.",[2,2,2,2],['hey I have a quarter!',"what are these big boxes with screens for?",'none','none']),//9
    new intro("you open a door and it feels like you stepped through a portal. it's forty degrees colder and you can't feel your legs, but the sight of this place is almost worth it.",[2,2,2,2],['this place got a thermostat?',"dang. wish I hadn't gambled away my coat.",'none','none']), //10
    new intro('you notice a little cot at the back of the room you came out of',[10,10,2,2],['well, one can also sleep on the ground...',"hmm, I didn't really consider sleeping.",'none','none']), //11, this is the intro to the room you started in
    new intro('blank',[2,2,2,2],['blank','none','none','none']), //12
    new intro('blank',[2,2,2,2],['blank','none','none','none']), //13
    new intro('blank',[2,2,2,2],['blank','none','none','none']), //14
    new intro('blank',[2,2,2,2],['blank','none','none','none']), //15
    new intro('blank',[2,2,2,2],['blank','none','none','none']), //16
    new intro('blank',[2,2,2,2],['blank','none','none','none']), //17
    new intro('blank',[2,2,2,2],['blank','none','none','none']), //18
    new intro("you plop down on the bed. It's not that comfy but you sorta sink into it",[11,11,11,11],['wait who said that?','this place is insane',"I know! you couldn't dream it up",'yawn']), //19
    new intro('the world shifts around you. It seems like you fell into a dream instead of falling asleep. The bed below you has changed and you realise your in a different room.',[2,2,2,2],['oh wow, this is nice','am I dreaming?','this feels so real','none']) //20

];

var rooms = [
    //room(introId,description,[lf,f,rf,rb,b,lb],optionId,oldNew,mirrorRoom,img,mp3)
    new room(0,'there is an opening against the wall',['barred door',1,'barred door','n','n','n'],1,false,7,'https://s-media-cache-ak0.pinimg.com/originals/86/1b/da/861bda7d76e58f26f657789cf79893d8.jpg'), //0
    new room(4,'you find yourself in a courtyard that has six rooms surrounding it, and a nice fountain in the middle',[2,3,4,5,0,6],1,true,8,'https://upload.wikimedia.org/wikipedia/en/3/3a/Freer_Courtyard.jpg'), //1
    new room(6,'egyptian temple',['n','n','n','barred door',1,'barred door'],1,true,9,'http://people.ucls.uchicago.edu/~bwildem/art_hist_laba/egypt/rockcut.png'),
    new room(7,'exit',['n','n','n','barred door',1,'barred door'],1,true,10,'http://faculty.wartburg.edu/lindgrene/DSCN4645.JPG'),
    new room(8,'jungle temple',['n','n','n','barred door',1,'barred door'],1,true,11,'https://davidlazarphoto.com/amp/wp-content/uploads/2012/07/18-David-Lazar-Jungle-Temple.jpg'),
    new room(9,'arcade',['n','n','n','barred door',1,'barred door'],1,true,12,'http://www.roadtovr.com/wp-content/uploads/2016/08/new-retro-arcade-neon-launch-8.jpg'),
    new room(10,'ice caves',['n','n','n','barred door',1,'barred door'],1,true,13,'http://www.glacierguides.is/sites/default/files/2000x1333_ice_caves_crystal_cave_gallery_2_einarolafurmatthiasson.jpg'),
    new room(12,'start mirror',['barred door',8,'barred door','n','n','n'],2,true,0,'https://texasstation.sclv.com/~/media/Images/Page-Background-Images/Texas/TS_Hotel_King_lowrez.jpg?h=630&la=en&w=1080'),
    new room(13,'courtyard mirror',[9,10,11,12,7,13],2,true,1,'http://grandinroad.scene7.com/is/image/frontgate/BLOG_fountain?defaultImage=NoImageIcon_GR&fmt=png&fit=crop,1&wid=600&hei=460&resMode=sharp2&op_usm=1.4,0.4,0,0'),
    new room(14,'egyptian temple mirror',['n','n','n','barred door',8,'barred door'],2,true,2,'http://people.ucls.uchicago.edu/~bwildem/art_hist_laba/egypt/rockcut.png'),
    new room(15,'exit mirror',['n','n','n','barred door',8,'barred door'],2,true,3,'http://faculty.wartburg.edu/lindgrene/DSCN4645.JPG'),
    new room(16,'jungle temple mirror',['n','n','n','barred door',8,'barred door'],2,true,4,'https://davidlazarphoto.com/amp/wp-content/uploads/2012/07/18-David-Lazar-Jungle-Temple.jpg'),
    new room(17,'arcade mirror',['n','n','n','barred door',8,'barred door'],2,true,5,'http://www.roadtovr.com/wp-content/uploads/2016/08/new-retro-arcade-neon-launch-8.jpg'),
    new room(18,'ice caves mirror',['n','n','n','barred door',8,'barred door'],2,true,6,'http://www.glacierguides.is/sites/default/files/2000x1333_ice_caves_crystal_cave_gallery_2_einarolafurmatthiasson.jpg')
];

var effects = [
    //effect([functionId],buttonNames,oneUse)
    new effect([0,0,0,0],['none','none','none','none'],0),
    new effect([6,7,0,0],['pull out your phone','none','none','none'],0),
    new effect([7,0,0,0],['wake up','none','none','none'],0),
    new effect([9,0,0,0],['go back to sleep','none','none','none'],0)
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
        intros[3].description = 'damn! I need to find '+ player.bff + ". Dude, where did I leave them?";
        effectHappens(3);
        console.log('5happened');
    },
    function(){
        intros[5].button[1] = 'I bet this was ' +player.bff+ "'s fault.";
        effects[1].button[0] = 'none';
        console.log('6happened');
        effectHappens(5);
    },
    function(){

        if(player.inDream){ //if you're in the dream world
            console.log("you're in a dream!");
            player.inDream = false;
            player.dreamLocation = player.location;
            if(player.mirrorLocation == findRoom().mirrorRoom){ //if you're in a parallel room
                player.hasSoul = true;
                console.log('you got your soul!');
            }
            player.location = player.mirrorLocation;
        }else { //if you're in the real world
            console.log("you're in reality!");
            player.mirrorLocation = player.location;
            if(player.hasSoul){ //if you have your soul
                player.location = findRoom().mirrorRoom;
            } else{ // if you don't have your soul
                player.location = player.dreamLocation
            }
            player.inDream = true;
            player.hasSoul = false;
        }

        $('.options').hide();
        var img = findRoom().img;
        document.body.style.background = "url(" + img + ") ";
        document.body.style.backgroundSize = 'cover';
        if(findRoom().oldNew){
            introHappens();
            findRoom().oldNew = false;
        }else{
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

        }
        console.log('7happened');
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
    },
    function(){
        effects[1].button[1] = 'go back to sleep';
        rooms[0].options = 1;
        effectHappens(19);
        console.log('9 HAPPENED');
    },
    function(){
        rooms[0].options = 3;
        functions[2]();
        console.log('10 HAPPENED');
    },
    function(){
        player.location = 7;
        var img = findRoom().img;
        document.body.style.background = "url(" + img + ") ";
        document.body.style.backgroundSize = 'cover';
        findRoom().oldNew = false;
        effectHappens(20);
        player.inDream = true;
        player.hasSoul = false;
        console.log('11 HAPPENED');
    }
];
// function(itemNameInQuotes,introNumber){
//GIVE ITEM
//player.inventory[player.inventory.length] = itemNameInQuotes;
//effectHappens(introNumber);
//console.log('3 HAPPEND');
//reuse();
//}