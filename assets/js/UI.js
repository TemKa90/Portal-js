$(document).ready(function(){
    
    let select_block = $(".blocks section");
    let start = $("p.start_game");
    let start_zone = $(".start_zone");
    let game_zone = $(".game");
    let edit_button = $(".edit_level");
    let blocks = $(".blocks");
    let close = $(".close");
    let menu = $(".setting");
    let shop = $(".shop");
    let open_shop = $("p.open_shop");
    let item_shop = $(".shop .item");
    let hud = $(".hud");
    let open = $(".open_menu");
    let audio = $("audio");
    let audio_status = false;
    let play_audio = $("[data-icon='mdi:play']");
    let volume_button = $("input[type='range']");
    // volume_button.click(function () {
    //     alert($(this).attr("value"));
    // });
    hud.find(".score_cubes p").text(localStorage.getItem("total_cubes"));
    hud.find(".score_money p").text(localStorage.getItem("total_dollars"));

    open_shop.click(function(){
        shop.css("display","grid");
    });
    item_shop.click(function(){
        let skin_witch = $(this).attr("alt");
        item_shop.attr("select","false");
        $(this).attr("select","true");
        // alert(skin_witch);
        switch(skin_witch){
            case "Blue_Witch":
                hero.src = "assets/image/Skins/Blue_witch/B_witch_idle.png";
                hero_idel.image = "assets/image/Skins/Blue_witch/B_witch_idle.png";
                hero_run.image = "assets/image/Skins/Blue_witch/B_witch_run.png";
                hero_death.image = "assets/image/Skins/Blue_witch/B_witch_charge.png";
                break;
            case "Red_Witch":
                hero.src = "assets/image/Skins/Red_witch/B_witch_idle.png";
                hero_idel.image = "assets/image/Skins/Red_witch/B_witch_idle.png";
                hero_run.image = "assets/image/Skins/Red_witch/B_witch_run.png";
                hero_death.image = "assets/image/Skins/Red_witch/B_witch_charge.png";
                break;  
            case "White_Witch":
                hero.src = "assets/image/Skins/White_witch/B_witch_idle.png";
                hero_idel.image = "assets/image/Skins/White_witch/B_witch_idle.png";
                hero_run.image = "assets/image/Skins/White_witch/B_witch_run.png";
                hero_death.image = "assets/image/Skins/White_witch/B_witch_charge.png";
                break;
            case "Yellow_Witch":
                hero.src = "assets/image/Skins/Yellow_witch/B_witch_idle.png";
                hero_idel.image = "assets/image/Skins/Yellow_witch/B_witch_idle.png";
                hero_run.image = "assets/image/Skins/Yellow_witch/B_witch_run.png";
                hero_death.image = "assets/image/Skins/Yellow_witch/B_witch_charge.png";
                break;            
        }
    });
    play_audio.click(function () {
        if(audio_status == false){
            audio.get(0).play();
            audio_status = true;
        }
        else{
            audio.get(0).pause();
            audio_status = false;
        }

    });
    open.click(function () {
       menu.css("display","grid");
    });
    close.click(function () {
       menu.fadeOut();
       shop.fadeOut();
    });
    start.click(function () {
        start_zone.fadeOut();
        game_zone.fadeIn();
        hud.find(".score_cubes p").text(cubes);
        hud.find(".score_money p").text(dollars);
        game();
    });
    edit_button.click(function () {
        start_zone.fadeOut();
        game_zone.fadeIn();
        blocks.css("display","grid");
        game_mode = "edit";
        array_texture = [];
        game();
    });
    select_block.click(function(){
        block = $(this).find("img").attr("id_block");
        select_block.css("background","white");
        $(this).css("background","rgba(155, 152, 152, 0.481)");
    });
});