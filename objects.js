/**
 * Created by h205p2 on 12/15/16.
 */
function Room(introId,description,rooms,optionId,oldNew,mirrorRoom,img,mp3){
    this.introId=introId;
    this.description=description;
    this.navigation=rooms;
    this.options=optionId;
    this.oldNew=oldNew;
    this.mirrorRoom=mirrorRoom;
    this.img=img;
    this.music=mp3;

}

function Intro(description,functionId,buttonNames){
    this.description=description;
    this.functions=functionId;
    this.button= buttonNames
}

function effect(functionId,buttonNames,oneUse){
    this.functions=functionId;
    this.button= buttonNames;
    this.oneUse= oneUse
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
    new Intro('*Groan* Your head hurts. Your feel a thick glaze over your eyes',[1,1,1,0], ['damn, it does...', 'wait, what happened?','*Groan*','none']), //0
    new Intro('that party must have gotten crazy!',[3,3,0,0],['what party?!', "yea... can't remember much...",'none','none']), //1
    new Intro('oh yea... somethings missing.',[5,5,0,0],['oh yea.','oh yea?','none','none'] ), //2
    new Intro('to be set',[2,2,0,0],["geuss I should go find 'em ","ugh. This means responsibility doesn't it...",'none','none']), //3
    new Intro("you step outside into a courtyard. The bright sun makes your head pound.",[8,8,8,8], ["where am I?",'what time is it?',"I'm hungry",'none']), //4
    new Intro("you reach into your pocket and fish out your phone. It's missing a screen.",[2,2,0,0],['why do bad things happen to good people.','to be set','none','none']), //5
    new Intro('you step through a crumbling stone door way into a room full of must. It smells like an old book. The walls are littered with pictographs',[2,2,2,2],['what is must?','mmmm old book smell.','why are there lights in here?','none']),//6
    new Intro('you see before you the exit n stuff',[2,2,2,2],['blank','none','none','none']),//7
    new Intro("you walk into a humid environment. before you stands a tree that looks like it's holding the weight of the world. This place is ancient.",[2,2,2,2],['Have I been here before?','hey look, a fern.','none','none']),//8
    new Intro("This room warrants a seizure warning. Flashy lights and little beeps and boops fill the atmosphere. It's a lot to take in.",[2,2,2,2],['hey I have a quarter!',"what are these big boxes with screens for?",'*shields eyes*','none']),//9
    new Intro("you open a door and it feels like you stepped through a portal. it's forty degrees colder and you can't feel your legs, but the sight of this place is almost worth it.",[2,2,2,2],['this place got a thermostat?',"dang. wish I hadn't gambled away my coat.",'none','none']), //10
    new Intro('you notice a little cot at the back of the room you came out of',[10,10,2,2],['That looks incredibly uncomfortable',"hmm, I didn't really consider sleeping.",'none','none']), //11, this is the intro to the room you started in
    new Intro("Despite the temperature, this room is oddly calming.",[2,2,2,2],['blank','none','none','none']), //12
    new Intro('The room is full of shifting fog and strange sculptures. All of their faces seem strangely familiar. In the center of the space is an angel atop a fountain.',[2,2,2,2],['what is this place?','this mist is weird.','none','none']), //13
    new Intro('You  stumble into a damp room. The walls are covered in murals, that seem to be moving and silently talking amongst themselves.',[2,2,2,2],['blank','none','none','none']), //14
    new Intro('You grasp the artifact. Immediately there is a deep sense of dread, and your world shifts before your eyes.',[13,13,13,13],['blank','none','none','none']), //15
    new Intro("The place you arrive in feels strange... It feels like you're at the core of something giant and all incompassing. The air is thin.",[2,2,2,2],['blank','none','none','none']), //16
    new Intro('"wow", the space is dominated by an intriguing painting. The colors dance across the walls and you are mesmorised',[2,2,2,2],['blank','none','none','none']), //17
    new Intro('blank',[2,2,2,2],['blank','none','none','none']), //18
    new Intro("you plop down on the bed. It's not that comfy but you sorta sink into it",[11,11,11,11],['wait who said that?','this place is insane',"I know! you couldn't dream it up",'yawn']), //19
    new Intro('the world shifts around you. It seems like you fell into a dream instead of falling asleep. The bed below you has changed and you realise your in a different room.',[2,2,2,2],['oh wow, this is nice','am I dreaming?','this feels so real','none']) //20

];

var rooms = [
    //room(introId,description,[lf,f,rf,rb,b,lb],optionId,oldNew,mirrorRoom,img,mp3)
    new Room(0,'there is an opening against the wall',['barred door',1,'barred door','n','n','n'],1,false,7,'https://s-media-cache-ak0.pinimg.com/originals/86/1b/da/861bda7d76e58f26f657789cf79893d8.jpg'), //0
    new Room(4,'you find yourself in a courtyard that has six rooms surrounding it, and a nice fountain in the middle',[2,'barred door',4,'barred door',0,'barred door'],1,true,8,'https://upload.wikimedia.org/wikipedia/en/3/3a/Freer_Courtyard.jpg'), //1
    new Room(6,'bugs scurry back and fourth across the temple floor.',['n','n','n','barred door',1,'barred door'],1,true,9,'http://people.ucls.uchicago.edu/~bwildem/art_hist_laba/egypt/rockcut.png'),
    new Room(7,'exit',['n','n','n','barred door',1,'barred door'],1,true,10,'http://faculty.wartburg.edu/lindgrene/DSCN4645.JPG'),
    new Room(8,'The grove still exudes a timeless presence.',['n','n','n','barred door',1,5],1,true,11,'https://davidlazarphoto.com/amp/wp-content/uploads/2012/07/18-David-Lazar-Jungle-Temple.jpg'),
    new Room(9,'The arcade bips and bops at you.',['n','n','n',4,'barred door','barred door'],1,true,12,'http://www.roadtovr.com/wp-content/uploads/2016/08/new-retro-arcade-neon-launch-8.jpg'),
    new Room(10,'The chill of ice is ever penetrating.',['n','n','n','barred door',1,'barred door'],1,true,13,'http://www.glacierguides.is/sites/default/files/2000x1333_ice_caves_crystal_cave_gallery_2_einarolafurmatthiasson.jpg'),
    new Room(12,'There is a perfumey, hotel room smell about.',[13,'barred door','barred door','n','n','n'],2,true,0,'https://texasstation.sclv.com/~/media/Images/Page-Background-Images/Texas/TS_Hotel_King_lowrez.jpg?h=630&la=en&w=1080'),
    new Room(13,'around you are five mystical doorways. straight forward there is a locked door.',[9,'barred door','barred door','barred door','barred door','barred door'],2,true,1,'http://grandinroad.scene7.com/is/image/frontgate/BLOG_fountain?defaultImage=NoImageIcon_GR&fmt=png&fit=crop,1&wid=600&hei=460&resMode=sharp2&op_usm=1.4,0.4,0,0'),
    new Room(14,'the eyes of the paintings almost, follow you. There is an artifact in the corner.',['n','n','n',13,8,'barred door'],4,true,2,'https://www.askideas.com/media/42/Adorable-Art-Work-On-Wall-Inside-The-Egyptian-Pyramid.jpg'),
    new Room(15,'exit mirror',['n','n','n','barred door','barred door','barred door'],2,true,3,'http://faculty.wartburg.edu/lindgrene/DSCN4645.JPG'),
    new Room(16,'this place seems odly normal in contrast.',['n','n','n','barred door','barred door','barred door'],2,true,4,'http://conceptartempire.com/images/06/372/19-jungle-temple-concept-art-interior.jpg'),
    new Room(17,'The paint seems to bleed with life.',['n','n','n','barred door','barred door','barred door'],2,true,5,'http://data.whicdn.com/images/3366741/large.jpg'),
    new Room(12,'You could easliy sit down in one of these ice chairs',['n','n','n',7,'barred door',9],2,true,6,'https://icons.wxug.com/data/wximagenew/p/patizzr/25.jpg')
];

var effects = [
    //effect([functionId],buttonNames,oneUse)
    new effect([0,0,0,0],['none','none','none','none'],0),
    new effect([6,7,0,0],['pull out your phone','none','none','none'],0),
    new effect([7,0,0,0],['wake up','none','none','none'],0),
    new effect([9,0,0,0],['go back to sleep','none','none','none'],0),
    new effect([7,12,0,0],['wake up','pick up the artifact','none','none'],1)
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
        $('#navigation').show();
        $('.options').hide();
        player.inIntro = false;
        setEffects();
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
            setEffects();
        }
        console.log('7happened');
        returnBarredDoor();
    },
    function(){
        rooms[0].introId = 11;
        rooms[0].oldNew = true;
        functions[2]();
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
        returnBarredDoor();

    },
    function(){
        effectHappens(15);
        console.log('12 happend');
        reuse();
    },
    function(){
        player.location = 11;
        functions[2]();

        console.log('13 happened');
    }
];
// function(itemNameInQuotes,introNumber){
//GIVE ITEM
//player.inventory[player.inventory.length] = itemNameInQuotes;
//effectHappens(introNumber);
//console.log('3 HAPPEND');
//reuse();
//}