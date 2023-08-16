let canvas = document.getElementById("gameZone");
let context = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 550;

const cell_width = 25;
const cell_height = 25;

if(localStorage.getItem("Level") == null){
    localStorage.setItem("Level",0);
}

let count_cell_width = canvas.width / cell_width;
let count_cell_height = canvas.height/ cell_height;
let array_map = [];
let select_level = 6;
let array_texture = levels[select_level-1];

let direction_hero = '';
let speed_hero = 3;
let time_speed = 5;
let dollars = 0;
let cubes = 0;
let status_game = "pause";
let game_mode = "game";
let life = true;
let block = '1';
let portal_blue = '13';
let portal_red = '14';
let move;
let result;
let moonwalk = false;
let hero_animate = array_texture.filter(textures => textures.texture == 8);

function Save_Progress(){
    // let currentDollars = Number(localStorage.getItem("total_dollars"));
    // let currentCube = Number(localStorage.getItem("total_cubes"));
    // localStorage.setItem("total_dollars",currentDollars+ dollars);
    // localStorage.setItem("total_cubes",currentCube+ cubes);
    localStorage.setItem("Level",Number(localStorage.getItem("Level"))+1);
}

for(let i= 0;i< count_cell_width;i++){
    for(let j = 0; j < count_cell_height; j++){
        array_map.push({x:i*cell_width,y:j*cell_height});
    }
}
function Animation_hero(){  
    if(hero_animate.length == 1){
        // if(direction_hero == "left"){
        //     hero_animate[0].info = hero_run_left;
        //     hero.src = hero_animate[0].info.image;
        // }
        if(life == false){
            hero_animate[0].info = hero_death;
            hero.src = hero_animate[0].info.image;
        }
        else{
            hero_animate[0].info = hero_idel;
            hero.src = hero_animate[0].info.image;
        }
        if(hero_animate[0].info.select_frame < hero_animate[0].info.count_frame-1){
            hero_animate[0].info.select_frame++;
        }
        else{
            hero_animate[0].info.select_frame = 0;
        }
    }

}
// function Animation_door(cell_door){
//     let open_door = array_texture.filter(cells => cells.id == cell_door);
//     // console.log(open_door);
//     let interval_door = setInterval(function(){
//         if(open_door[0].info.select_frame <= 3){
//             open_door[0].info.select_frame++;
//         }
//         else{
//             clearInterval(interval_door);
//         }
//     }, 1000/4);
//     setTimeout(function(){
//         let interval_door = setInterval(function(){
//             if(open_door[0].info.select_frame != 0){
//                 open_door[0].info.select_frame--;
//             }
//             else{
//                 clearInterval(interval_door);
//             }
//         }, 1000/4);
//     },5000);
// }
function Animate_objects(){
    // let array_money = array_texture.filter(textures => textures.texture == 2);
    let array_cube = array_texture.filter(textures => textures.texture == 3);
    let array_laser1 = array_texture.filter(textures => textures.texture == 4);
    let array_laser2 = array_texture.filter(textures => textures.texture == 7);
    let array_terminal = array_texture.filter(textures => textures.texture == 5);
    // let array_button1 = array_texture.filter(textures => textures.texture == 12);
    // if(array_money.length > 0){
    //     for(let i = 0; i < array_money.length;i++){
    //         if(array_money[i].info.select_frame < array_money[i].info.count_frame-1){
    //             array_money[i].info.select_frame++;
    //         }
    //         else{
    //             array_money[i].info.select_frame = 0;
    //         }
    //     }
        
    // }
    if(array_cube.length > 0){
        for(let i = 0; i < array_cube.length;i++){
            if(array_cube[i].info.select_frame < array_cube[i].info.count_frame-1){
                array_cube[i].info.select_frame++;
            }
            else{
                array_cube[i].info.select_frame = 0;
            }
        }
    }
    if(array_laser1.length > 0){
        for(let i = 0; i < array_laser1.length;i++){
            if(array_laser1[i].info.select_frame < array_laser1[i].info.count_frame-1){
                array_laser1[i].info.select_frame++;
            }
            else{
                array_laser1[i].info.select_frame = 0;
            }
        }
    }
    if(array_laser2.length > 0){
        for(let i = 0; i < array_laser2.length;i++){
            if(array_laser2[i].info.select_frame < array_laser2[i].info.count_frame-1){
                array_laser2[i].info.select_frame++;
            }
            else{
                array_laser2[i].info.select_frame = 0;
            }
        }
    }
    if(array_terminal.length > 0){
        for(let i = 0; i < array_terminal.length;i++){
            if(array_terminal[i].info.select_frame < array_terminal[i].info.count_frame-1){
                array_terminal[i].info.select_frame++;
            }
            else{
                array_terminal[i].info.select_frame = 0;
            }
        }
    }

    // if(array_button1.length > 0){
    //     for(let i = 0; i < array_button1.length;i++){
    //         if(array_button1[i].info.select_frame < array_button1[i].info.count_frame-1){
    //             array_button1[i].info.select_frame++;
    //         }
    //         else{
    //             array_button1[i].info.select_frame = 0;
    //         }
    //     }
    // }
}
function Animate_spike(array_spike){
    if(array_spike.length > 0){
        for(let i = 0; i < array_spike.length;i++){
            if(array_spike[i].info.select_frame < array_spike[i].info.count_frame-1){
                array_spike[i].info.select_frame++;
            }
            
        }  
    }
}
function DrawCell(){
    for (let i = 0; i < array_map.length; i++) {
        context.fillText(i,array_map[i].x,array_map[i].y);
    }
}
function DrawBG(){
   context.drawImage(bg_img,0,0,canvas.width,canvas.height);
   // context.fillStyle = "blue";
   // context.fillRect(0, 0, canvas.width, canvas.height);
}
function DrawTexture(){
    context['imageSmoothingEnabled'] = false;
    if(array_texture.length > 0){
        for (let i = 0; i < array_texture.length; i++) {
            switch(array_texture[i].texture){
                case '1':
                    context.drawImage(
                        wall,
                        array_map[array_texture[i].id].x,
                        array_map[array_texture[i].id].y,
                        cell_width,
                        cell_height);
                        break;
                case '2':
                    context.drawImage(
                        wall2,
                        array_map[array_texture[i].id].x,
                        array_map[array_texture[i].id].y,
                        cell_width,
                        cell_height);
                        break;
                case '3':
                    context.drawImage(
                        cube,
                        array_texture[i].info.select_frame*array_texture[i].info.width_frame,
                        0*array_texture[i].info.height_frame,
                        array_texture[i].info.width_frame,
                        array_texture[i].info.height_frame,
                        array_map[array_texture[i].id].x+2,
                        array_map[array_texture[i].id].y,
                        cell_width*0.8,
                        cell_height);
                        break;   
                case '4':
                    context.drawImage(
                        laser1,
                        array_texture[i].info.select_frame*array_texture[i].info.width_frame,
                        0*array_texture[i].info.height_frame,
                        array_texture[i].info.width_frame,
                        array_texture[i].info.height_frame,
                        array_map[array_texture[i].id].x,
                        array_map[array_texture[i].id].y,
                        cell_width,
                        cell_height);                      
                        break;    
                            
                case '5':
                    context.drawImage(
                        terminal,
                        array_texture[i].info.select_frame*array_texture[i].info.width_frame,
                        0*array_texture[i].info.height_frame,
                        array_texture[i].info.width_frame,
                        array_texture[i].info.height_frame,
                        array_map[array_texture[i].id].x,
                        array_map[array_texture[i].id].y,
                        cell_width,
                        cell_height);
                        break; 
                case '6':
                    context.drawImage(
                        button,
                        array_texture[i].info.select_frame*array_texture[i].info.width_frame,
                        0*array_texture[i].info.height_frame,
                        array_texture[i].info.width_frame,
                        array_texture[i].info.height_frame,
                        array_map[array_texture[i].id].x+2,
                        array_map[array_texture[i].id].y,
                        cell_width*0.85,
                        cell_height);  
                        break; 
                case '7':
                    context.drawImage(
                        laser2,
                        array_texture[i].info.select_frame*array_texture[i].info.width_frame,
                        0*array_texture[i].info.height_frame,
                        array_texture[i].info.width_frame,
                        array_texture[i].info.height_frame,
                        array_map[array_texture[i].id].x,
                        array_map[array_texture[i].id].y,
                        cell_width,
                        cell_height);   
                        break;  
                case '8':
                    if (direction_hero == '') {
                        hero.info = hero_idel
                        hero.src = hero.info.image
                    }
                    if (direction_hero == "left") {
                        hero.info = hero_run_left
                        hero.src = hero.info.image
                    }
                    if (direction_hero == "right") {
                        hero.info = hero_run_right
                        hero.src = hero.info.image
                    }
                    if (moonwalk) {
                        hero_run_right.image = "assets/image/Skins/Robot/Robot_v1_run_left.png"
                        hero_run_left.image = "assets/image/Skins/Robot/Robot.v1_run_right.png"
                        hero.src = hero.info.image
                        speed_hero = 1
                    }
                    if (!moonwalk) {
                        hero_run_left.image = "assets/image/Skins/Robot/Robot_v1_run_left.png"
                        hero_run_right.image = "assets/image/Skins/Robot/Robot.v1_run_right.png"
                        hero.src = hero.info.image
                        speed_hero = 3
                    }
                    context.drawImage(
                        hero,
                        array_texture[i].info.select_frame*array_texture[i].info.width_frame,
                        0*array_texture[i].info.height_frame,
                        array_texture[i].info.width_frame,
                        array_texture[i].info.height_frame,
                        array_texture[i].x,
                        array_texture[i].y-24,
                        cell_width,
                        cell_height+20);
                        break; 
                case '9':
                                if(array_texture[i].direction_bat == "right"){
                                    context.drawImage(
                                        bat,
                                        array_texture[i].info.select_frame*array_texture[i].info.width_frame,
                                        1*array_texture[i].info.height_frame,
                                        array_texture[i].info.width_frame,
                                        array_texture[i].info.height_frame,
                                        array_texture[i].x,
                                        array_texture[i].y,
                                        cell_width,
                                        cell_height);
                                }
                                else{
                                    context.drawImage(
                                        bat,
                                        array_texture[i].info.select_frame*array_texture[i].info.width_frame,
                                        3*array_texture[i].info.height_frame,
                                        array_texture[i].info.width_frame,
                                        array_texture[i].info.height_frame,
                                        array_texture[i].x,
                                        array_texture[i].y,
                                        cell_width,
                                        cell_height);
                                }
                            
                    break;
                case '10':
                            if(array_texture[i].direction_bat == "up"){
                                context.drawImage(
                                    bat,
                                    array_texture[i].info.select_frame*array_texture[i].info.width_frame,
                                    2*array_texture[i].info.height_frame,
                                    array_texture[i].info.width_frame,
                                    array_texture[i].info.height_frame,
                                    array_texture[i].x,
                                    array_texture[i].y,
                                    cell_width,
                                    cell_height);
                            }
                            else{
                                context.drawImage(
                                    bat,
                                    array_texture[i].info.select_frame*array_texture[i].info.width_frame,
                                    0*array_texture[i].info.height_frame,
                                    array_texture[i].info.width_frame,
                                    array_texture[i].info.height_frame, 
                                    array_texture[i].x,
                                    array_texture[i].y,
                                    cell_width,
                                    cell_height);
                            }
                    break;
                case '11':
                    context.drawImage(
                        spike,
                        array_texture[i].info.select_frame*array_texture[i].info.width_frame,
                        0*array_texture[i].info.height_frame,
                        array_texture[i].info.width_frame,
                        array_texture[i].info.height_frame,
                        array_map[array_texture[i].id].x+(cell_width*0.125),
                        array_map[array_texture[i].id].y+(cell_height*0.25),
                        cell_width*0.75,
                        cell_height*0.75);
                        break;

                case '12':
                    context.drawImage(
                        button1,
                        array_texture[i].info.select_frame*array_texture[i].info.width_frame,
                        0*array_texture[i].info.height_frame,
                        array_texture[i].info.width_frame,
                        array_texture[i].info.height_frame,
                        array_map[array_texture[i].id].x,
                        array_map[array_texture[i].id].y+2,
                        cell_width,
                        cell_height*0.95);
                        break; 
                case '13':
                    context.drawImage(
                        portal1,
                        array_map[array_texture[i].id].x,
                        array_map[array_texture[i].id].y-cell_height,
                        cell_width,
                        cell_height * 2);
                        break;
                case '14':
                        context.drawImage(
                        portal2,
                        array_map[array_texture[i].id].x,
                        array_map[array_texture[i].id].y-cell_height,
                        cell_width,
                        cell_height * 2);
                        break;
            }
        }
    }
}

    canvas.addEventListener("mousedown",function(event){
        if(game_mode == "edit") {
            const rect = canvas.getBoundingClientRect();
            let x = Math.floor((event.clientX - rect.left) / cell_width) * cell_width;
            let y = Math.floor((event.clientY - rect.top) / cell_height) * cell_height;
            // console.log("X:"+x+" Y:"+y);
            for (let i = 0; i < array_map.length; i++) {
                if (array_map[i].x == x && array_map[i].y == y) {
                    let check = array_texture.filter(id_check => id_check.id == i);


                    if (check == 0) {
                        switch (block) {
                            case '1':
                                array_texture.push({id: i, texture: block});
                                break;
                            case '2':
                                array_texture.push({id: i, texture: block});
                                break;
                            case '3':
                                array_texture.push({id: i, texture: block, info: cube_info});
                                break;
                            case '4':
                                array_texture.push({id: i, texture: block, info:laser1_info});
                                // $("div.blocks").attr("id_door", i);
                                break;
                            case '5':
                                array_texture.push({id: i, texture: block, info: terminal_info});
                                break;
                            case '6':
                                let id_button = $("div.blocks").attr("id_door");
                                array_texture.push({id: i, texture: block, id_door: id_button, info: button_info});

                                break;
                            case '7':
                                array_texture.push({id: i, texture: block, info: laser2_info});
                                $("div.blocks").attr("id_door", i);
                                break;
                            case '8':
                                array_texture.push({
                                    id: i,
                                    x: array_map[i].x,
                                    y: array_map[i].y,
                                    texture: block,
                                    info: hero_idel
                                });
                                break;
                            case '9':
                                array_texture.push({
                                    id: i,
                                    x: array_map[i].x,
                                    y: array_map[i].y,
                                    texture: block,
                                    info: bat_info,
                                    direction_bat:"left"
                                });
                                
                                break;
                            case '10':
                                array_texture.push({
                                    id: i,
                                    x: array_map[i].x,
                                    y: array_map[i].y,
                                    texture: block,
                                    info: bat_info,
                                    direction_bat:"up"
                                });
                                break; 
                            case '11':
                                array_texture.push({
                                    id: i,
                                    texture: block,
                                    info: spike_info
                                });
                                break;  
                            case '12':
                                array_texture.push({
                                    id: i,
                                    texture: block,
                                    info: button1_info
                                });
                                break;         
                        }
                    } else {
                        for (let j = 0; j < array_texture.length; j++) {
                            if (array_texture[j].id == check[0].id) {
                                array_texture.splice(j, 1);
                            }
                        }
                    }
                    break;
                }
            }
        }
    });


let id_cell
let pol
let id_cell1
let id_cell2
let pol1
let pol2
let gravity = 2;


    function Gravity() {
        if(game_mode == "game"){
            id_cell1 = array_map.findIndex(cell => cell.x >= hero_animate[0].x && cell.y >= hero_animate[0].y-cell_height);
            id_cell2 = array_map.findIndex(cell => cell.x >= hero_animate[0].x+5 && cell.y >= hero_animate[0].y-cell_height);
            pol1 = array_texture.filter(cell => cell.id == id_cell1+1);
            pol2 = array_texture.filter(cell => cell.id == id_cell2-21);   //Если cell.x-32 <= hero.x && cell.x >= hero.x НО Я НЕ ПОНИМАЮ КАК
            if(pol1.length == 1 && (pol1[0].texture == 1 || pol1[0].texture == 2) || (pol2.length == 1 && pol2[0].texture == 1 || pol2.length == 1 && pol2[0].texture == 2)){
            }
            else{
                hero_animate[0].y+=gravity;
            };
    }}

    // function Potolok(){
    //     id_cell = array_map.findIndex(cell => cell.x >= hero_animate[0].x && cell.y >= hero_animate[0].y);
    //     potolok = array_texture.filter(cell => cell.id == id_cell-1);
    //         if(potolok.length == 1 && potolok[0].texture == 1){
    //             direction_hero = "";
    //             console.log("Потолок")
    //         }
    //     }

    canvas.addEventListener("mouseup",function(event){
        let x = event.pageX - canvas.offsetLeft;
        let y = event.pageY - canvas.offsetTop;
        
        if(game_mode == "game"){

            switch (event.which) {
                case 1:
                    
                    id_cell = array_map.findIndex(cell => cell.x >= x && cell.y >= y)-23;
                    pol = array_texture.filter(cell => cell.id == id_cell || cell.id == id_cell-1);
                    pol1 = array_texture.filter(cell => cell.id == id_cell-22);
                    pol2 = array_texture.filter(cell => cell.id == id_cell+22);
        
                    console.log(x + ":" + y);
                    
                    if (pol.length == 2 && pol[0].texture == 1 && pol[1].texture == 1) {   

                        if (pol1.length > 0 && pol2.length > 0){
                            if (JSON.stringify(array_texture[array_texture.length-1]).indexOf('"texture":"13"') !== -1 ) {
                                array_texture.splice(array_texture.length-1, 1);
                            }
                            if (JSON.stringify(array_texture[array_texture.length-2]).indexOf('"texture":"13"') !== -1 ) {
                                array_texture.splice(array_texture.length-2, 1);
                            }
                        }
                        else if (pol1.length >= 1 && (pol1[0].texture == 1 || pol1[0].texture == 2 || pol1[1].texture == 13)){
                            if(hero_animate[0].x > array_map[id_cell].x){
                                if (JSON.stringify(array_texture[array_texture.length-1]).indexOf('"texture":"13"') !== -1 ) {
                                    array_texture.splice(array_texture.length-1, 1);
                                }
                                if (JSON.stringify(array_texture[array_texture.length-2]).indexOf('"texture":"13"') !== -1 ) {
                                    array_texture.splice(array_texture.length-2, 1);
                                }
                                array_texture.push({id: id_cell, texture: portal_blue});
                                console.log('Портал 1 поставлен');
                            }
                        }
                        else if(pol2.length >= 1 && (pol2[0].texture == 1 || pol2[0].texture == 2 || pol2[1].texture == 13)){
                            if(hero_animate[0].x < array_map[id_cell].x){
                                if (JSON.stringify(array_texture[array_texture.length-1]).indexOf('"texture":"13"') !== -1 ) {
                                    array_texture.splice(array_texture.length-1, 1);
                                }
                                if (JSON.stringify(array_texture[array_texture.length-2]).indexOf('"texture":"13"') !== -1 ) {
                                    array_texture.splice(array_texture.length-2, 1);
                                }
                                array_texture.push({id: id_cell, texture: portal_blue});
                                console.log('Портал 1 поставлен');
                            }
                        }
                        else{
                                if (JSON.stringify(array_texture[array_texture.length-1]).indexOf('"texture":"13"') !== -1 ) {
                                        array_texture.splice(array_texture.length-1, 1);
                                    }
                                if (JSON.stringify(array_texture[array_texture.length-2]).indexOf('"texture":"13"') !== -1 ) {
                                    array_texture.splice(array_texture.length-2, 1);
                                }
                                array_texture.push({id: id_cell, texture: portal_blue});
                                console.log('Портал 1 поставлен');                   
                        }
                    }
        
                break;
                case 3:
                    
                    id_cell = array_map.findIndex(cell => cell.x >= x && cell.y >= y)-23;
                    pol = array_texture.filter(cell => cell.id == id_cell || cell.id == id_cell-1);
                    pol1 = array_texture.filter(cell => cell.id == id_cell-22);
                    pol2 = array_texture.filter(cell => cell.id == id_cell+22);
        
                    canvas.oncontextmenu = function () {
                        console.log(x + ":" + y);
                        
                        if (pol.length == 2 && pol[0].texture == 1 && pol[1].texture == 1) {    
                        
                        if (pol1.length > 0 && pol2.length > 0){
                            if (JSON.stringify(array_texture[array_texture.length-1]).indexOf('"texture":"14"') !== -1 ) {
                                array_texture.splice(array_texture.length-1, 1);
                            }
                            if (JSON.stringify(array_texture[array_texture.length-2]).indexOf('"texture":"14"') !== -1 ) {
                                array_texture.splice(array_texture.length-2, 1);
                            }
                        }
                        else if (pol1.length >= 1 && (pol1[0].texture == 1 || pol1[0].texture == 2 || pol1[1].texture == 14)){
                            if(hero_animate[0].x > array_map[id_cell].x){
                                if (JSON.stringify(array_texture[array_texture.length-1]).indexOf('"texture":"14"') !== -1 ) {
                                    array_texture.splice(array_texture.length-1, 1);
                                }
                                if (JSON.stringify(array_texture[array_texture.length-2]).indexOf('"texture":"14"') !== -1 ) {
                                    array_texture.splice(array_texture.length-2, 1);
                                }
                                array_texture.push({id: id_cell, texture: portal_red});
                                console.log('Портал 2 поставлен');
                            }
        
                        }
                        else if(pol2.length >= 1 && (pol2[0].texture == 1 || pol2[0].texture == 2 || pol2[1].texture == 14)){
                            if(hero_animate[0].x < array_map[id_cell].x){
                                if (JSON.stringify(array_texture[array_texture.length-1]).indexOf('"texture":"14"') !== -1 ) {
                                    array_texture.splice(array_texture.length-1, 1);
                                }
                                if (JSON.stringify(array_texture[array_texture.length-2]).indexOf('"texture":"14"') !== -1 ) {
                                    array_texture.splice(array_texture.length-2, 1);
                                }
                                array_texture.push({id: id_cell, texture: portal_red});
                                console.log('Портал 2 поставлен');
                            }
                        }
                        else{
                                if (JSON.stringify(array_texture[array_texture.length-1]).indexOf('"texture":"14"') !== -1 ) {
                                        array_texture.splice(array_texture.length-1, 1);
                                    }
                                if (JSON.stringify(array_texture[array_texture.length-2]).indexOf('"texture":"14"') !== -1 ) {
                                    array_texture.splice(array_texture.length-2, 1);
                                }
                                array_texture.push({id: id_cell, texture: portal_red});
                                console.log('Портал 2 поставлен');                   
                        }            
                    }
                    return false;}
                break;
            }
        }
    });

    
    let leftPressed = false;
	let rightPressed = false;
    document.addEventListener("keydown", keyRightHandler, false);
	document.addEventListener("keyup", keyLeftHandler, false);

    function keyRightHandler(event){
        if(event.code == "KeyD"){
        rightPressed = true;
        }
        if(event.code == "KeyA"){
        leftPressed = true;
        }
    };

    function keyLeftHandler(event){
        if(event.code == "KeyD"){
        rightPressed = false;
        console.log("На месте");
        }
        if(event.code == "KeyA"){
        leftPressed = false;
        console.log("На месте");
        }
    };

    setInterval(function(){
        if (rightPressed) {
            id_cell = array_map.findIndex(cell => cell.x >= hero_animate[0].x-cell_width+5 && cell.y >= hero_animate[0].y-12);
            pol1 = array_texture.filter(cell => cell.id == id_cell+21);
            pol2 = array_texture.filter(cell => cell.id == id_cell+22);
            if(pol1.length == 1 && pol1[0].texture == 1 && pol2.length == 0 || pol2.length == 1 && pol2[0].texture == 1 ||
               pol1.length == 1 && pol1[0].texture == 2 && pol2.length == 0 || pol2.length == 1 && pol2[0].texture == 2 ||
               pol1.length == 1 && pol1[0].texture == 4 && pol2.length == 0 || pol2.length == 1 && pol2[0].texture == 4 ||
               pol1.length == 1 && pol1[0].texture == 7 && pol2.length == 0 || pol2.length == 1 && pol2[0].texture == 7){
            }
            else if(pol2.length == 1 && pol2[0].texture == 3){
                array_texture.splice(array_texture.findIndex(cell => cell.id == id_cell+22), 1);
                cubes ++;
                $(".score_cubes p").text(cubes);
            }
            else if(pol2.length == 2  && pol2[0].texture == 1 && pol2[1].texture == 13){
                if (JSON.stringify(array_texture[array_texture.length-1]).indexOf('"texture":"13"') !== -1) {
                    
                    if (hero_animate[0].x < array_map[array_texture[array_texture.length-2].id].x) {
                        hero_animate[0].x = array_map[array_texture[array_texture.length-2].id].x - 10 - cell_width;
                        hero_animate[0].y = array_map[array_texture[array_texture.length-2].id].y;
                        console.log("Вы вошли в портал 1")
                    }
                    if (hero_animate[0].x > array_map[array_texture[array_texture.length-2].id].x) {
                        hero_animate[0].x = array_map[array_texture[array_texture.length-2].id].x + 10 + cell_width;
                        hero_animate[0].y = array_map[array_texture[array_texture.length-2].id].y;
                        console.log("Вы вошли в портал 1")
                    }
                }     
                if (JSON.stringify(array_texture[array_texture.length-1]).indexOf('"texture":"14"') !== -1) {

                    if (hero_animate[0].x < array_map[array_texture[array_texture.length-1].id].x) {
                        hero_animate[0].x = array_map[array_texture[array_texture.length-1].id].x - 10 - cell_width;
                        hero_animate[0].y = array_map[array_texture[array_texture.length-1].id].y;
                        console.log("Вы вошли в портал 1")
                    }
                    if (hero_animate[0].x > array_map[array_texture[array_texture.length-1].id].x) {
                        hero_animate[0].x = array_map[array_texture[array_texture.length-1].id].x + 10 + cell_width;
                        hero_animate[0].y = array_map[array_texture[array_texture.length-1].id].y;
                        console.log("Вы вошли в портал 1")
                    }
                }                   
            }
            else if(pol2.length == 2  && pol2[0].texture == 1 && pol2[1].texture == 14){
                if (JSON.stringify(array_texture[array_texture.length-1]).indexOf('"texture":"13"') !== -1) {

                    if (hero_animate[0].x < array_map[array_texture[array_texture.length-1].id].x) {
                        hero_animate[0].x = array_map[array_texture[array_texture.length-1].id].x - 10 - cell_width;
                        hero_animate[0].y = array_map[array_texture[array_texture.length-1].id].y;
                        console.log("Вы вошли в портал 2")
                    }
                    if (hero_animate[0].x > array_map[array_texture[array_texture.length-1].id].x) {
                        hero_animate[0].x = array_map[array_texture[array_texture.length-1].id].x + 10 + cell_width;
                        hero_animate[0].y = array_map[array_texture[array_texture.length-1].id].y;
                        console.log("Вы вошли в портал 2")
                    }
                }
                if (JSON.stringify(array_texture[array_texture.length-1]).indexOf('"texture":"14"') !== -1) {

                    if (hero_animate[0].x < array_map[array_texture[array_texture.length-2].id].x) {
                        hero_animate[0].x = array_map[array_texture[array_texture.length-2].id].x - 10 - cell_width;
                        hero_animate[0].y = array_map[array_texture[array_texture.length-2].id].y;
                        console.log("Вы вошли в портал 2")
                    }
                    if (hero_animate[0].x > array_map[array_texture[array_texture.length-2].id].x) {
                        hero_animate[0].x = array_map[array_texture[array_texture.length-2].id].x + 10 + cell_width;
                        hero_animate[0].y = array_map[array_texture[array_texture.length-2].id].y;
                        console.log("Вы вошли в портал 2")
                    }
                }
            }
            else{
                direction_hero = "right";
                hero_animate[0].x+=speed_hero;
            }
        }
        if (leftPressed) {
            id_cell = array_map.findIndex(cell => cell.x >= hero_animate[0].x && cell.y >= hero_animate[0].y-12);
            pol1 = array_texture.filter(cell => cell.id == id_cell-23);
            pol2 = array_texture.filter(cell => cell.id == id_cell-22);
            if(pol1.length == 1 && pol1[0].texture == 1 && pol2.length == 0 || pol2.length == 1 && pol2[0].texture == 1 ||
               pol1.length == 1 && pol1[0].texture == 2 && pol2.length == 0 || pol2.length == 1 && pol2[0].texture == 2 ||
               pol1.length == 1 && pol1[0].texture == 4 && pol2.length == 0 || pol2.length == 1 && pol2[0].texture == 4 ||
               pol1.length == 1 && pol1[0].texture == 7 && pol2.length == 0 || pol2.length == 1 && pol2[0].texture == 7){
            }
            else if(pol2.length == 1 && pol2[0].texture == 3){
                array_texture.splice(array_texture.findIndex(cell => cell.id == id_cell-22), 1);
                cubes ++;
                $(".score_cubes p").text(cubes);
            }
            else if(pol2.length == 2  && pol2[0].texture == 1 && pol2[1].texture == 13){
                if (JSON.stringify(array_texture[array_texture.length-1]).indexOf('"texture":"13"') !== -1) {
                    
                    if (hero_animate[0].x < array_map[array_texture[array_texture.length-2].id].x) {
                        hero_animate[0].x = array_map[array_texture[array_texture.length-2].id].x - 10 - cell_width;
                        hero_animate[0].y = array_map[array_texture[array_texture.length-2].id].y;
                        console.log("Вы вошли в портал 1")
                    }
                    if (hero_animate[0].x > array_map[array_texture[array_texture.length-2].id].x) {
                        hero_animate[0].x = array_map[array_texture[array_texture.length-2].id].x + 10 + cell_width;
                        hero_animate[0].y = array_map[array_texture[array_texture.length-2].id].y;
                        console.log("Вы вошли в портал 1")
                    }
                }     
                if (JSON.stringify(array_texture[array_texture.length-1]).indexOf('"texture":"14"') !== -1) {

                    if (hero_animate[0].x < array_map[array_texture[array_texture.length-1].id].x) {
                        hero_animate[0].x = array_map[array_texture[array_texture.length-1].id].x - 10 - cell_width;
                        hero_animate[0].y = array_map[array_texture[array_texture.length-1].id].y;
                        console.log("Вы вошли в портал 1")
                    }
                    if (hero_animate[0].x > array_map[array_texture[array_texture.length-1].id].x) {
                        hero_animate[0].x = array_map[array_texture[array_texture.length-1].id].x + 10 + cell_width;
                        hero_animate[0].y = array_map[array_texture[array_texture.length-1].id].y;
                        console.log("Вы вошли в портал 1")
                    }
                }                   
            }
            else if(pol2.length == 2  && pol2[0].texture == 1 && pol2[1].texture == 14){
                if (JSON.stringify(array_texture[array_texture.length-1]).indexOf('"texture":"13"') !== -1) {

                    if (hero_animate[0].x < array_map[array_texture[array_texture.length-1].id].x) {
                        hero_animate[0].x = array_map[array_texture[array_texture.length-1].id].x - 10 - cell_width;
                        hero_animate[0].y = array_map[array_texture[array_texture.length-1].id].y;
                        console.log("Вы вошли в портал 2")
                    }
                    if (hero_animate[0].x > array_map[array_texture[array_texture.length-1].id].x) {
                        hero_animate[0].x = array_map[array_texture[array_texture.length-1].id].x + 10 + cell_width;
                        hero_animate[0].y = array_map[array_texture[array_texture.length-1].id].y;
                        console.log("Вы вошли в портал 2")
                    }
                }
                if (JSON.stringify(array_texture[array_texture.length-1]).indexOf('"texture":"14"') !== -1) {

                    if (hero_animate[0].x < array_map[array_texture[array_texture.length-2].id].x) {
                        hero_animate[0].x = array_map[array_texture[array_texture.length-2].id].x - 10 - cell_width;
                        hero_animate[0].y = array_map[array_texture[array_texture.length-2].id].y;
                        console.log("Вы вошли в портал 2")
                    }
                    if (hero_animate[0].x > array_map[array_texture[array_texture.length-2].id].x) {
                        hero_animate[0].x = array_map[array_texture[array_texture.length-2].id].x + 10 + cell_width;
                        hero_animate[0].y = array_map[array_texture[array_texture.length-2].id].y;
                        console.log("Вы вошли в портал 2")
                    }
                }
            }
            else{
                direction_hero = "left";
                hero_animate[0].x-=speed_hero;
            } 
        }
    }, 35)
    
    document.addEventListener("keyup",function(event){
        switch(event.code){
            case "KeyD":
                direction_hero = '';
            break;
            case "KeyA":
                direction_hero = '';
            break;
            case "KeyN":
                moonwalk = false;
            break;
        }
    });

    setInterval(function(){id_cell = array_map.findIndex(cell => cell.x >= hero_animate[0].x && cell.y >= hero_animate[0].y-cell_height*2)}, 5);
    document.addEventListener("keydown",function(event){
        let jump_height = 0;
        switch(event.code){
            case "KeyW":
                    
                    console.log(id_cell)
                    pol = array_texture.filter(cell => cell.id == id_cell+2);
                    potolok = array_texture.filter(cell => cell.id == id_cell-1);

                    if(pol.length == 1 && (pol[0].texture == 1 || pol[0].texture == 2)){
                        move = setInterval(function () {
                        if(potolok.length == 1 && potolok[0].texture == 1){
                            clearInterval(move);
                        }
                        if(jump_height >= 40 || life == false){
                            clearInterval(move);
                        }
                        else{
                            hero_animate[0].y-=2;
                        }
                        jump_height++;
                        }, 5);
                    }
                            
            break;

       /* case "KeyS":
                direction_hero = "down";
                    result = Collision_Block(hero_animate[0].x,hero_animate[0].y,direction_hero,"hero");

                    if(result == 1 || life == false){
                        direction_hero = "";
                    }
                    else{
                        hero_animate[0].y+=speed_hero;
                    }   
            break; */
        // case "KeyA":
        //     id_cell = array_map.findIndex(cell => cell.x >= hero_animate[0].x && cell.y >= hero_animate[0].y-12);
        //     pol1 = array_texture.filter(cell => cell.id == id_cell-23);
        //     pol2 = array_texture.filter(cell => cell.id == id_cell-22);
        //     if(pol1.length == 1 && pol1[0].texture == 1 && pol2.length == 0 || pol2.length == 1 && pol2[0].texture == 1 ||
        //        pol1.length == 1 && pol1[0].texture == 2 && pol2.length == 0 || pol2.length == 1 && pol2[0].texture == 2 ||
        //        pol1.length == 1 && pol1[0].texture == 4 && pol2.length == 0 || pol2.length == 1 && pol2[0].texture == 4 ||
        //        pol1.length == 1 && pol1[0].texture == 7 && pol2.length == 0 || pol2.length == 1 && pol2[0].texture == 7){
        //     }
        //     else if(pol2.length == 1 && pol2[0].texture == 3){
        //         array_texture.splice(array_texture.findIndex(cell => cell.id == id_cell-22), 1);
        //         cubes ++;
        //         $(".score_cubes p").text(cubes);
        //     }
        //     else if(pol2.length == 2  && pol2[0].texture == 1 && pol2[1].texture == 13){
        //         if (JSON.stringify(array_texture[array_texture.length-1]).indexOf('"texture":"13"') !== -1) {
                    
        //             if (hero_animate[0].x < array_map[array_texture[array_texture.length-2].id].x) {
        //                 hero_animate[0].x = array_map[array_texture[array_texture.length-2].id].x - cell_width;
        //                 hero_animate[0].y = array_map[array_texture[array_texture.length-2].id].y;
        //                 console.log("Вы вошли в портал 1")
        //             }
        //             if (hero_animate[0].x > array_map[array_texture[array_texture.length-2].id].x) {
        //                 hero_animate[0].x = array_map[array_texture[array_texture.length-2].id].x + cell_width;
        //                 hero_animate[0].y = array_map[array_texture[array_texture.length-2].id].y;
        //                 console.log("Вы вошли в портал 1")
        //             }
        //         }     
        //         if (JSON.stringify(array_texture[array_texture.length-1]).indexOf('"texture":"14"') !== -1) {

        //             if (hero_animate[0].x < array_map[array_texture[array_texture.length-1].id].x) {
        //                 hero_animate[0].x = array_map[array_texture[array_texture.length-1].id].x - cell_width;
        //                 hero_animate[0].y = array_map[array_texture[array_texture.length-1].id].y;
        //                 console.log("Вы вошли в портал 1")
        //             }
        //             if (hero_animate[0].x > array_map[array_texture[array_texture.length-1].id].x) {
        //                 hero_animate[0].x = array_map[array_texture[array_texture.length-1].id].x + cell_width;
        //                 hero_animate[0].y = array_map[array_texture[array_texture.length-1].id].y;
        //                 console.log("Вы вошли в портал 1")
        //             }
        //         }                   
        //     }
        //     else if(pol2.length == 2  && pol2[0].texture == 1 && pol2[1].texture == 14){
        //         if (JSON.stringify(array_texture[array_texture.length-1]).indexOf('"texture":"13"') !== -1) {

        //             if (hero_animate[0].x < array_map[array_texture[array_texture.length-1].id].x) {
        //                 hero_animate[0].x = array_map[array_texture[array_texture.length-1].id].x - cell_width;
        //                 hero_animate[0].y = array_map[array_texture[array_texture.length-1].id].y;
        //                 console.log("Вы вошли в портал 2")
        //             }
        //             if (hero_animate[0].x > array_map[array_texture[array_texture.length-1].id].x) {
        //                 hero_animate[0].x = array_map[array_texture[array_texture.length-1].id].x + cell_width;
        //                 hero_animate[0].y = array_map[array_texture[array_texture.length-1].id].y;
        //                 console.log("Вы вошли в портал 2")
        //             }
        //         }
        //         if (JSON.stringify(array_texture[array_texture.length-1]).indexOf('"texture":"14"') !== -1) {

        //             if (hero_animate[0].x < array_map[array_texture[array_texture.length-2].id].x) {
        //                 hero_animate[0].x = array_map[array_texture[array_texture.length-2].id].x - cell_width;
        //                 hero_animate[0].y = array_map[array_texture[array_texture.length-2].id].y;
        //                 console.log("Вы вошли в портал 2")
        //             }
        //             if (hero_animate[0].x > array_map[array_texture[array_texture.length-2].id].x) {
        //                 hero_animate[0].x = array_map[array_texture[array_texture.length-2].id].x + cell_width;
        //                 hero_animate[0].y = array_map[array_texture[array_texture.length-2].id].y;
        //                 console.log("Вы вошли в портал 2")
        //             }
        //         }
        //     }
        //     else{
        //         direction_hero = "left";
        //         // hero_animate[0].x-=speed_hero;
        //     } 
        // break;
        
        // case "KeyD":
        //     id_cell = array_map.findIndex(cell => cell.x >= hero_animate[0].x-cell_width+5 && cell.y >= hero_animate[0].y-12);
        //     pol1 = array_texture.filter(cell => cell.id == id_cell+21);
        //     pol2 = array_texture.filter(cell => cell.id == id_cell+22);
        //     if(pol1.length == 1 && pol1[0].texture == 1 && pol2.length == 0 || pol2.length == 1 && pol2[0].texture == 1 ||
        //        pol1.length == 1 && pol1[0].texture == 2 && pol2.length == 0 || pol2.length == 1 && pol2[0].texture == 2 ||
        //        pol1.length == 1 && pol1[0].texture == 4 && pol2.length == 0 || pol2.length == 1 && pol2[0].texture == 4 ||
        //        pol1.length == 1 && pol1[0].texture == 7 && pol2.length == 0 || pol2.length == 1 && pol2[0].texture == 7){
        //     }
        //     else if(pol2.length == 1 && pol2[0].texture == 3){
        //         array_texture.splice(array_texture.findIndex(cell => cell.id == id_cell+22), 1);
        //         cubes ++;
        //         $(".score_cubes p").text(cubes);
        //     }
        //     else if(pol2.length == 2  && pol2[0].texture == 1 && pol2[1].texture == 13){
        //         if (JSON.stringify(array_texture[array_texture.length-1]).indexOf('"texture":"13"') !== -1) {
                    
        //             if (hero_animate[0].x < array_map[array_texture[array_texture.length-2].id].x) {
        //                 hero_animate[0].x = array_map[array_texture[array_texture.length-2].id].x - cell_width;
        //                 hero_animate[0].y = array_map[array_texture[array_texture.length-2].id].y;
        //                 console.log("Вы вошли в портал 1")
        //             }
        //             if (hero_animate[0].x > array_map[array_texture[array_texture.length-2].id].x) {
        //                 hero_animate[0].x = array_map[array_texture[array_texture.length-2].id].x + cell_width;
        //                 hero_animate[0].y = array_map[array_texture[array_texture.length-2].id].y;
        //                 console.log("Вы вошли в портал 1")
        //             }
        //         }     
        //         if (JSON.stringify(array_texture[array_texture.length-1]).indexOf('"texture":"14"') !== -1) {

        //             if (hero_animate[0].x < array_map[array_texture[array_texture.length-1].id].x) {
        //                 hero_animate[0].x = array_map[array_texture[array_texture.length-1].id].x - cell_width;
        //                 hero_animate[0].y = array_map[array_texture[array_texture.length-1].id].y;
        //                 console.log("Вы вошли в портал 1")
        //             }
        //             if (hero_animate[0].x > array_map[array_texture[array_texture.length-1].id].x) {
        //                 hero_animate[0].x = array_map[array_texture[array_texture.length-1].id].x + cell_width;
        //                 hero_animate[0].y = array_map[array_texture[array_texture.length-1].id].y;
        //                 console.log("Вы вошли в портал 1")
        //             }
        //         }                   
        //     }
        //     else if(pol2.length == 2  && pol2[0].texture == 1 && pol2[1].texture == 14){
        //         if (JSON.stringify(array_texture[array_texture.length-1]).indexOf('"texture":"13"') !== -1) {

        //             if (hero_animate[0].x < array_map[array_texture[array_texture.length-1].id].x) {
        //                 hero_animate[0].x = array_map[array_texture[array_texture.length-1].id].x - cell_width;
        //                 hero_animate[0].y = array_map[array_texture[array_texture.length-1].id].y;
        //                 console.log("Вы вошли в портал 2")
        //             }
        //             if (hero_animate[0].x > array_map[array_texture[array_texture.length-1].id].x) {
        //                 hero_animate[0].x = array_map[array_texture[array_texture.length-1].id].x + cell_width;
        //                 hero_animate[0].y = array_map[array_texture[array_texture.length-1].id].y;
        //                 console.log("Вы вошли в портал 2")
        //             }
        //         }
        //         if (JSON.stringify(array_texture[array_texture.length-1]).indexOf('"texture":"14"') !== -1) {

        //             if (hero_animate[0].x < array_map[array_texture[array_texture.length-2].id].x) {
        //                 hero_animate[0].x = array_map[array_texture[array_texture.length-2].id].x - cell_width;
        //                 hero_animate[0].y = array_map[array_texture[array_texture.length-2].id].y;
        //                 console.log("Вы вошли в портал 2")
        //             }
        //             if (hero_animate[0].x > array_map[array_texture[array_texture.length-2].id].x) {
        //                 hero_animate[0].x = array_map[array_texture[array_texture.length-2].id].x + cell_width;
        //                 hero_animate[0].y = array_map[array_texture[array_texture.length-2].id].y;
        //                 console.log("Вы вошли в портал 2")
        //             }
        //         }
        //     }
        //     else{
        //         direction_hero = "right";
        //         // hero_animate[0].x+=speed_hero;
        //     }
        // break;

        case "KeyE":
            // if(direction_hero == ''){
                // direction_hero = "press_button";
                // let result = Collision_Block(hero_animate[0].x,hero_animate[0].y,direction_hero,"hero");


                id_cell = array_map.findIndex(cell => cell.x >= hero_animate[0].x-cell_width+5 && cell.y >= hero_animate[0].y-12);
                pol1 = array_texture.filter(cell => cell.id == id_cell-22);
                pol2 = array_texture.filter(cell => cell.id == id_cell+22);
                if(pol2.length == 1 && pol2[0].texture == 12){
                    if(array_texture[array_texture.findIndex(cell => cell.id == id_cell+22)].info.select_frame == 0){
                        if(cubes == 1){
                        console.log(id_cell)
                        array_texture[array_texture.findIndex(cell => cell.id == id_cell+22)].info.select_frame = 1;
                        cubes--;
                        array_texture.splice(array_texture.findIndex(textures => textures.texture == 4), 1);
                        array_texture.splice(array_texture.findIndex(textures => textures.texture == 4), 1);
                        }
                    }
                }
                if (pol1.length == 1 && pol1[0].texture == 12) {

                    if(array_texture[array_texture.findIndex(cell => cell.id == id_cell-22)].info.select_frame == 0){
                        if(cubes == 1){
                        console.log(id_cell)
                        array_texture[array_texture.findIndex(cell => cell.id == id_cell-22)].info.select_frame = 1;
                        cubes--;
                        array_texture.splice(array_texture.findIndex(textures => textures.texture == 4), 1);
                        array_texture.splice(array_texture.findIndex(textures => textures.texture == 4), 1);
                        }
                    }
                }
                

                if(pol2.length == 1 && pol2[0].texture == 6){
                    if(array_texture[array_texture.findIndex(cell => cell.id == id_cell+22)].info.select_frame == 0){
                        array_texture[array_texture.findIndex(cell => cell.id == id_cell+22)].info.select_frame = 1;
                        array_texture.splice(array_texture.findIndex(textures => textures.texture == 7), 1);
                        array_texture.splice(array_texture.findIndex(textures => textures.texture == 7), 1);
                    }
                }
                if (pol1.length == 1 && pol1[0].texture == 6) {

                    if(array_texture[array_texture.findIndex(cell => cell.id == id_cell-22)].info.select_frame == 0){
                        array_texture[array_texture.findIndex(cell => cell.id == id_cell-22)].info.select_frame = 1;
                        array_texture.splice(array_texture.findIndex(textures => textures.texture == 7), 1);
                        array_texture.splice(array_texture.findIndex(textures => textures.texture == 7), 1);
                    }
                }

                function NextLevel(){
                    Save_Progress();
                    location.reload();
                    if (select_level < levels.length) {
                        select_level++;
                    }
                }
                
                if(pol2.length == 1 && pol2[0].texture == 5){
                    NextLevel()

                }
                if (pol1.length == 1 && pol1[0].texture == 5){
                    NextLevel()
                }
            // }
            break;
            case "KeyM":
                moonwalk = true;
            break;
    }
});

function MoveEnemy(){
    for(let i = 0;i<array_texture.length;i++){
        if(array_texture[i].texture == 9 || array_texture[i].texture == 10){
            switch(array_texture[i].direction_bat){
                case "left":
                   let left = Collision_Block(array_texture[i].x,array_texture[i].y,array_texture[i].direction_bat,"bat");
                   if(left == 1){
                    array_texture[i].direction_bat = "right";
                   }
                   else{
                    array_texture[i].x-=2;
                   } 
                break;  
                case "right":
                   let right = Collision_Block(array_texture[i].x,array_texture[i].y,array_texture[i].direction_bat,"bat");
                   if(right == 1){
                    array_texture[i].direction_bat = "left";
                   }
                   else{
                    array_texture[i].x+=2;
                   } 
                break; 
                case "up":
                   let up = Collision_Block(array_texture[i].x,array_texture[i].y,array_texture[i].direction_bat,"bat");
                   if(up == 1){
                    array_texture[i].direction_bat = "down";
                   }
                   else{
                    array_texture[i].y-=2;
                   } 
                break; 
                case "down":
                   let down = Collision_Block(array_texture[i].x,array_texture[i].y,array_texture[i].direction_bat,"bat");
                   if(down == 1){
                    array_texture[i].direction_bat = "up";
                   }
                   else{
                    array_texture[i].y+=2;
                   } 
                break; 
            }
        }
    }
}
function Collision_Block(x,y,direction,enemy){
    for (let i = 0; i< array_map.length;i++){
        if(array_map[i].x == x && array_map[i].y == y){
            let center = array_texture.filter(cells => cells.id == i);
            if(center.length == 1 && enemy == "hero"){
                switch (center[0].texture) {
                    // case "2":
                    //     array_texture.splice(array_texture.findIndex(cells => cells.id == center[0].id),1);
                    //     dollars ++;
                    //     $(".score_money p").text(dollars);
                    //     break;
                    case "3":
                        array_texture.splice(array_texture.findIndex(cells => cells.id == center[0].id),1);
                        cubes ++;
                        $(".score_cubes p").text(cubes);
                        break;
                    case "11":
                        if(center[0].info.select_frame == 3){
                            life = false;
                        }
                        setTimeout(function(){
                                
                            let interval_spike = setInterval(function(){
                                Animate_spike(center);
                                    
                            }, 500/4);
                            setTimeout(function(){
                                clearInterval(interval_spike);
                                center[0].info.select_frame = 0;
                            }, 3000);
                        },500);
                    break;
                    case "12":
                        if(center[0].info.select_frame == 3){
                            life = false;
                        }
                        setTimeout(function(){
                            
                            let interval_button1 = setInterval(function(){
                                Animate_button1(center);
                                
                            }, 500/4);
                            setTimeout(function(){
                                clearInterval(interval_button1);
                                center[0].info.select_frame = 0;
                            }, 3000);
                        },500);
                    break;
                }

            }
            switch (direction) {
                case "up":
                    let up = array_texture.filter(cells => cells.id == i-1 && (cells.texture == 1 || cells.texture == 2 || cells.texture == 7 && cells.info.select_frame != 4 || cells.texture == 4 && cells.info.select_frame != 4));
                    return up.length;
                break;
                case "down":
                    let down = array_texture.filter(cells => cells.id == i+1 && (cells.texture == 1 || cells.texture == 2 || cells.texture == 7 && cells.info.select_frame != 4 || cells.texture == 4 && cells.info.select_frame != 4));
                    return down.length;
                break;
                case "left":
                    let left = array_texture.filter(cells => cells.id == i-22 && (cells.texture == 1 || cells.texture == 2 ||  cells.texture == 7 && cells.info.select_frame != 4 || cells.texture == 4 && cells.info.select_frame != 4));
                    return left.length;
                break;
                case "right":
                    let right = array_texture.filter(cells => cells.id == i+22 && (cells.texture == 1 || cells.texture == 2 || cells.texture == 7 && cells.info.select_frame != 4 || cells.texture == 4 && cells.info.select_frame != 4));
                    return right.length;
                break;
                // case "press_button":
                //     center = array_texture.filter(cells => cells.id == i);
                //     if(center.length ==1 && enemy == "hero"){
                //         switch (center[0].texture) {
                //             case "6":
                //                 Animation_door(center[0].id_door);
                //                 return center.length;
                //                 break;
                //             case "5":
                //                 Save_Progress();
                //                 location.reload();
                //                 break;
                //         }
                //     }
                // break;
            }
        }
    }
}



function HeroDead(){
    let bat_array = array_texture.filter(textures => textures.texture == 9 || textures.texture == 10);
    let witch = array_texture.filter(textures => textures.texture == 8);
    for(let i = 0;i <= bat_array.length-1;i++){
        
        if(
            (bat_array[i].x+cell_width >= witch[0].x+5  && 
            bat_array[i].x <= witch[0].x+cell_width-5) &&
            (bat_array[i].y >= witch[0].y-cell_height+5 &&
            bat_array[i].y+cell_height <= witch[0].y+cell_height-5)
         ){
            life = false;
        }
    }
}

function game(){
    DrawBG();
    DrawCell();
    DrawTexture();
    HeroDead();
    
    if(status_game == "pause"){
        setInterval(function(){
            Animate_objects();
        }, 1000/8);
        setInterval(function(){
            Gravity();
        }, 1000/48);
        setInterval(function(){
            Animation_hero();
        }, 1000/6);
        setInterval(function(){
            MoveEnemy();
        }, 25);
        status_game = "start";
    }
    requestAnimationFrame(game);
}